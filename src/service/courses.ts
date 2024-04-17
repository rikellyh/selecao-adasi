import { CreateCoursePayload, GetCoursesResponse } from "../types/courses";
import { api } from "./api";

const URL = `/courses`;

export const getCourses = async () => {
  const { data } = await api.get<GetCoursesResponse>(URL);

  return data;
};

export const createCourses = async (payload: CreateCoursePayload) => {
  const { data } = await api.post(URL, {
    ...payload,
  });

  return data;
};
