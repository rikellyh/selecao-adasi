import { useMutation } from "@tanstack/react-query";

import { deleteTasks } from "../../service/tasks";

export const useMutationDeleteTask = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteTasks(id),
  });
};
