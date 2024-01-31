"use client";

import Link from "next/link";
import React from "react";
import { IBoard } from "@/utils/types/boardTypes";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shadcn/ui";

interface IBoardProps {
    board: IBoard;
}

function Board({ board }: IBoardProps) {
    // Helper Hooks
    const { push } = useRouter();

    // Functions
    const onClick = () => {
        push(`board/${board.$id}`);
    };

    return (
        <div onClick={onClick}>
            <div
                className="px-4 bg-[#F7F7F7] hover:cursor-pointer h-24 w-[230px] break-all flex items-center text-[1.1em] text-gray-700 border rounded-sm hover:border-gray-400 hover:text-gray-950">
                {board.title}
            </div>
        </div>
    );
}

export default Board;
