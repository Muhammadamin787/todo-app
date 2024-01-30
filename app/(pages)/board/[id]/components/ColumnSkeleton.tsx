import React from "react";
import { Skeleton } from "@/components/shadcn/ui";

interface Props {
    length: number,
    show: boolean
}

const ColumnSkeleton = ({ length, show }: Props) => {
    if (!show) return null;

    return new Array(length).fill(null).map((_, key) =>
        <div key={key} className="border-slate-150 space-y-2 rounded-sm border p-3">
            <Skeleton className="h-[40px] w-[233px]" />
            <Skeleton className="h-[60px] w-[233px]" />
            <Skeleton className="h-[60px] w-[233px]" />
            <Skeleton className="h-[60px] w-[233px]" />
        </div>
    );
};
export default ColumnSkeleton;
