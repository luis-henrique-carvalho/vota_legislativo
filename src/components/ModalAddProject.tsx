"use client";
import React from "react";
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

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { SessionData } from "@/models/Session";
import { useToastMessage } from "@/hooks/useToast";
import { useProjectHooks } from "@/hooks/useProjectHook";
import { AiFillFileAdd } from "react-icons/ai";

type Props = {
  sessions: SessionData[];
  vereador_id: string;
  handleCreateProject: React.Dispatch<
    React.SetStateAction<{
      projetos: any[];
    }>
  >;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Nome obrigatório"),
  sessao_id: Yup.string().required("Nome da sessão obrigatória"),
  descricao: Yup.string().required("Descrição obrigatória"),
});

export default function ModalAddProject({
  sessions,
  vereador_id,

  handleCreateProject,
}: Props) {
  const { createProject } = useProjectHooks();
  const { setToastMessage } = useToastMessage();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const sessionMap = sessions.map((session) => ({
    value: session.id,
    label: session.name,
  }));

  const initialSessions = [
    {
      value: "",
      label: "Selecione",
    },
    ...sessionMap,
  ];

  const handleSubmit = async (values: any) => {
    try {
      const newProject = await createProject({ vereador_id, ...values });
      handleCreateProject((state) => ({
        ...state,
        projetos: [...state.projetos, newProject],
      }));
      setToastMessage("Projeto criado com sucesso", "success");
      onClose();
    } catch (error: any) {
      console.error("Error creating project", error);
      setToastMessage(error, "error");
    }
  };

  return (
    <>
      <Button onClick={onOpen} color="primary" endContent={<AiFillFileAdd />}>
        Adicionar Projeto
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Adicionar Projeto
          </ModalHeader>
          <ModalBody>
            <Formik
              initialValues={{
                name: "",
                sessao_id: "",
                descricao: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
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
                <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <Input
                    label="Nome"
                    placeholder="Insira o nome do projeto"
                    value={values.name}
                    size="lg"
                    onChange={handleChange("name")}
                    errorMessage={touched.name && errors.name}
                  />

                  <Select
                    label="Selecione uma sessão"
                    variant="bordered"
                    placeholder="Selecione uma sessão"
                    value={values.sessao_id}
                    size="lg"
                    onChange={handleChange("sessao_id")}
                  >
                    {initialSessions.map((session) => (
                      <SelectItem key={session.value!} value={session.value}>
                        {session.label}
                      </SelectItem>
                    ))}
                  </Select>

                  <Input
                    label="Descrição"
                    placeholder="Insira a descrição do projeto"
                    value={values.descricao}
                    size="lg"
                    onChange={handleChange("descricao")}
                    errorMessage={touched.descricao && errors.descricao}
                  />

                  <ModalFooter>
                    <Button color="danger" variant="flat" onClick={onClose}>
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
