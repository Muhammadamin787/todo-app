"use client";
import ModalColumn from "@/components/Modals/ModalColumn";
import { Button } from "@/components/shadcn/ui";
import { IBoard } from "@/utils/types/boardTypes";
import React, { useCallback, useEffect, useState } from "react";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import Column from "./Column";
import useColumns from "@/hooks/useColumns";
import ModalTask from "@/components/Modals/ModalTask";
import useTasks from "@/hooks/useTasks";
import DropProvider from "@/providers/DropProvider";
import { dragItemTypes } from "@/utils/constans";
import ColumnSkeleton from "@/(pages)/board/[id]/components/ColumnSkeleton";
import { setCurrentBoard, useDispatch } from "lib/redux";
import { useAuth } from "@/context/AuthProvider";

interface ColumnListProps {
    boardId: IBoard["$id"];
}

function ColumnList({ boardId }: ColumnListProps) {

    // Helper Hooks
    const dispatch = useDispatch();

    const { moveTask } = useTasks();
    const { columns, isFetching, moveColumn } = useColumns({
        fetchOnMount: true,
        boardId
    });

    // Effects
    useEffect(() => {
        dispatch(setCurrentBoard(boardId));
    }, []);

    // States
    const [open, setOpenModal] = useState(false);

    // Functions
    const onDragEnd: OnDragEndResponder = useCallback((item, provider) => {
        if (item.destination?.droppableId) {
            if (item.type === dragItemTypes.COLUMN) {
                moveColumn({
                    targetColumnIndex: item.destination?.index,
                    currentBoardId: item.source.droppableId,
                    columnId: item.draggableId
                });
            } else {
                moveTask({
                    targetColumnId: item.destination?.droppableId,
                    targetTaskIndex: item.destination?.index,
                    currentColumnId: item.source.droppableId,
                    taskId: item.draggableId
                });
            }
        }

    }, []);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <DropProvider
                direction="horizontal"
                droppableId={boardId}
                type={dragItemTypes.COLUMN}
                className="bg-gray-50 rounded-lg my-2 p-2 max-w-screen overflow-x-auto w-full flex gap-2">

                <div className="flex sgap-2 flex-grow gap-2">
                    {!isFetching && columns.map((column, index) => (
                        <Column
                            column={column}
                            index={index}
                            key={column.$id}
                            isLoading={isFetching}
                        />
                    ))}
                    <ColumnSkeleton length={3} show={isFetching} />
                </div>
                <Button
                    variant="outline"
                    className="broder-slate-300 min-w-[240px] border text-[1.1em] h-12"
                    onClick={() => setOpenModal((prev) => !prev)}
                >
                    + Add a Column
                </Button>
            </DropProvider>

            <ModalColumn
                open={open}
                boardId={boardId}
                onOpenChange={setOpenModal}
            />
            <ModalTask />
        </DragDropContext>
    );
}

export default ColumnList;
