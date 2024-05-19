"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { usePracticeModal } from "@/store/use-practice-modal";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export const PracticeModal = () => {
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = usePracticeModal();

    useEffect(() => setIsClient(true), []);

    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/heart.svg" alt="Heart" height={100} width={100} />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        Lam lai
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Lam lai se co the co them tim va diem. Tim va diem se khong bi mat trong qua trinh lam lai.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            variant="primary"
                            className="w-full"
                            size="lg"
                            onClick={close}
                        >
                            Hieu roi
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
};