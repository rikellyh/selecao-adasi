import { useMutation } from "@tanstack/react-query";

import { editCourses } from "../../service/courses";
import { Course } from "../../types/courses";

export const useMutationEditCourse = () => {
  return useMutation({
    mutationFn: async (data: Course) => await editCourses(data),
  });
};
