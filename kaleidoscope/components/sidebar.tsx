import { cn } from "@/lib/utils";
import Link from "next/link";
import { SidebarItem } from "./sidebar_item";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";

type Props = {
    className?: string;
};
export const Sidebar = async ({ className }: Props) => {

    const userProgress = await getUserProgress();
    const userImageSrc = userProgress?.userImageSrc;

    return (
        <div className={cn(
            "flex bg-white-500 h-full lg:w-[300px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
            className,
            )}>
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="logo.svg" alt="logo" height={60} width={60} className="pt-4 pb-3" />
                    <h1 className="text-2xl font-extrabold text-green-500 tracking-wide">
                        Kaleidoscope
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label="Learn" iconSrc="learn.svg" href="/learn" />
                <SidebarItem label="Leaderboard" iconSrc="leaderboard.svg" href="/leaderboard"/>
                <SidebarItem label="Quests" iconSrc="quests.svg" href="/quests"/>
                <SidebarItem label="Shop" iconSrc="shop.svg" href="/shopItem"/>
                <SidebarItem label="Profile" iconSrc={ userImageSrc || "profile.svg"} href="/profile"/>
            </div>
            
        </div>
    )
}