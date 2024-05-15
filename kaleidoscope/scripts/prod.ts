import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding database");

        // Delete all existing data
        await Promise.all([
            db.delete(schema.userProgress),
            db.delete(schema.challenges),
            db.delete(schema.units),
            db.delete(schema.lessons),
            db.delete(schema.courses),
            db.delete(schema.challengeOptions),
        ]);

        // Insert courses
        const courses = await db
            .insert(schema.courses)
            .values([{ title: "Tiếng anh", imageSrc: "/US.svg" }])
            .returning();

        // For each course, insert units
        for (const course of courses) {
            const units = await db
                .insert(schema.units)
                .values([
                    {
                        courseId: course.id,
                        title: "Bài 1",
                        description: `${course.title} cơ bản`,
                        order: 1,
                    },
                    {
                        courseId: course.id,
                        title: "Bài 2",
                        description: `${course.title} trung cấp`,
                        order: 2,
                    },
                ])
                .returning();

            // For each unit, insert lessons
            for (const unit of units) {
                const lessons = await db
                    .insert(schema.lessons)
                    .values([
                        { unitId: unit.id, title: "Danh từ", order: 1 },
                        { unitId: unit.id, title: "Động từ", order: 2 },
                        { unitId: unit.id, title: "Tính từ", order: 3 },
                        { unitId: unit.id, title: "Cụm từ", order: 4 },
                        { unitId: unit.id, title: "Câu", order: 5 },
                    ])
                    .returning();

                // For each lesson, insert challenges
                for (const lesson of lessons) {
                    const challenges = await db
                        .insert(schema.challenges)
                        .values([
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Từ nào có nghĩa là "người đàn ông"?',
                                order: 1,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Từ nào có nghĩa là "người phụ nữ"?',
                                order: 2,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Từ nào có nghĩa là "con trai"?',
                                order: 3,
                            },
                            {
                                lessonId: lesson.id,
                                type: "ASSIST",
                                question: '"the man" nghĩa là gì?',
                                order: 4,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Từ nào có nghĩa là "con gái"?',
                                order: 5,
                            },
                            {
                                lessonId: lesson.id,
                                type: "ASSIST",
                                question: '"the woman" nghĩa là gì?',
                                order: 6,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Từ nào có nghĩa là "người bà"?',
                                order: 7,
                            },
                            {
                                lessonId: lesson.id,
                                type: "ASSIST",
                                question: '"the grandfather" nghĩa là gì?',
                                order: 8,
                            },
                        ])
                        .returning();

                    // For each challenge, insert challenge options
                    for (const challenge of challenges) {
                        if (challenge.order === 1) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "man",
                                    imageSrc: "/us_man.svg",
                                    audioSrc: "/us_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "woman",
                                    imageSrc: "/us_woman.svg",
                                    audioSrc: "/us_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "boy",
                                    imageSrc: "/us_boy.svg",
                                    audioSrc: "/us_boy.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 2) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "woman",
                                    imageSrc: "/us_woman.svg",
                                    audioSrc: "/us_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "boy",
                                    imageSrc: "/us_boy.svg",
                                    audioSrc: "/us_boy.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "man",
                                    imageSrc: "/us_man.svg",
                                    audioSrc: "/us_man.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 3) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "woman",
                                    imageSrc: "/us_woman.svg",
                                    audioSrc: "/us_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "man",
                                    imageSrc: "/us_man.svg",
                                    audioSrc: "/us_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "boy",
                                    imageSrc: "/us_boy.svg",
                                    audioSrc: "/us_boy.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 4) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "người phụ nữ",
                                    audioSrc: "/us_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "người đàn ông",
                                    audioSrc: "/us_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "con trai",
                                    audioSrc: "/us_boy.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 5) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "man",
                                    imageSrc: "/us_man.svg",
                                    audioSrc: "/us_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "woman",
                                    imageSrc: "/us_woman.svg",
                                    audioSrc: "/us_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "girl",
                                    imageSrc: "/us_girl.svg",
                                    audioSrc: "/us_girl.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 6) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "người phụ nữ",
                                    audioSrc: "/us_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "con trai",
                                    audioSrc: "/us_boy.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "con gái",
                                    audioSrc: "/us_girl.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 7) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "girl",
                                    imageSrc: "/us_girl.svg",
                                    audioSrc: "/us_girl.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "grandmother",
                                    imageSrc: "/grandmother.svg",
                                    audioSrc: "/grandmother.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "man",
                                    imageSrc: "/us_man.svg",
                                    audioSrc: "/us_man.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 8) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "người phụ nữ",
                                    audioSrc: "/us_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "người ông",
                                    audioSrc: "/grandfather.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "con trai",
                                    audioSrc: "/us_boy.mp3",
                                },
                            ]);
                        }
                    }
                }
            }
        };

        const courses2 = await db
            .insert(schema.courses)
            .values([{ title: "Spanish", imageSrc: "/es.svg" }])
            .returning();

        // For each course, insert units
        for (const course of courses2) {
            const units = await db
                .insert(schema.units)
                .values([
                    {
                        courseId: course.id,
                        title: "Unit 1",
                        description: `Learn the basics of ${course.title}`,
                        order: 1,
                    },
                    {
                        courseId: course.id,
                        title: "Unit 2",
                        description: `Learn intermediate ${course.title}`,
                        order: 2,
                    },
                ])
                .returning();

            // For each unit, insert lessons
            for (const unit of units) {
                const lessons = await db
                    .insert(schema.lessons)
                    .values([
                        { unitId: unit.id, title: "Nouns", order: 1 },
                        { unitId: unit.id, title: "Verbs", order: 2 },
                        { unitId: unit.id, title: "Adjectives", order: 3 },
                        { unitId: unit.id, title: "Phrases", order: 4 },
                        { unitId: unit.id, title: "Sentences", order: 5 },
                    ])
                    .returning();

                // For each lesson, insert challenges
                for (const lesson of lessons) {
                    const challenges = await db
                        .insert(schema.challenges)
                        .values([
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Which one of these is "the man"?',
                                order: 1,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Which one of these is "the woman"?',
                                order: 2,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Which one of these is "the boy"?',
                                order: 3,
                            },
                            {
                                lessonId: lesson.id,
                                type: "ASSIST",
                                question: '"the man"',
                                order: 4,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Which one of these is "the zombie"?',
                                order: 5,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Which one of these is "the robot"?',
                                order: 6,
                            },
                            {
                                lessonId: lesson.id,
                                type: "SELECT",
                                question: 'Which one of these is "the girl"?',
                                order: 7,
                            },
                            {
                                lessonId: lesson.id,
                                type: "ASSIST",
                                question: '"the zombie"',
                                order: 8,
                            },
                        ])
                        .returning();

                    // For each challenge, insert challenge options
                    for (const challenge of challenges) {
                        if (challenge.order === 1) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "el hombre",
                                    imageSrc: "/es_man.svg",
                                    audioSrc: "/es_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "la mujer",
                                    imageSrc: "/es_woman.svg",
                                    audioSrc: "/es_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el chico",
                                    imageSrc: "/es_boy.svg",
                                    audioSrc: "/es_boy.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 2) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "la mujer",
                                    imageSrc: "/es_woman.svg",
                                    audioSrc: "/es_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el chico",
                                    imageSrc: "/es_boy.svg",
                                    audioSrc: "/es_boy.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el hombre",
                                    imageSrc: "/es_man.svg",
                                    audioSrc: "/es_man.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 3) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "la mujer",
                                    imageSrc: "/es_woman.svg",
                                    audioSrc: "/es_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el hombre",
                                    imageSrc: "/es_man.svg",
                                    audioSrc: "/es_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "el chico",
                                    imageSrc: "/es_boy.svg",
                                    audioSrc: "/es_boy.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 4) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "la mujer",
                                    audioSrc: "/es_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "el hombre",
                                    audioSrc: "/es_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el chico",
                                    audioSrc: "/es_boy.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 5) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el hombre",
                                    imageSrc: "/es_man.svg",
                                    audioSrc: "/es_man.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "la mujer",
                                    imageSrc: "/es_woman.svg",
                                    audioSrc: "/es_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "el zombie",
                                    imageSrc: "/zombie.svg",
                                    audioSrc: "/es_zombie.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 6) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "el robot",
                                    imageSrc: "/robot.svg",
                                    audioSrc: "/es_robot.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el zombie",
                                    imageSrc: "/zombie.svg",
                                    audioSrc: "/es_zombie.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el chico",
                                    imageSrc: "/es_boy.svg",
                                    audioSrc: "/es_boy.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 7) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "la nina",
                                    imageSrc: "/es_girl.svg",
                                    audioSrc: "/es_girl.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el zombie",
                                    imageSrc: "/zombie.svg",
                                    audioSrc: "/es_zombie.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el hombre",
                                    imageSrc: "/es_man.svg",
                                    audioSrc: "/es_man.mp3",
                                },
                            ]);
                        }

                        if (challenge.order === 8) {
                            await db.insert(schema.challengeOptions).values([
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "la mujer",
                                    audioSrc: "/es_woman.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: true,
                                    text: "el zombie",
                                    audioSrc: "/es_zombie.mp3",
                                },
                                {
                                    challengeId: challenge.id,
                                    correct: false,
                                    text: "el chico",
                                    audioSrc: "/es_boy.mp3",
                                },
                            ]);
                        }
                    }
                }
            }
        }
        console.log("Database seeded successfully");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
};

void main();