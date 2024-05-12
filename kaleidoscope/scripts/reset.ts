import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http"
import "dotenv/config"

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, {schema});

const main = async () => {
    try {
      console.log("Resetting the database");
  
      // Delete all existing data
      await Promise.all([
        db.delete(schema.userProgress),
        db.delete(schema.challenges),
        db.delete(schema.units),
        db.delete(schema.lessons),
        db.delete(schema.courses),
        db.delete(schema.challengeOptions),
        db.delete(schema.challengeProgress),
        // db.delete(schema.userSubscription),
      ]);
      
      console.log("Resetting finished");
    } catch (error) {
      console.error(error);
      throw new Error("Failed to reset the database");
    }
  };
  
  void main();
  