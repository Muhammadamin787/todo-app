"use client";

import { IColumn, ITask } from "@/utils/types";
import { TaskDeletePopover } from "./components";
import { setTaskModal, useDispatch } from "lib/redux";
import { Draggable } from "react-beautiful-dnd";
import React from "react";

interface ITaskProps {
    task: ITask;
    index: number;
    columnId: IColumn["id"];
}

function Task({ task, columnId, index }: ITaskProps) {

    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(setTaskModal({
            open: true,
            task,
            columnId
        }));
    };

    return (
        <Draggable draggableId={task.$id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`group mb-1 cursor-pointer select-none rounded-sm border border-gray-400 bg-white px-2 pt-1 text-sm hover:bg-slate-100 flex justify-between ${snapshot.isDragging ? "bg-slate-100" : ""}`}
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    onClick={onClick}
                >
                    {task.title}
                    <TaskDeletePopover taskId={task.$id} columnId={columnId} />
                </div>
            )}
        </Draggable>
    );
}

export default Task;
