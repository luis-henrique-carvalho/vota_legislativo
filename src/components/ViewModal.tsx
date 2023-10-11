"use client";
import React from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { CgDetailsMore } from "react-icons/cg";

type RouteName = "alderman" | "questions" | "categories";

interface Props {
  titleModal: string;
  buttonName: string;
  roteName: RouteName;
  values: any;
}

export default function ViewModal({
  buttonName,
  roteName,
  titleModal,
  values,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const renderModalContent = () => {
    switch (roteName) {
      case "alderman":
        return (
          <div className="flex flex-col gap-5">
            <h2>
              <span className="font-bold">Nome: </span>
              {values.name}
            </h2>
            <h3>
              <span className="font-bold">Email: </span>
              {values.email}
            </h3>
            <p>
              <span className="font-bold">Permissões: </span>
              {values.partido}
            </p>
          </div>
        );
      case "questions":
        return (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-bold">Pergunta:</h2>
              <p>{values.ask}</p>
            </div>

            <div className="flex flex-col">
              <h2 className="font-bold">Opções:</h2>
              <ul className="flex flex-col gap-1">
                {values.options.map((option: any, index: any) => (
                  <li key={index}>
                    {index + 1}: {option.label}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-bold">Dica:</h2>
              <p>{values.hint}</p>
            </div>

            <div>
              <h2 className="font-bold">Categoria:</h2>
              <p>{values.question_category}</p>
            </div>
          </div>
        );

      case "categories":
        return (
          <div className="flex flex-col gap-5">
            <h2>
              <span className="font-bold">Nome: </span>
              {values.name}
            </h2>
          </div>
        );
      default:
        return <div>Conteúdo Padrão</div>;
    }
  };

  return (
    <>
      <Button
        isIconOnly
        color="primary"
        variant="faded"
        aria-label={buttonName}
        onPress={onOpen}
      >
        <CgDetailsMore />
      </Button>
      <Modal
        isOpen={isOpen}
        backdrop="opaque"
        placement="center"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {titleModal}
              </ModalHeader>
              <ModalBody>{renderModalContent()}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
