/** @format */

"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/shadcn/ui";
import { IconBack } from "@/utils/icons";

function ButtonGoBack() {
    const router = useRouter();

    const onGoBack = () => {
        router.back();
    };

    return (
        <Button onClick={onGoBack} variant="outline" className="flex gap-2">
            <IconBack />
            {/*Boards*/}
        </Button>
    );
}

export default ButtonGoBack;
