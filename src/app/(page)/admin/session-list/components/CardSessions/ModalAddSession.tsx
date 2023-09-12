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
import { sessionSchema } from "@/models/Schema";
import {
  InitialRegisterAlderman,
  User,
  educationOptions,
  roleOptions,
  typeOptions,
} from "@/models/User";
import { SessionData, InitialSessionRegister } from "@/models/Session";
import { useSessionHooks } from "@/hooks/useSessionHooks";

type Props = {
  handleAddSessions: React.Dispatch<React.SetStateAction<SessionData[]>>;
};

export default function ModalAddAlderman({ handleAddSessions }: Props) {
  const { createSession } = useSessionHooks();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAdd = async (values: SessionData) => {
    try {
      const { quorum } = values;
      const quorumString = quorum.toString();
      const newSession = await createSession({
        ...values,
        quorum: quorumString,
      });

      if (newSession) {
        handleAddSessions((state) => ({
          ...state,
          newSession,
        }));
      }

      onClose();
    } catch (error: any) {
      console.error("failed in create user", error.message);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        className="max-w-[180px] md:max-w-none text-sm"
        color="primary"
        endContent={<AiFillFileAdd />}
      >
        Adicionar Sessão
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col">Adicionar Sessão</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={InitialSessionRegister}
              validationSchema={sessionSchema}
              onSubmit={async (values) => {
                console.log(values);
                await handleAdd(values);
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
                    placeholder="Insira o nome da sessão"
                    value={values.name}
                    size="sm"
                    onChange={handleChange("name")}
                    errorMessage={touched.name && errors.name}
                  />

                  <Input
                    label="Inicio"
                    placeholder="Insira o inicio da sessão"
                    value={values.inicio}
                    type="datetime-local"
                    size="sm"
                    onChange={handleChange("inicio")}
                    errorMessage={touched.inicio && errors.inicio}
                  />

                  <Input
                    label="Quorum"
                    placeholder="Insira o quorum da sessão"
                    value={values.quorum}
                    size="sm"
                    type="number"
                    onChange={handleChange("quorum")}
                    errorMessage={touched.quorum && errors.quorum}
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
