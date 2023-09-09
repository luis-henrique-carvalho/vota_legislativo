"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User as UserComponent } from "@nextui-org/user";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import ModalAddProject from "@/components/ModalAddProject";
import TableComponent from "@/components/TableComponent";
import { useUserContext } from "@/contexts/UserContext";
import { useSessionHooks } from "@/hooks/useSessionHooks";
import { useProfilesHook } from "@/hooks/useProfilesHook";
import { SessionData } from "@/models/Session";
import AldermanImage from "@/assets/vereador.png";

const Page = () => {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [profile, setProfile] = useState<{ projetos: any[] }>({ projetos: [] });
  const { getProfile, loading: profileLoading } = useProfilesHook();
  const { user } = useUserContext();
  const { getSessions } = useSessionHooks();

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await getProfile();
      if (fetchedProfile) {
        setProfile(fetchedProfile);
      }
    };
  
    fetchProfile();
  }, [profile]);
  
  useEffect(() => {
    const fetchSessions = async () => {
      const fetchedSessions = await getSessions();
      if (fetchedSessions) {
        setSessions(fetchedSessions);
      }
    };
  
    fetchSessions();
  }, []);
  

  return (
    <div className="flex flex-col  lg:flex-row items-center gap-10 px-6 w-full">
      <Card className="py-4 w-full lg:min-h-[550px]" shadow="sm" isHoverable>
        <CardHeader className="pY-2 px-4 flex-row justify-between items-center">
          <UserComponent
            name={user?.name}
            description={user?.funcao}
            avatarProps={{
              src: "@/assets/vereador.png",
            }}
          />
        </CardHeader>
        <Divider />
        <CardBody className="overflow-visible items-center py-2">
          <Image src={AldermanImage} priority alt="vereador" />
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-col">
          <Link href={`/alderman/edit/${user?.id}`} className="text-primary">
            Editar
          </Link>
        </CardFooter>
      </Card>

      <Card className="py-4 w-full lg:min-h-[550px]" shadow="sm" isHoverable>
        <CardHeader className="pY-2  px-4 flex-row justify-between items-center">
          <h2 className="text-large font-bold">Projetos</h2>
          <ModalAddProject vereador_id={user?.id!} sessions={sessions} />
        </CardHeader>
        <Divider />
        <CardBody className="overflow-visible items-center py-2">
          <TableComponent projects={profile.projetos} />
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-col">
          <Link href={`/alderman/edit/${user?.id}`} className="text-primary">
            email
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
