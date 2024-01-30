import { Button, Popover, PopoverContent, PopoverTrigger, toast } from "@/components/shadcn/ui";
import { IColumn, ITask } from "@/utils/types";
import { PopoverClose } from "@radix-ui/react-popover";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import useTasks from "@/hooks/useTasks";

interface IProps {
    taskId: ITask["$id"];
    columnId: IColumn["$id"];
}

function TaskDeletePopover({ taskId, columnId }: IProps) {
    // Helper Hooks
    const { deleteTask, isDeleting } = useTasks();

    // States
    const [open, setPopover] = useState(false);

    // Functions
    const onDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        try {
            deleteTask({ taskId,columnId })
                .unwrap()
                .then(res => {
                    // if (res.isSuccess) {
                    toast({
                        title: "Successfully deleted"
                    });
                    // }
                })
                .catch(err => {

                });
            setPopover(false);
        } catch (error) {
            console.log("Error on delete task:", error);
        }
    };

    return (
        <Popover open={open}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    onClick={(e) => {
                        e.stopPropagation();
                        setPopover(true);
                    }}
                    className="invisible m-1 size-7 shrink-0 p-0 transition-all group-hover:visible"
                >
                    <Trash size={13} />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-30 text-sm">
                <h2 className="text-red-500">This task will be deleted!</h2>
                <div className="mt-3 flex justify-between ">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={onDeleteTask}
                        className="px-4 text-red-500 hover:border-red-500 hover:text-red-500"
                    >
                        Delete
                    </Button>
                    <PopoverClose asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setPopover(false);
                            }}
                            className="px-4"
                        >
                            Cancel
                        </Button>
                    </PopoverClose>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default TaskDeletePopover;
