import * as yup from "yup";

export const registerUserSchema = yup.object({
  name: yup.string().required("Nome é obrigatório").min(3, "Nome muito curto"),
  email: yup.string().required("E-mail é obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha é obrigatória").min(6, "Mínimo 6 caracteres"),
  roleId: yup.number().required("Role obrigatório"),
});
