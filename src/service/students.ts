import { GetStudentsResponse } from "../types/students";
import { api } from "./api";

const URL = `/students`;

export const getStudents = async () => {
  const { data } = await api.get<GetStudentsResponse>(URL);

  return data;
};
