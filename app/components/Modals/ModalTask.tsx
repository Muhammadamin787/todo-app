"use client";
import { ModalBaseProps } from "@/utils/types";
import ModalBase from "./BaseModal";
import { FormTask } from "../Forms";
import { selectTaskModal, setTaskModal, useDispatch, useSelector } from "lib/redux";

interface ModalTaskProps extends ModalBaseProps {
    className?: string;
}

function ModalTask({ className, ...props }: ModalTaskProps) {

    // Helper Hooks
    const dispatch = useDispatch();

    // Selectors
    const { open, task, columnId } = useSelector(selectTaskModal);

    // Functions
    const onOpenChange = () => {
        dispatch(setTaskModal({ open: false }));
    };

    return (
        <ModalBase {...props} open={open} onOpenChange={onOpenChange}>
            <FormTask columnId={columnId} data={task} />
        </ModalBase>
    );
}

export default ModalTask;
