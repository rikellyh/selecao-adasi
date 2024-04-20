import { useMutation } from "@tanstack/react-query";

import { editStudents } from "../../service/students";
import { CreateStudentPayload } from "../../types/students";

export const useMutationEditStudent = () => {
  return useMutation({
    mutationFn: async (data: CreateStudentPayload) => await editStudents(data),
  });
};
