import { useMutation } from "@tanstack/react-query";

import { createTasks } from "../../service/tasks";
import { CreateTaskPayload } from "../../types/tasks";

export const useMutationCreateTask = () => {
  return useMutation({
    mutationFn: async (data: CreateTaskPayload) => await createTasks(data),
  });
};
