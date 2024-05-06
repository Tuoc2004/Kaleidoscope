import React from 'react'
import { FeedWrapper } from '@/components/feed-wrapper'
import { UserProgress } from '@/components/user_progress'
import { StickyWrapper } from '@/components/sticky_wrapper'
import { getUserProgress, getTopTenUsers } from '@/db/queries'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'

const quests = [
  {
    title: "Earn 10 XP",
    value: 10,
  },
  {
    title: "Earn 100 XP",
    value: 100,
  }
] 


const QuestsPage = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([
    userProgressData,
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
          hasActiveSubcription={false}
        />
      </StickyWrapper>
      <FeedWrapper>
        <div className='w-full flex flex-col items-center'>
          <Image src="/quests.svg" height={90} width={90} alt="Quests"/>
          <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>
            Quests
          </h1>
          <p className='text-muted-foreground text-center text-lg mb-6'>
            Complete quests to earn points
          </p>
          <ul className='w-full'>
            {quests.map((quest) => {
              const process = (userProgress.points / quest.value) * 100;
              return (
                <div
                  className='flex items-center w-full p-4 gap-x-4 border-t-2'
                  key={quest.title}
                >
                  <Image
                    src="/point.svg"
                    alt='Point'
                    width={24}
                    height={24}
                  />
                  <div className='flex flex-col gap-y-2 w-full'>
                    <p className='text-neutral-700 text-xl font-bold'>
                      {quest.title}
                    </p>
                    <Progress value={process} className='h-3' />
                  </div>
                </div>
              )
            })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  )
}

export default QuestsPage
