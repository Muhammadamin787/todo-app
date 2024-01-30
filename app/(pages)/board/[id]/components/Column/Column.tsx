/** @format */

"use client";
import { Button, ScrollArea, Separator } from "@/components/shadcn/ui";
import DropProvider from "@/providers/DropProvider";
import { IColumn } from "@/utils/types";
import React, { HTMLAttributes, useState } from "react";
import { Task } from "../Task";
import { LoadingBricks } from "@/components/Loadings/LoadingBricks";
import { setTaskModal, useDispatch } from "lib/redux";
import useColumns from "@/hooks/useColumns";
import { Draggable } from "react-beautiful-dnd";
import PlaceholderTask from "@/(pages)/board/[id]/components/Task/PlaceholderTask";
import { dragItemTypes } from "@/utils/constans";
import ColumnMenu from "@/(pages)/board/[id]/components/Column/ColumnMenu";
import { LoadingCircle } from "@/components/Loadings/LoadingCircle";

interface IColumnProps extends HTMLAttributes<HTMLDivElement> {
    column: IColumn;
    index: number;
    isLoading: boolean;
}

function Column({ column, isLoading,index }: IColumnProps) {

    // Helper Hooks
    const disaptch = useDispatch();
    const { isDeleting } = useColumns();

    // States
    const [localLoading, setLocalLoading] = useState(false);

    // Functions
    const columnLoading = isLoading || isDeleting;

    const openModal = () => {
        disaptch(setTaskModal({
            open: true,
            columnId: column.$id
        }));
    };

    const onClick = () => {
        // dispatch(setTaskModal({
        //     open: true,
        //     task,
        //     columnId
        // }));
    };
    return (
        <Draggable draggableId={column.$id} index={index} isDragDisabled={localLoading}>
            {(provided, snapshot) => (
                <div
                    onClick={onClick}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    className="flex w-[260px] relative flex-shrink-0 flex-col rounded-sm border border-gray-500 bg-white overflow-hidden"
                >
                    {localLoading ?
                        <div className="absolute z-30 size-full flex items-center justify-center">
                            <LoadingCircle />
                        </div>
                        : ""}
                    <div className={`p-3 ${localLoading ? "blur-sm" : ""}`}>
                        <header className=" flex items-center justify-between pb-4">
                            <div className="font-semibold">{column.title}</div>
                            <ColumnMenu column={column} setLocalLoading={setLocalLoading} />
                        </header>
                        <DropProvider droppableId={column.$id} type={dragItemTypes.TASK}>
                            <div className="relative">
                                <div className={`flex h-[72.3vh] flex-col gap-3 ${columnLoading ? "opacity-15" : ""}`}>
                                    <ScrollArea className="relative -mr-[10px] flex flex-col pr-[10px]">
                                        {column.tasks.map((task,index) => (
                                            <Task task={task} index={index} columnId={column.$id} key={task.$id} />
                                        ))}
                                        {!column.tasks.length ? <PlaceholderTask /> : null}
                                    </ScrollArea>
                                    <Separator className="-mb-1 -mt-2" />
                                    <Button
                                        size="sm"
                                        className="h-7 shrink-0"
                                        onClick={openModal}
                                    >
                                        Add a task
                                    </Button>
                                </div>
                                {
                                    columnLoading ?
                                        <div className="w-full h-full absolute top-0">
                                            <LoadingBricks className="-mt-16" />
                                        </div> : ""
                                }
                            </div>
                        </DropProvider>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default Column;
