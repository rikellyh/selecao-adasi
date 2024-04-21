import { useMutation } from "@tanstack/react-query";

import { editTasks } from "../../service/tasks";
import { Task } from "../../types/tasks";

export const useMutationEditTask = () => {
  return useMutation({
    mutationFn: async (data: Task) => await editTasks(data),
  });
};
