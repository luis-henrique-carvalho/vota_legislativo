"use client";
// Flow
import React, { useEffect, useState, useMemo } from "react";
// Component
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import ModalAddProject from "@/components/ModalAddProject";
import { User as UserComponent } from "@nextui-org/user";
import TableAldeman from "./components/TableAldeman";

// Models
import { SessionData } from "@/models/Session";
//Context
import { useUserContext } from "@/contexts/UserContext";
// Hooks
import { useUserHook } from "@/hooks/useUserHook";
// Assets
import { User } from "@/models/User";
import ModalAddAlderman from "./components/ModalAddAlderman";

const Page = () => {
  const { getUsers } = useUserHook();
  const { user } = useUserContext();

  const [aldemans, setAldermans] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedProfile = await getUsers();
        setAldermans(fetchedProfile);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [aldemans.length]);


  console.log(aldemans);

  return (
    <div className="flex flex-col  lg:flex-row items-center gap-10 px-6 w-full">
      <Card className="py-4 w-full lg:min-h-[550px]" shadow="sm" isHoverable>
        <CardHeader className="pY-2 px-4 flex-row justify-between items-center">
          <UserComponent
            name={user?.name}
            description={user?.tipo}
            avatarProps={{
              src: "@/assets/vereador.png",
            }}
          />

          <ModalAddAlderman
            handleAddAalderman={setAldermans}

          />
        </CardHeader>
        <Divider />
        <CardBody className="overflow-visible items-center py-2">
          <TableAldeman alderman={aldemans} />
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
};

export default Page;
