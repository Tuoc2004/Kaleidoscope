import { getUserProgress } from "@/db/queries";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card } from "@/components/card";
import {
  ProfileFriendsSvg,
  ProfileTimeJoinedSvg,
  EditPencilSvg,
} from "@/components/svgs";

const ProfileTopSection = async () => {
  const userProgressData = await getUserProgress();

  if (!userProgressData || !userProgressData.activeCourse) {
    redirect("/");
  }

  const name = userProgressData.userName || "Default Name";
  const username = "username";
  const joinedAt = "2021-10-10";
  const followingCount = 0;
  const followersCount = 0;

  return (
    <section className="flex flex-row-reverse border-b-2 border-gray-200 pb-8 md:flex-row md:gap-8">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed
        border-gray-400 text-3xl font-bold text-gray-400 md:h-44 md:w-44 md:text-7xl"
      >
        {username.charAt(0).toUpperCase()}
      </div>

      <div className="flex grow flex-col justify-between gap-3">
        <div className="flex flex-col gap-2">
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <div className="text-sm text-gray-400">{username}</div>
          </div>
          <div className="flex items-center gap-3">
            <ProfileTimeJoinedSvg />
            <span className="text-gray-500">{`Joined ${joinedAt}`}</span>
          </div>
          <div className="flex items-center gap-3">
            <ProfileFriendsSvg />
            <span className="text-gray-500">{`${followingCount} Following / ${followersCount} Followers`}</span>
          </div>
        </div>
        <Card activeCourse={userProgressData.activeCourse} />
      </div>
      <Link
        href="/profile"
        className="hidden items-center gap-2 self-start rounded-2xl border-b-4 border-blue-500 bg-blue-400 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 md:flex"
      >
        <EditPencilSvg />
        Edit profile
      </Link>
    </section>
  );
};

export default ProfileTopSection;
