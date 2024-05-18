import { FeedWrapper } from "@/components/feed-wrapper";
import { Header } from "./header";
import { StickyWrapper } from "@/components/sticky_wrapper";
import { UserProgress } from "@/components/user_progress";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quest";
import Chatbot from "@/components/chatbot";
import { Unit } from "./unit"
import { redirect } from "next/navigation";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";
const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const unitsData = getUnits();
    
    const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([userProgressData, unitsData, courseProgressData, lessonPercentageData]);
    
    if(!userProgress || !userProgress.activeCourse){
        redirect("/courses");
    }
    if(!courseProgress){
        redirect("/courses");
    }
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress 
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    streak={userProgress.streak}
                    hasActiveSubcription={false}
                />
                <Promo />
                <Quests points={userProgress?.points}/>
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title} /> 
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson}
                            activeLessonPercentage={lessonPercentage}
                        />
                    </div>
                ))}
            </FeedWrapper>
            <Chatbot />
        </div>
    )
}

export default LearnPage;