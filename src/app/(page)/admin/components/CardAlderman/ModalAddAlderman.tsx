"use client";
// Flow
import React from "react";
// Components
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  ModalFooter,
} from "@nextui-org/react";
import { AiFillFileAdd } from "react-icons/ai";
import { Formik, Form } from "formik";
// Hooks
import { useUserHook } from "@/hooks/useUserHook";
// Models
import { addAldermanSchema } from "@/models/Schema";
import {
  InitialRegisterAlderman,
  User,
  educationOptions,
  roleOptions,
  typeOptions,
} from "@/models/User";

type Props = {
  handleAddAalderman: React.Dispatch<React.SetStateAction<User[]>>
};

export default function ModalAddAlderman({ handleAddAalderman }: Props) {
  const { createUser } = useUserHook();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddUser = async (values: User) => {
    try {
      const newUser = await createUser(values);

      if (newUser) {
        handleAddAalderman((state) => ({
          ...state,
          newUser,
        }));
      }

      onClose();
    } catch (error: any) {
      console.error("failed in create user", error.message);
    }
  };

  return (
    <>
      <Button onClick={onOpen} color="primary" endContent={<AiFillFileAdd />}>
        Adicionar Vereador
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Adicionar Projeto
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={InitialRegisterAlderman}
              validationSchema={addAldermanSchema}
              onSubmit={async (values) => {
                console.log(values);
                await handleAddUser(values);
              }}
            >
              {({
                errors,
                touched,
                values,
                handleChange,
                handleSubmit,
                handleBlur,
              }) => (
                <Form
                  onSubmit={handleSubmit}
                  className="flex flex-row w-full justify-between flex-wrap gap-y-3"
                >
                  <Input
                    label="Nome"
                    placeholder="Insira o nome do usuário"
                    value={values.name}
                    size="sm"
                    onChange={handleChange("name")}
                    errorMessage={touched.name && errors.name}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Insira o email do usuário"
                    value={values.email}
                    size="sm"
                    onChange={handleChange("email")}
                    errorMessage={touched.email && errors.email}
                  />
                  <Select
                    label="Função"
                    variant="bordered"
                    placeholder="Selecione a função"
                    value={values.funcao}
                    size="sm"
                    onChange={handleChange("funcao")}
                  >
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value!} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Select
                    label="Tipo"
                    variant="bordered"
                    placeholder="Selecione o tipo"
                    value={values.tipo}
                    size="sm"
                    onChange={handleChange("tipo")}
                  >
                    {typeOptions.map((type) => (
                      <SelectItem key={type.value!} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    label="Partido"
                    placeholder="Insira o partido"
                    className="w-6/12"
                    value={values.partido}
                    size="sm"
                    onChange={handleChange("partido")}
                    errorMessage={touched.partido && errors.partido}
                  />
                  <Input
                    label="Data de Nascimento"
                    type="date"
                    className="w-5/12"
                    placeholder="Insira a Data de Nascimento"
                    value={values.data_nascimento}
                    size="sm"
                    onChange={handleChange("data_nascimento")}
                    errorMessage={
                      touched.data_nascimento && errors.data_nascimento
                    }
                  />
                  <Input
                    label="RG"
                    className="w-6/12"
                    placeholder="Insira o RG"
                    value={values.rg}
                    size="sm"
                    onChange={handleChange("rg")}
                    errorMessage={touched.rg && errors.rg}
                  />

                  <Input
                    label="Data expedição rg"
                    type="date"
                    className="w-5/12"
                    placeholder="Insira a data de expedição"
                    value={values.data_expedicao_rg}
                    size="sm"
                    onChange={handleChange("data_expedicao_rg")}
                    errorMessage={
                      touched.data_expedicao_rg && errors.data_expedicao_rg
                    }
                  />

                  <Input
                    label="CPF"
                    placeholder="Insira o CPF"
                    className="w-6/12"
                    value={values.cpf}
                    size="sm"
                    onChange={handleChange("cpf")}
                    errorMessage={touched.cpf && errors.cpf}
                  />
                  <Input
                    label="Titulo de eleitor"
                    className="w-5/12"
                    placeholder="Insira o Titulo"
                    value={values.titulo_eleitor}
                    size="sm"
                    onChange={handleChange("titulo_eleitor")}
                    errorMessage={
                      touched.titulo_eleitor && errors.titulo_eleitor
                    }
                  />
                  <Input
                    label="Zona Eleitoral"
                    className="w-6/12"
                    placeholder="Insira a Zona Eleitoral"
                    value={values.zona_titulo}
                    size="sm"
                    onChange={handleChange("zona_titulo")}
                    errorMessage={touched.zona_titulo && errors.zona_titulo}
                  />
                  <Input
                    label="Telefone"
                    className="w-5/12"
                    placeholder="Insira o Telefone"
                    value={values.telefone}
                    size="sm"
                    onChange={handleChange("telefone")}
                    errorMessage={touched.telefone && errors.telefone}
                  />

                  <Select
                    label="Escolaridade"
                    variant="bordered"
                    placeholder="Selecione a escolaridade"
                    value={values.escolaridade}
                    size="sm"
                    onChange={handleChange("escolaridade")}
                  >
                    {educationOptions.map((role) => (
                      <SelectItem key={role.value!} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    label="Senha"
                    placeholder="Insira a senha"
                    value={values.password}
                    size="sm"
                    onChange={handleChange("password")}
                    errorMessage={touched.password && errors.password}
                  />

                  <ModalFooter className="w-full">
                    <Button color="danger" variant="ghost" onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit">
                      Cadastrar
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
