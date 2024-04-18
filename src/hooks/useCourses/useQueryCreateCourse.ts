import { useMutation } from "@tanstack/react-query";

import { createCourses } from "../../service/courses";
import { CreateCoursePayload } from "../../types/courses";

import { Alerts } from "../../components/Toast";

export const useMutationCreateCourse = () => {
  return useMutation({
    mutationFn: async (data: CreateCoursePayload) => await createCourses(data),
    onSuccess: () => Alerts.SUCCESS("Curso criado com sucesso!"),
    onError: () => Alerts.ERROR("Houve um erro na sua requisição"),
  });
};
