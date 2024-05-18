"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export const HeartsModal = () => {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const { isOpen, close } = useHeartsModal();

    useEffect(() => setIsClient(true), []);

    const onClick = () => {
        close();
        router.push("/shopItem")
    }
    if (!isClient) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image src="/dizzy.svg" alt="Dizzy" height={80} width={80} />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        Hết tim mất rồi!!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        Hãy mua thêm trong của hàng
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mb-4">
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            variant="primary"
                            className="w-full"
                            size="lg"
                            onClick={onClick}>
                            Mua thêm tim
                        </Button>
                        <Button
                            variant="primaryOutline"
                            className="w-full"
                            size="lg"
                            onClick={close}
                        >
                            Không cần
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
};