/** @format */
"use client";

import Board from "./Board";
import useBoards from "@/hooks/useBoards";
import React, { useState } from "react";
import { IBoard } from "@/utils/types/boardTypes";
import ModalBoard from "@/components/Modals/ModalBoard";
import BoardSkeleton from "@/(pages)/board/[id]/components/BoardSkeleton";

interface IBoardModal {
    open: boolean,
    board?: Partial<IBoard>,
}

function BoardList() {

    // Helper Hooks
    const { boards, isFetching } = useBoards({ fetchOnMount: true });

    // States
    const [boardModal, setOpenModal] = useState<IBoardModal>({ open: false });

    // Functions
    const onAddBoard = () => {
        setOpenModal({ open: true });
        // dispatch(setBoardModal({ open: true }));
    };

    return (
        <section className="mx-auto py-5">
            <h1 className="text-2xl font-semibold ">Boards</h1>
            <div className="flex mt-6 gap-3 flex-wrap">
                {boards.map((board, index) => (
                    <Board board={board} key={index} />
                ))}
                <BoardSkeleton length={3} show={isFetching} />
                <button
                    className="w-[220px] h-24 p-4 hover:text-[1.1em] ease-out duration-100 text-gray-500 rounded border border-slate-50 hover:text-gray-800 hover:border-slate-400"
                    onClick={onAddBoard}
                >
                    + Add a Board
                </button>
            </div>

            <ModalBoard
                open={boardModal.open}
                onOpenChange={(open: boolean) => setOpenModal({ open })}
            />
        </section>
    );
}

export default BoardList;
