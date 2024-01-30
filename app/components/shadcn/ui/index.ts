/** @format */

import { ToastTopStyle } from "@/utils/constans";
import { toast as defaultToast } from "./use-toast";

export * from "./button";
export * from "./drawer";
export * from "./dialog";
export * from "./input";
export * from "./label";
export * from "./card";
export * from "./textarea";
export * from "./avatar";
export * from "./menubar";
export * from "./dropdown-menu";
export * from "./skeleton";
export * from "./scroll-area";
export * from "./popover";
export * from "./tooltip";
export * from "./separator";

export const toast: typeof defaultToast = (props) =>
    defaultToast({ className: ToastTopStyle, ...props });
