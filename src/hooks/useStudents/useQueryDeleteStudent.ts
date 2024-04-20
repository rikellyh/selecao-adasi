import { useMutation } from "@tanstack/react-query";

import { deleteStudents } from "../../service/students";

export const useMutationDeleteStudent = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteStudents(id),
  });
};
