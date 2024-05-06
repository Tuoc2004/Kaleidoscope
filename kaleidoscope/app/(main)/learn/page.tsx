import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { StickyWrapper } from "@/components/sticky_wrapper";
import { UserProgress } from "@/components/user_progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quest";
import Chatbot from "@/components/chatbot";

const LearnPage = async () => {
    const userProgressData = getUserProgress();

    const [userProgress ] = await Promise.all([
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
                />
                <Promo />
                <Quests points={userProgress?.points}/>
            </StickyWrapper>
            <FeedWrapper>
                <Header title="Spanish" /> 
            </FeedWrapper>
            <Chatbot />
        </div>
    )
}

export default LearnPage;