import {
  BronzeLeagueSvg,
  EditPencilSvg,
  EmptyFireSvg,
  FireSvg,
  LightningProgressSvg,
  EmptyMedalSvg,
  ProfileFriendsSvg,
  ProfileTimeJoinedSvg,
} from "@/components/svgs";
import Link from "next/link";

const Profile = async () => {
  return (
    <div>
      <div className="flex justify-center gap-3 pt-14 lg:gap-12">
        <div className="flex w-full max-w-4xl flex-col gap-5 p-5">
          <ProfileTopSection />
          <ProfileStatsSection />
          {/* <ProfileFriendsSection /> */}
        </div>
      </div>
      <div className="pt-[90px]"></div>
    </div>
  );
};

export default Profile;

const ProfileTopSection = () => {

  const loggedIn = true;
  const name = "Nguyen Van A";
  const username = "username";
  const joinedAt = "2021-10-10";
  const followingCount = 0;
  const followersCount = 0;
  const language = "en";

  return (
    <section className="flex flex-row-reverse border-b-2 border-gray-200 pb-8 md:flex-row md:gap-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed
       border-gray-400 text-3xl font-bold text-gray-400 md:h-44 md:w-44 md:text-7xl">
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

const ProfileStatsSection = () => {
  const streak = 0;
  const totalXp = 0;
  const league = "Bronze";
  const top3Finishes = 0;

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold">Statistics</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          {streak === 0 ? <EmptyFireSvg /> : <FireSvg />}
          <div className="flex flex-col">
            <span
              className={[
                "text-xl font-bold",
                streak === 0 ? "text-gray-400" : "",
              ].join(" ")}
            >
              {streak}
            </span>
            <span className="text-sm text-gray-400 md:text-base">
              Day streak
            </span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <LightningProgressSvg size={35} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{totalXp}</span>
            <span className="text-sm text-gray-400 md:text-base">Total XP</span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <BronzeLeagueSvg width={25} height={35} />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{league}</span>
            <span className="text-sm text-gray-400 md:text-base">
              Current league
            </span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          {top3Finishes === 0 ? <EmptyMedalSvg /> : <EmptyMedalSvg />}
          <div className="flex flex-col">
            <span
              className={[
                "text-xl font-bold",
                top3Finishes === 0 ? "text-gray-400" : "",
              ].join(" ")}
            >
              {top3Finishes}
            </span>
            <span className="text-sm text-gray-400 md:text-base">
              Top 3 finishes
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// const ProfileFriendsSection = () => {
//   const [state, setState] = useState<"FOLLOWING" | "FOLLOWERS">("FOLLOWING");
//   return (
//     <section>
//       <h2 className="mb-5 text-2xl font-bold">Friends</h2>
//       <div className="rounded-2xl border-2 border-gray-200">
//         <div className="flex">
//           <button
//             className={[
//               "flex w-1/2 items-center justify-center border-b-2 py-3 font-bold uppercase hover:border-blue-400 hover:text-blue-400",
//               state === "FOLLOWING"
//                 ? "border-blue-400 text-blue-400"
//                 : "border-gray-200 text-gray-400",
//             ].join(" ")}
//             onClick={() => setState("FOLLOWING")}
//           >
//             Following
//           </button>
//           <button
//             className={[
//               "flex w-1/2 items-center justify-center border-b-2 py-3 font-bold uppercase hover:border-blue-400 hover:text-blue-400",
//               state === "FOLLOWERS"
//                 ? "border-blue-400 text-blue-400"
//                 : "border-gray-200 text-gray-400",
//             ].join(" ")}
//             onClick={() => setState("FOLLOWERS")}
//           >
//             Followers
//           </button>
//         </div>
//         <div className="flex items-center justify-center py-10 text-center text-gray-500">
//           {state === "FOLLOWING"
//             ? "Not following anyone yet"
//             : "No followers yet"}
//         </div>
//       </div>
//     </section>
//   );
// };