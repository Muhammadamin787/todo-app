"use client";

import { Button, DropdownMenuItem, Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/ui";
import { IColumn } from "@/utils/types";
import { PopoverClose } from "@radix-ui/react-popover";
import { Trash } from "lucide-react";
import { useState } from "react";

interface IProps {
    column: IColumn;
    onClick: () => void;
}

function ColumnDeleteButton({ column, onClick }: IProps) {

    // Helper Hooks

    // States
    const [open, setPopover] = useState(false);

    // Functions
    const onDeleteColumn = () => {
        onClick();
        setPopover(false);
    };


    return (
        // <DropdownMenuItem className="flex gap-2" onClick={() => setPopover(true)}>
        <DropdownMenuItem className="flex gap-2" onClick={onDeleteColumn}>
            <Popover open={open}>
                <PopoverTrigger asChild>
                    {/*<Button*/}
                    {/*    size="sm"*/}
                    {/*    variant="outline"*/}
                    {/*    className="hover:border-red-600 hover:text-red-600"*/}
                    {/*    onClick={() => setPopover(true)}*/}
                    {/*>*/}
                    <Trash size={17} />
                    {/*</Button>*/}
                </PopoverTrigger>
                <PopoverContent className="w-30 text-sm relativ">
                    <h2>
                        <b>{column.title}</b>
                        <span className="ml-1 text-red-500">
                        column will be deleted!
                        </span>
                    </h2>
                    <div className="mt-3 flex justify-between ">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={onDeleteColumn}
                            className="px-4 text-red-500 hover:border-red-500 hover:text-red-500"
                        >
                            {/* {!isDeleting ? <LoadingSpinner /> :  */}
                            Delete
                            {/* // } */}
                        </Button>
                        <PopoverClose asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPopover(false)}
                                className="px-4"
                            >
                                Cancel
                            </Button>
                        </PopoverClose>
                    </div>
                </PopoverContent>
            </Popover>
            <span>Delete</span>
            {/*<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>*/}
        </DropdownMenuItem>

    );
}

export default ColumnDeleteButton;

// {!isDeleting ? <div className="w-[80%] absolute flex justify-center items-center">
{/* <LoadingSpinner /> */
}
// </div> : ""}