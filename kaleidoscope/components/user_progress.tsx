import Link from "next/link"
import { Button } from "./ui/button"
import { InfinityIcon } from "lucide-react"
import Image from "next/image"

type Props = {
    activeCourse: {imageSrc: string; title: string}
    hearts: number
    points: number
    hasActiveSubcription: boolean
}

export const UserProgress = ({ activeCourse, hearts, points, hasActiveSubcription }: Props) => {
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
                    {/* Course: {activeCourse} */}
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-orange-500">
                    {/* {points} Points */}
                    <Image src="point.svg" height={28} width={28} alt="Points" className="mr-2"/>
                    {points}
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-rose-500">
                    <Image src="heart.svg" height={22} width={22} alt="Hearts" className="mr-2"/>
                    {hasActiveSubcription ? <InfinityIcon className="h-4 w-4 stroke-[3]" /> : hearts } 
                </Button>
            </Link>
        </div>
    )
}