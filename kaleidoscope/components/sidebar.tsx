import { cn } from "@/lib/utils";
import Link from "next/link";
import { SidebarItem } from "./sidebar_item";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
    className?: string;
};
export const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn(
            "flex bg-white-500 h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
            className,
            )}>
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
                        Kaleidoscope
                    </h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label="Learn" iconSrc="learn.svg" href="/learn" />
                <SidebarItem label="Leaderboard" iconSrc="leaderboard.svg" href="/leaderboard"/>
                <SidebarItem label="Quests" iconSrc="quests.svg" href="/quests"/>
                <SidebarItem label="Shop" iconSrc="shop.svg" href="/shop"/>
                <SidebarItem label="Settings" iconSrc="settings.svg" href="/settings"/>
            </div>
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