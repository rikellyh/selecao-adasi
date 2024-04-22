import * as yup from "yup";

export const CreateCourseSchema = yup.object().shape({
  name: yup.string().required("*Digite o nome do curso").trim(),
});

export const CreateStudentSchema = yup.object().shape({
  cpf: yup.string().required("*Campo obrigatório"),
  registration: yup.string().required("*Campo obrigatório").trim(),
  name: yup.string().required("*Campo obrigatório").trim(),
  courseId: yup.string().required("*Campo obrigatório"),
});

export const CreateTaskSchema = yup.object().shape({
  name: yup.string().required("*Campo obrigatório").trim(),
});

export const CreateActivitySchema = yup.object().shape({
  studentCpf: yup.string().required("*Campo obrigatório"),
  date: yup.date().required("*Campo obrigatório"),
  scheduledStart: yup.date().required("*Campo obrigatório"),
  scheduledEnd: yup.date().required("*Campo obrigatório"),
  taskIds: yup.array().of(yup.string().required("*Campo obrigatório")),
});
