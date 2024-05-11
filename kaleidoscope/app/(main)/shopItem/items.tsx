"use client";
import { refillHearts } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const POINTS_TO_REFILL = 50;

type Props = {
    hearts: number
    points: number
    hasActiveSubcription: boolean
}

export const Items = ({ hearts, points, hasActiveSubcription }: Props) => {
    const [pending, startTransition] = React.useTransition();

    const onRefillHearts = async () => {
        if (pending || hearts === 5 || points < POINTS_TO_REFILL) {
            return;
        }

        startTransition(async () => {
            refillHearts().catch(() => {
                alert("Failed to refill hearts");
            })
        })
    }
    return (
        <ul className="w-full">
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image src="/heart.svg" height={22} width={22} alt="Hearts" />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Refill heart
                    </p>
                </div>
                <Button 
                    onClick={onRefillHearts}
                    disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
                    >
                    {hearts === 5 ? "full" : (
                        <div className="flex items-center">
                            <Image src="/point.svg" height={22} width={22} alt="Points" />
                            <p>
                                {POINTS_TO_REFILL}
                            </p>
                        </div>
                        )
                    }
                </Button>
            </div>
        </ul>
    )
}
