import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { courses } from "@/db/schema"

type Props = {
    activeCourse: typeof courses.$inferSelect;
}

export const Card = ({ activeCourse }: Props) => {
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
        </div>
    )
}