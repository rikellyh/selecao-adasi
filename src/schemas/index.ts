import * as yup from "yup";

export const CreateCourseSchema = yup.object().shape({
  name: yup.string().required("*Digite o nome do curso").trim(),
});

export const CreateStudentSchema = yup.object().shape({
  cpf: yup
    .string()
    .max(11, "No máximo 11 caracteres")
    .required("*Campo obrigatório"),
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
  scheduledEnd: yup
    .date()
    .required("*Campo obrigatório")
    .test(
      "scheduledEnd",
      "*A diferença entre início e término não pode exceder 6 horas",
      function (value) {
        const scheduledStart = this.parent.scheduledStart;
        const sixHoursLater = new Date(
          scheduledStart.getTime() + 6 * 60 * 60 * 1000
        );
        return value && scheduledStart && value <= sixHoursLater;
      }
    )
    .test(
      "scheduledEnd",
      "*Data de término deve ser posterior à data de início",
      function (value) {
        const scheduledStart = this.parent.scheduledStart;
        return value && scheduledStart && value > scheduledStart;
      }
    ),
  taskIds: yup.array().of(yup.string().required("*Campo obrigatório")),
});
