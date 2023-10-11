"use client";
// Flow
import React from "react";
// Components
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { User as UserComponent } from "@nextui-org/user";
import ModalAddAlderman from "./ModalAddAlderman";
import TableAlderman from "./TableAldeman";
// Models
import { User } from "@/models/User";
import { useUserHook } from "@/hooks/useUserHook";

interface Props {
  user: User;
  aldermans: User[];
}

const CardUser = ({ aldermans, user }: Props) => {
  const [stateAldermans, setStateAldermans] = React.useState<User[]>(aldermans);

  const { getUsers } = useUserHook();

  const fetchUsers = async () => {
    try {
      const fetchedProfile = await getUsers();
      setStateAldermans(fetchedProfile);
    } catch (error: any) {
      console.error("Invalid Users error", error.message);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, [stateAldermans.length]);

  const handleAddAlderman = (newAlderman: User) => {
    setStateAldermans((prevState) => [...prevState, newAlderman]);
  };

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
        <h2 className="text-26 text-primary font-bold">Lista de Vereadores</h2>
        <ModalAddAlderman handleAddAalderman={handleAddAlderman} />
      </CardHeader>
      <Divider />
      <CardBody className="overflow-visible items-center py-2">
        <TableAlderman
          alderman={aldermans}
        />
      </CardBody>
      <Divider />
    </Card>
  );
};

export default CardUser;
