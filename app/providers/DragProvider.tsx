/** @format */

import React, { PropsWithChildren } from "react";
import { Draggable } from "react-beautiful-dnd";

interface DragProviderProps
    extends PropsWithChildren,
        React.HTMLAttributes<HTMLDivElement> {
    id: string;
    index: number;
}

function DragProvider({ children, id, index, ...props }: DragProviderProps) {
    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    {...props}
                >
                    {children}
                </div>
            )}
        </Draggable>
    );
}
export default DragProvider;