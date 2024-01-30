/** @format */

import { cn } from "lib/utils";
import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren, React.HTMLAttributes<HTMLDivElement> {
}

const Container = ({ children, className, ...props }: Props) => {
    return (
        <div className={cn("container flex-grow", className)} {...props}>
            {children}
        </div>
    );
};

export default Container;
