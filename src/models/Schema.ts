import * as Yup from "yup";

export const EditUserSchema = Yup.object({
  name: Yup.string().required("Nome obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  funcao: Yup.string().required("Função obrigatória"),
  data_nascimento: Yup.string().required("Data de Nascimento obrigatória"),
  partido: Yup.string().required("Partido Político obrigatório"),
  rg: Yup.string().required("RG obrigatório"),
  cpf: Yup.string().required("CPF obrigatório"),
  titulo_eleitor: Yup.string().required("Título Eleitor obrigatório"),
  zona_titulo: Yup.string().required("Zona Eleitoral obrigatória"),
  telefone: Yup.string().required("Telefone obrigatório"),

  password: Yup.string().required("Senha obrigatória"),
  password_confirmation: Yup.string()
    .test(
      "passwords-match",
      "Confirmação deve ser igual à nova senha",
      function (value) {
        return this.parent.password === value;
      }
    )
    .required("Confirmação obrigatória"),

  old_password: Yup.string().required("Senha antiga obrigatória"),
  escolaridade: Yup.string().required("Escolaridade obrigatória"),
});

export const addProjectSchema = Yup.object({
  name: Yup.string().required("Nome obrigatório"),
  sessao_id: Yup.string().required("Nome da sessão obrigatória"),
  descricao: Yup.string().required("Descrição obrigatória"),
});
