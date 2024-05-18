import Link from "next/link"
import { Button } from "./ui/button"
import { InfinityIcon } from "lucide-react"
import Image from "next/image"
import { courses } from "@/db/schema"
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
    activeCourse: typeof courses.$inferSelect;
    hearts: number
    points: number
    streak: number
    hasActiveSubcription: boolean
}

export const UserProgress = ({ activeCourse, hearts, points,streak, hasActiveSubcription }: Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2">
            <Link href="/courses">
                <Button variant="ghost">
                    <Image 
                        src={activeCourse.imageSrc} 
                        alt={activeCourse.title}
                        className="rounded-md border"
                        width={32}
                        height={32}
                    />
                </Button>
            </Link>
            <Link href="/shopItem">
                <Button variant="ghost" className="text-orange-500">
                    <Image src="point.svg" height={28} width={28} alt="Points" className="mr-2"/>
                    {points}
                </Button>
            </Link>
            <Link href="/shopItem">
                <Button variant="ghost" className="text-rose-500">
                    <Image src="heart.svg" height={22} width={22} alt="Hearts" className="mr-2"/>
                    {hasActiveSubcription ? <InfinityIcon className="h-4 w-4 stroke-[3]" /> : hearts } 
                </Button>
            </Link>
            <Link href="/shopItem">
                <Button variant="ghost" className="text-orange-500">
                    <Image src="streak.svg" height={22} width={22} alt="Streak" className="mr-2"/>
                    {streak} 
                </Button>
            </Link>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/"/>
                </ClerkLoaded>
            </div>
        </div>
    )
}