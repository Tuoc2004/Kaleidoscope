import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http"
import "dotenv/config"

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, {schema});

const main = async () => {
    try {
        console.log("Seeding database...");
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
                imageSrc: "/US.svg"
            },
            {
                id: 2,
                title: "Croatian",
                imageSrc: "/HR.svg"
            }
        ])

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Introduction",
                description: "Learn the basics of English",
                order: 1
            }
        ])

        
        console.log("Seeding complete.");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
}

main();