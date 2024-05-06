import { auth } from "@clerk/nextjs";
import { cache } from "react";
import { courses, units, userProgress, challenges, lessons } from "./schema";
import { eq } from "drizzle-orm";
import db from "./drizzle";


export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if(!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        }
    })

    return data
})

export const getUnits = cache(async () => {
    const userProgress = await getUserProgress();

    if(!userProgress?.activeCourse) {
        return [];
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourse.id),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeOptions: true,
                            challengeProgress: true
                        }
                    }
                }
            }
        }
    });

    const normalizedData = data.map(unit => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengeProgress
                    && challenge.challengeProgress.length > 0
                    && challenge.challengeProgress.every((progress) => progress.completed)
            });

            return {
                ...lesson,
                completed: allCompletedChallenges
            }
        })
        return {
            ...units,
            lessons: lessonsWithCompletedStatus
        }
    })
})

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();
    return data
})

export const getCoursesById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId)
    })
    return data
})

export const getTopTenUsers = cache(async () => {
    const { userId } = await auth();

    if(!userId) {
        return [];
    }

    const data = await db.query.userProgress.findMany({
        orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
        limit: 10,
        columns: {
            userId: true,
            userName: true,
            userImageSrc: true,
            points: true
        }
    })
    
    return data;
})