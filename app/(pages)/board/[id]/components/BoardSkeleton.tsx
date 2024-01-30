import React from "react";
import { Skeleton } from "@/components/shadcn/ui";

interface Props {
    length: number,
    show: boolean
}

const ColumnSkeleton = ({ length, show }: Props) => {
    if (!show) return null;

    return new Array(length).fill(null).map((_, key) =>
        <div key={key} className="border-slate-150 space-y-2 h-[100px] w-[220px] rounded-sm border p-1">
            <Skeleton className="h-full w-full rounded-sm" />
        </div>
    );
};
export default ColumnSkeleton;
