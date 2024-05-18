import { 
    BronzeLeagueSvg, 
    EmptyFireSvg, 
    EmptyMedalSvg, 
    FireSvg, 
    LightningProgressSvg 
} from "@/components/svgs";

type Props = {
    streak : number;
    totalXp : number;
    league : string;
    coursesFinished : number;
}

const ProfileStatsSection = async( { streak, totalXp, league, coursesFinished }: Props) => {
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
                <span className="text-sm text-gray-400 md:text-base">
                Total XP
                </span>
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
            {coursesFinished === 0 ? <EmptyMedalSvg /> : <EmptyMedalSvg />}
            <div className="flex flex-col">
                <span
                className={[
                    "text-xl font-bold",
                    coursesFinished === 0 ? "text-gray-400" : "",
                ].join(" ")}
                >
                {coursesFinished}
                </span>
                <span className="text-sm text-gray-400 md:text-base">
                Completed courses
                </span>
            </div>
            </div>
        </div>
        </section>
    );
};


export default ProfileStatsSection;
