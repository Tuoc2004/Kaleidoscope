import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding db");
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "English",
                imageSrc: "/US.svg",
            },
            {
                id: 2,
                title: "Spanish",
                imageSrc: "/ES.svg",
            },
        ]);

        await db.insert(schema.units).values([{
            id: 1,
            courseId: 1,
            title: "Bai 1",
            description: "Tieng anh co ban",
            order: 1,
        }]);

        await db.insert(schema.lessons).values([
            {
                id: 1,
                unitId: 1,
                order: 1,
                title: "Nouns"
            },
            {
                id: 2,
                unitId: 1,
                order: 2,
                title: "Nouns"
            },
            {
                id: 3,
                unitId: 1,
                order: 3,
                title: "Verbs"
            },
            {
                id: 4,
                unitId: 1,
                order: 4,
                title: "Verbs"
            },
            {
                id: 5,
                unitId: 1,
                order: 5,
                title: "Verbs"
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 1,
                lessonId: 1,
                type: "SELECT",
                order: 1,
                question: 'Tu nao trong so tu nay nghia la "mot nguoi dan ong"?',
            },
            {
                id: 2,
                lessonId: 1,
                type: "ASSIST",
                order: 2,
                question: '"the man" nghia la gi?',
            },
            {
                id: 3,
                lessonId: 1,
                type: "SELECT",
                order: 2,
                question: 'Tu nao trong so tu nay nghia la "mot nguoi phu nu"?',
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 1,
                imageSrc: "/shop.svg",
                correct: true,
                text: "the man",
                audioSrc: "/us_man.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/shop.svg",
                correct: false,
                text: "the woman",
                audioSrc: "/us_woman.mp3",
            },
            {
                challengeId: 1,
                imageSrc: "/shop.svg",
                correct: false,
                text: "the bisexual",
                audioSrc: "/us_bi.mp3",
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 2,
                correct: true,
                text: "mot nguoi dan ong",
                audioSrc: "/us_man.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "mot nguoi phu nu",
                audioSrc: "/us_woman.mp3",
            },
            {
                challengeId: 2,
                correct: false,
                text: "mot nguoi be de",
                audioSrc: "/us_bi.mp3",
            },
        ]);

        await db.insert(schema.challengeOptions).values([
            {
                challengeId: 3,
                imageSrc: "/shop.svg",
                correct: false,
                text: "the man",
                audioSrc: "/us_man.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/shop.svg",
                correct: true,
                text: "the woman",
                audioSrc: "/us_woman.mp3",
            },
            {
                challengeId: 3,
                imageSrc: "/shop.svg",
                correct: false,
                text: "the bisexual",
                audioSrc: "/us_bi.mp3",
            },
        ]);

        await db.insert(schema.challenges).values([
            {
                id: 4,
                lessonId: 2,
                type: "SELECT",
                order: 1,
                question: 'Tu nao trong so tu nay nghia la "mot nguoi dan ong"?',
            },
            {
                id: 5,
                lessonId: 2,
                type: "ASSIST",
                order: 2,
                question: '"the man" nghia la gi?',
            },
            {
                id: 6,
                lessonId: 2,
                type: "SELECT",
                order: 2,
                question: 'Tu nao trong so tu nay nghia la "mot nguoi phu nu"?',
            },
        ]);

        console.log("Seeding finished");
    } catch (error) {
        console.error(error)
        throw new Error("Failed to seed db")
    }
}

main();

