import { useMutation } from "@tanstack/react-query";

import { deleteCourses } from "../../service/courses";

export const useMutationDeleteCourse = () => {
  return useMutation({
    mutationFn: async (id: string) => await deleteCourses(id),
  });
};
