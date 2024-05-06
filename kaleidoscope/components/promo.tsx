"use client";

import Image from "next/image";
import { Button } from "./ui/button";

export const Promo = () => {
    return (
        <div className="border-2 rounded-xl p-4 space-y-4">
            <div className="space-y-4">
                <h2 className="font-bold text-lg">
                    Try super for free
                </h2>
                <p>
                    No ads, personalized practice, and unlimited Legendary!
                </p>
            </div>
            <div className="flex justify-center">
                <Button size="lg" variant="secondary">
                    Try 2 weeks free
                </Button>
            </div>
        </div>
    )
}
