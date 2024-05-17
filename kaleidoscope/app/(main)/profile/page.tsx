import ProfileFriendsSection from "./ProfileFriendsSection";
import ProfileTopSection from "./ProfileTopSection";
import ProfileStatsSection from "./ProfileStatsSection";

const Profile = async () => {
  return (
    <div>
      <div className="flex justify-center gap-3 pt-14 lg:gap-12">
        <div className="flex w-full max-w-4xl flex-col gap-5 p-5">
          <ProfileTopSection />
          <ProfileStatsSection />
          <ProfileFriendsSection />
        </div>
      </div>
      <div className="pt-[90px]"></div>
    </div>
  );
};

export default Profile;
