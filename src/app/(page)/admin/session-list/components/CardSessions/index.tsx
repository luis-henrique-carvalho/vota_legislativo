"use client";
// Flow
import React from "react";
// Components
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { User as UserComponent } from "@nextui-org/user";
import ModalAddSession from "./ModalAddSession";
import TableAlderman from "./TableSessions";
// Models
import { User } from "@/models/User";
import { SessionData } from "@/models/Session";
// Hooks
import { useSessionHooks } from "@/hooks/useSessionHooks";

interface Props {
  user: User;
  sessions: SessionData[];
}

const CardSessions = ({ sessions, user }: Props) => {
  const [stateSessions, setStateSessions] = React.useState<SessionData[]>(sessions);

  const { getSessions } = useSessionHooks();

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedSessions = await getSessions();
        setStateSessions(fetchedSessions);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [stateSessions.length]);

  return (
    <Card className="py-4 w-full lg:min-h-[550px]" shadow="sm" isHoverable>
      <CardHeader className="pY-2 px-2 md:px-4 flex-row justify-between items-center">
        <UserComponent
          name={user?.name}
          description={user?.tipo}
          avatarProps={{
            src: "@/assets/vereador.png",
          }}
        />
        <ModalAddSession handleAddSessions={setStateSessions} />
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible items-center py-2">
        <TableAlderman sessions={stateSessions} />
      </CardBody>
      <Divider />
    </Card>
  );
};

export default CardSessions;
