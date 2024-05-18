import ProfileFriendsSection from "./ProfileFriendsSection";
import ProfileTopSection from "./ProfileTopSection";
import ProfileStatsSection from "./ProfileStatsSection";
import { getFinishedCoursesCount, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const Profile = async () => {
  const userProgressData = await getUserProgress();
  const coursesFinished = await getFinishedCoursesCount();

  if (!userProgressData) {
    redirect("/");
  }
  return (
    <div>
      <div className="flex justify-center gap-3 pt-14 lg:gap-12">
        <div className="flex w-full max-w-4xl flex-col gap-5 p-5">
          <ProfileTopSection />
          <ProfileStatsSection 
            streak={userProgressData.streak}
            totalXp={userProgressData.points}
            league={userProgressData.league}
            coursesFinished={coursesFinished}
            />
          <ProfileFriendsSection />
        </div>
      </div>
      <div className="pt-[90px]"></div>
    </div>
  );
};

export default Profile;
