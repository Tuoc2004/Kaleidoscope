import React from 'react'
import { FeedWrapper } from '@/components/feed-wrapper'
import { UserProgress } from '@/components/user_progress'
import { StickyWrapper } from '@/components/sticky_wrapper'
import { getUserProgress, getTopTenUsers } from '@/db/queries'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Promo } from '@/components/promo'

const LeaderBoardPage = async () => {
    const userProgressData = getUserProgress();
    const leaderboardData = getTopTenUsers();

    const [userProgress, leaderboard] = await Promise.all([
        userProgressData,
        leaderboardData,
    ])

    if (!userProgress || !userProgress?.activeCourse){
        redirect("/shopItem") 
    }


    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
            <UserProgress
            activeCourse={userProgress.activeCourse}
            hearts={userProgress?.hearts}
            points={userProgress?.points}
            streak={userProgress?.streak}
            hasActiveSubcription={false}
            />
            <Promo />
        </StickyWrapper>
        <FeedWrapper>
            <div className='w-full flex flex-col items-center'>
            <Image src="/leaderboard.svg" height={90} width={90} alt="Leaderboard"/>
            <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>
                Leaderboard
            </h1>
            <p className='text-muted-foreground text-center text-lg mb-6'>
                See where you stand among other learners in the community
            </p>
            <Separator className='mb-4 h-0.5 rounded-full'/>
            {leaderboard.map((userProgress, index) => (
                <div 
                key={userProgress.userId}
                className='flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50'
                >
                <p className='font-bold text-lime-700 mr-4'>{index + 1}</p>
                <Avatar className='border bg-green-500 h-12 w-12 ml-3 mr-6'>
                    <AvatarImage
                    className='object-cover'
                    src={userProgress.userImageSrc}
                    />
                </Avatar>
                <p className='font-bold text-neutral-800 flex-1'>
                    {userProgress.userName}
                </p>
                <p className='text-muted-foreground'>
                    {userProgress.points} XP
                </p>
                </div>
            ))}
            </div>
        </FeedWrapper>
        </div>
    )
}

export default LeaderBoardPage
