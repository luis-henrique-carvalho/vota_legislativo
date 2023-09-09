"use client";
// Flow
import React from "react";
import * as Yup from "yup";
// Component
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
import { Formik, Form } from "formik";
import { AiFillEdit } from "react-icons/ai";
// Hooks
import { useUserHook } from "@/hooks/useUserHook";
// Context
import { useUserContext } from "@/contexts/UserContext";
// Models
import { User, roleOptions } from "@/models/User";
import { EditUserSchema } from "@/models/Schema";

type Props = {
  handleEditUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export default function ModalEditUser({ handleEditUser }: Props) {
  const { editUser } = useUserHook();
  const { user } = useUserContext();
  console.log(user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (values: any) => {
    const { id, created_at, avatar_url, updated_at, tipo, ...userWithoutId } =
      values;
    console.log(userWithoutId);
    const resp = await editUser(userWithoutId);
    handleEditUser(resp);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} color="primary" endContent={<AiFillEdit />}>
        Editar usuário
      </Button>
      <Modal
        scrollBehavior={"outside"}
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Editar Usuário
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                old_password: "",
                password_confirmation: "",
                ...user,
              }}
              validationSchema={EditUserSchema}
              onSubmit={async (values) => {
                console.log(values);
                await handleSubmit(values);
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
                  className="flex flex-row w-full justify-between flex-wrap  gap-y-4"
                >
                  <Input
                    label="Nome"
                    placeholder="Insira o nome do projeto"
                    value={values.name}
                    size="lg"
                    className="w-5/12"
                    onChange={handleChange("name")}
                    errorMessage={touched.name && errors.name}
                  />
                  <Input
                    label="Email"
                    type="email"
                    className="w-6/12"
                    placeholder="Insira o email do projeto"
                    value={values.email}
                    size="lg"
                    onChange={handleChange("email")}
                    errorMessage={touched.email && errors.email}
                  />
                  <Select
                    label="Função"
                    variant="bordered"
                    placeholder="Selecione uma função"
                    value={values.funcao}
                    size="lg"
                    onChange={handleChange("funcao")}
                  >
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value!} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    label="Partido"
                    placeholder="Insira o partido"
                    className="w-6/12"
                    value={values.partido}
                    size="lg"
                    onChange={handleChange("partido")}
                    errorMessage={touched.partido && errors.partido}
                  />

                  <Input
                    label="Data de Nascimento"
                    type="date"
                    className="w-5/12"
                    placeholder="Insira a Data de Nascimento"
                    value={values.data_nascimento}
                    size="lg"
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
                    size="lg"
                    onChange={handleChange("rg")}
                    errorMessage={touched.rg && errors.rg}
                  />

                  <Input
                    label="Data de Expedição"
                    type="date"
                    className="w-5/12"
                    placeholder="Insira a Data de Expedição"
                    value={values.data_expedicao_rg}
                    size="lg"
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
                    size="lg"
                    onChange={handleChange("cpf")}
                    errorMessage={touched.cpf && errors.cpf}
                  />
                  <Input
                    label="Titulo de eleitor"
                    className="w-5/12"
                    placeholder="Insira o Titulo"
                    value={values.titulo_eleitor}
                    size="lg"
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
                    size="lg"
                    onChange={handleChange("zona_titulo")}
                    errorMessage={touched.zona_titulo && errors.zona_titulo}
                  />

                  <Input
                    label="Telefone"
                    className="w-5/12"
                    placeholder="Insira o Telefone"
                    value={values.telefone}
                    size="lg"
                    onChange={handleChange("telefone")}
                    errorMessage={touched.telefone && errors.telefone}
                  />

                  <Input
                    label="Senha antiga"
                    className="w-6/12"
                    placeholder="Insira a sua Senha antiga"
                    value={values.old_password}
                    size="lg"
                    onChange={handleChange("old_password")}
                    errorMessage={touched.old_password && errors.old_password}
                  />

                  <Input
                    label="Nova senha"
                    className="w-5/12"
                    placeholder="Insira a sua Nova senha"
                    value={values.password}
                    size="lg"
                    onChange={handleChange("password")}
                    errorMessage={touched.password && errors.password}
                  />

                  <Input
                    label="Confimer senha"
                    placeholder="Insira a sua Confimer senha"
                    value={values.password_confirmation}
                    size="lg"
                    onChange={handleChange("password_confirmation")}
                    errorMessage={
                      touched.password_confirmation &&
                      errors.password_confirmation
                    }
                  />

                  <ModalFooter className="w-full">
                    <Button color="danger" variant="flat" onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button color="primary" type="submit">
                      Editar
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
