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
