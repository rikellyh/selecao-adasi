import { useMutation } from "@tanstack/react-query";

import { deleteCourses } from "../../service/courses";
import { Course } from "../../types/courses";

export const useMutationDeleteCourse = () => {
  return useMutation({
    mutationFn: async (data: Course) => await deleteCourses(data),
  });
};
