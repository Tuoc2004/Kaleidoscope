import Link from "next/link"
import { Button } from "./ui/button"
import { InfinityIcon } from "lucide-react"


type Props = {
    activeCourse: string
    hearts: number
    points: number
    hasActiveSubcription: boolean
}

export const UserProgress = ({ activeCourse, hearts, points, hasActiveSubcription }: Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2">
            <Link href="/course">
                <Button variant="ghost" size="sm">
                    Course: {activeCourse}
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" size="sm">
                    {points} Points
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" size="sm">
                    {hasActiveSubcription ? <InfinityIcon className="h-5 w-5 stroke-[3]" /> : hearts } Hearts
                </Button>
            </Link>
        </div>
    )
}