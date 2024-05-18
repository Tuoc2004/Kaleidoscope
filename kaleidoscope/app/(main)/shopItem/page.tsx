import React from 'react'
import { FeedWrapper } from '@/components/feed-wrapper'
import { UserProgress } from '@/components/user_progress'
import { StickyWrapper } from '@/components/sticky_wrapper'
import { getUserProgress } from '@/db/queries'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Items } from './items'
import { Promo } from '@/components/promo'

const ShopItem = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([
    userProgressData
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
          streak={userProgress?.streak}
        />
        <Promo />
      </StickyWrapper>
      <FeedWrapper>
        <div className='w-full flex flex-col items-center'>
          <Image src="shop.svg" height={90} width={90} alt="Shop"/>
          <h1 className='text-center font-bold text-neutral-800 text-2xl my-6'>
            Shop
          </h1>
          <p className='text-muted-foreground text-center text-lg mb-6'>
            Spend your point on cool stuff
          </p>
          <Items
            hearts={userProgress.hearts}
            points={userProgress.points}
            hasActiveSubcription={false}
          />
        </div>
      </FeedWrapper>
    </div>
  )
}

export default ShopItem
