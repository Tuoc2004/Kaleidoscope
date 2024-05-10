"use server";

import db from "@/db/drizzle";
import { getUserProgress } from "@/db/queries";
import { auth, currentUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const POINTS_TO_REFILL = 50;

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth();
    const user = await currentUser();

    if(!userId || !user) {
        throw new Error("Not logged in");
    }

    if (!courseId) {
        throw new Error("Course not found");
    }
    
    const exitingUserProgress = await getUserProgress();
    if (exitingUserProgress) {
        await db.update(userProgress).set({
            activeCoursesId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/user.svg",
        });

        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }

    await db.insert(userProgress).values({
        userId,
        activeCoursesId: courseId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/user.svg",
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
}

export const reduceHearts = async (challengeId: number) => {
    const { userId } = await auth();

    if(!userId) {
        throw new Error("Not logged in");
    }

    const currentUserProgress = await getUserProgress();

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    })

    if(!challenge) {
        throw new Error("Challenge not found");
    }

    const exitingChallengesProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId),
        )
    })
    const isPractice = !!exitingChallengesProgress;

    if (isPractice) {
        return {error: "practice"};
    }

    if (!currentUserProgress) {
        throw new Error("User progress not found");
    }

    if (currentUserProgress.hearts === 0) {
        return {error: "no_hearts"};
    }

    await db.update(userProgress).set({
        hearts: Math.max(currentUserProgress.hearts - 1, 0),
    }).where(eq(userProgress.userId, userId));

    revalidatePath("/learn");
    revalidatePath("/shopItem");
    revalidatePath("/courses");
    revalidatePath("/leaderboard");

}
export const refillHearts = async () => {
    const currentUserProgress = await getUserProgress();

    if (!currentUserProgress) {
        throw new Error("User progress not found");
    }

    if (currentUserProgress.hearts === 5) {
        throw new Error("Hearts already full");
    }

    if (currentUserProgress.points < POINTS_TO_REFILL) {
        throw new Error("Not enough points");
    }

    await db.update(userProgress).set({
        hearts: Math.min(currentUserProgress.hearts + 1, 5),
        points: currentUserProgress.points - POINTS_TO_REFILL,
    }).where(eq(userProgress.userId, currentUserProgress.userId));

    revalidatePath("/shopItem");
    revalidatePath("/leaderboard");
    revalidatePath("/learn");
}