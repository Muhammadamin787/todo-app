/** @format */

import React, { PropsWithChildren } from "react";
import { Droppable, DroppableProps } from "react-beautiful-dnd";

interface DropProviderProps extends Omit<DroppableProps, "children">, PropsWithChildren {
    className?: string
}

function DropProvider({ children, className,...props }: DropProviderProps) {
    return (
        <Droppable {...props}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className={className}>
                    {children}
                </div>
            )}
        </Droppable>
    );
}

export default DropProvider;
