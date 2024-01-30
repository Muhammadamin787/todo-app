"use server";

import { ITask } from "./utils/types";

type PartialTask = Partial<ITask>;

export async function updateTaskAction(formData: FormData) {
    "use server";
    //     taskId: ITask["$id"],
    //     newTask: PartialTask,
    // const todoItem = formData.get();

    console.log(formData);

    //     return new Promise((res, rej) => {
    //         res("NEw data");
    //     });
        //     const response = await apServer.updateDocument<PartialTask, ITask>(
        //         DB.collections.TASKS_ID,
        //         taskId,
        //         newTask,
        //     );
    //     console.log(response);
}

export async function firstAction( user: {name: string}) {
    console.log(user);
}
