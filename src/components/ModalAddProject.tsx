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

import { Formik, Form } from "formik";
import { SessionData } from "@/models/Session";
import { useProjectHooks } from "@/hooks/useProjectHook";
import { AiFillFileAdd } from "react-icons/ai";
import { addProjectSchema } from "@/models/Schema";

type Props = {
  sessions: SessionData[];
  vereador_id: string;
  handleCreateProject: React.Dispatch<
    React.SetStateAction<{
      projetos: any[];
    }>
  >;
};

export default function ModalAddProject({
  sessions,
  vereador_id,
  handleCreateProject,
}: Props) {
  const { createProject } = useProjectHooks();

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
    const newProject = await createProject({ vereador_id, ...values });
    handleCreateProject((state) => ({
      ...state,
      projetos: [...state.projetos, newProject],
    }));

    onClose();
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
              validationSchema={addProjectSchema}
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
