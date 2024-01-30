import { IColumn, ITask } from "@/utils/types";
import { DropResult } from "react-beautiful-dnd";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: TaskSliceState = {
    tasks: {},
    modal: {
        open: false
    }
};

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {

        setTasks: (state, { payload }: ITasksWithColumnAction) => {
            const { tasks, columnId } = payload;

            if (state.tasks[columnId]) {
                state.tasks[columnId] = tasks;
            } else {
                state.tasks = {
                    ...state.tasks,
                    [columnId]: tasks
                };
            }
        },

        setTaskModal: (state, { payload }: PayloadAction<ITaskModal>) => {
            state.modal = payload;
        },

        setMoveTask: (state, { payload }: PayloadAction<DropResult>) => {
            const taskId = payload.draggableId;
            const currentColumnId = payload.source.droppableId;
            const targetColumnId = payload.destination?.droppableId!;
            const targetTaskIndex = payload.destination?.index!;

            // Remove from ol previous column
            const currentTask = state.tasks[currentColumnId].find(task => task.$id === taskId);
            state.tasks[currentColumnId] = state.tasks[currentColumnId].filter(task => task.$id !== taskId);

            // Add to target column
            if (currentTask) {
                const updatedColumn = [...state.tasks[targetColumnId]];
                updatedColumn.splice(targetTaskIndex - 1, 1, currentTask);
                state.tasks[targetColumnId] = updatedColumn;
            }
        }
    }
});

export const {
    setTasks,
    setTaskModal,
    setMoveTask
} = taskSlice.actions;

/* Types */
export interface TaskSliceState {
    tasks: {
        [key: IColumn["$id"]]: ITask[];
    };
    modal: {
        open: boolean,
        task?: Partial<ITask>,
        columnId?: IColumn["$id"],
    };
}

type ITaskModal = TaskSliceState["modal"]
type ITasksWithColumnAction = PayloadAction<{ columnId: IColumn["$id"]; tasks: ITask[] }>
