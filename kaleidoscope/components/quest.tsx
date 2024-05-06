"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { Progress } from "./ui/progress";

type Props = {
    points: number
}


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

export const Quests = ({ points }: Props) => {
    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between w-full space-y-2">
                <h3 className="font-bold text-lg">
                    Quests
                </h3>
                <Link href="/quests">
                    <Button size="sm" variant="primaryOutline">
                        View all
                    </Button>
                </Link>
            </div>
            <ul className="w-full space-y-4">
            {quests.map((quest) => {
              const process = (points / quest.value) * 100;
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
    )
}