/** @format */

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@/components/shadcn/ui";
import React from "react";

function PlaceholderTask() {
    return (
        <div className="h-16 bg-slate-50 hover:bg-slate-100 border rounded">
            <TooltipProvider delayDuration={200} skipDelayDuration={100}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex size-full items-center justify-center select-none text-slate-300">
                            Drop here
                        </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>Drop a task to add</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}

export default PlaceholderTask;
