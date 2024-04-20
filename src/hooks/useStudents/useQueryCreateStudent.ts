import { useMutation } from "@tanstack/react-query";

import { CreateStudentPayload } from "../../types/students";
import { createStudents } from "../../service/students";

export const useMutationCreateStudent = () => {
  return useMutation({
    mutationFn: async (data: CreateStudentPayload) =>
      await createStudents(data),
  });
};
