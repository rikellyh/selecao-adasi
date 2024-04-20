import { CreateStudentPayload, GetStudentsResponse } from "../types/students";
import { api } from "./api";

const URL = `/students`;

export const getStudents = async () => {
  const { data } = await api.get<GetStudentsResponse>(URL);

  return data;
};

export const createStudents = async (payload: CreateStudentPayload) => {
  const { data } = await api.post(URL, {
    ...payload,
  });

  return data;
};

export const editStudents = async (payload: CreateStudentPayload) => {
  const { data } = await api.patch(`${URL}/${payload.selectedStudentCpf}`, {
    cpf: payload.cpf,
    name: payload.name,
    registration: payload.registration,
    courseId: payload.courseId,
  });

  return data;
};

export const deleteStudents = async (cpf: string) => {
  const { data } = await api.delete(`${URL}/${cpf}`);

  return data;
};
