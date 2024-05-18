"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";

export const Promo = () => {
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setMessage("In the process of development !!!");
    setTimeout(() => {
        setMessage("");
        }, 3000); 
    };

  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-4">
        <h2 className="font-bold text-lg">Try super for free</h2>
        <p>No ads, personalized practice, and unlimited Legendary!</p>
      </div>
      <div className="flex justify-center">
        <Button size="lg" variant="secondary" onClick={handleClick}>
          Try 2 weeks free
        </Button>
      </div>
      {message && (
        <div className="mt-4 text-center text-green-600">
          {message}
        </div>
      )}
    </div>
  );
};
