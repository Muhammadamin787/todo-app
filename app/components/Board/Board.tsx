"use client";

import Link from "next/link";
import React from "react";
import { IBoard } from "@/utils/types/boardTypes";

interface IBoardProps {
    board: IBoard;
}

function Board({ board }: IBoardProps) {

    // const { deleteBoard, isDeleting } = useBoards();
    // const onDelete = () => {
    //     deleteBoard(board.$id);
    // };

    return (
        <Link href={`board/${board.$id}`}>
            <div
                className="px-4 h-24 w-[220px] flex items-center text-[1.1em] text-gray-700 border rounded-sm hover:border-gray-400 hover:text-gray-950">
                {board.title}
            </div>
        </Link>
        // <Button variant="destructive" onClick={onDelete}><Trash /> </Button>
    );
}

export default Board;
