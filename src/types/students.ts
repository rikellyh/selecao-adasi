import { Course } from "./courses";

export type GetStudentsResponse = Student[];

export interface Student {
  cpf: string;
  name: string;
  registration: string;
  course: Course;
}

export interface CreateStudentPayload {
  cpf: string;
  name: string;
  registration: string;
  courseId: string;
  selectedStudentCpf: string;
}
