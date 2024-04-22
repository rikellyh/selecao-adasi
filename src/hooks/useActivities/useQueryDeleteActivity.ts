import { useMutation } from "@tanstack/react-query";

import { deleteActivities } from "../../service/activities";

export const useMutationDeleteActivity = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteActivities(id),
  });
};
