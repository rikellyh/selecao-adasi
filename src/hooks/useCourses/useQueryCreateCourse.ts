import { useMutation } from "@tanstack/react-query";

import { createCourses } from "../../service/courses";
import { CreateCoursePayload } from "../../types/courses";

export const useMutationCreateCourse = () => {
  return useMutation({
    mutationFn: async (data: CreateCoursePayload) => await createCourses(data),
  });
};
