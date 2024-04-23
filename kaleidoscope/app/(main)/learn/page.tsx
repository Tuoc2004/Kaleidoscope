import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { StickyWrapper } from "@/components/sticky_wrapper";
import { UserProgress } from "@/components/user_progress";

const LearnPage = () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress 
                activeCourse={{title: "Spanish", imageSrc: "ES.svg"}}
                hearts={0}
                points={0}
                hasActiveSubcription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title="Spanish" /> 
            </FeedWrapper>
        </div>
    )
}

export default LearnPage;