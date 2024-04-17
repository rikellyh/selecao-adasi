import * as yup from "yup";

export const CreateCourseSchema = yup.object().shape({
  name: yup.string().required("*Digite o nome do curso"),
});
