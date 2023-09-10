"use client";
// Flow
import React, { useEffect, useState } from "react";
// Component
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import ModalAddProject from "@/components/ModalAddProject";
import { User as UserComponent } from "@nextui-org/user";
import TableComponent from "@/components/TableComponent";
// Models
import { SessionData } from "@/models/Session";
//Context
import { useUserContext } from "@/contexts/UserContext";
// Hooks
import { useProjectHooks } from "@/hooks/useProjectHook";
import { useSessionHooks } from "@/hooks/useSessionHooks";
import { useProfilesHook } from "@/hooks/useProfilesHook";
// Assets
import AldermanImage from "@/assets/vereador.png";

const Page = () => {
  const { user, setUser } = useUserContext();

  const { getProfile } = useProfilesHook();
  const { getSessions } = useSessionHooks();

  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [profile, setProfile] = useState<{ projetos: any[] }>({ projetos: [] });

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await getProfile();
      setProfile(fetchedProfile);
    };
    if (!profile.projetos.length) {
      fetchProfile();
    }
  }, [profile.projetos]);

  // Segundo useEffect para buscar as sessões
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
            description={user?.tipo}
            avatarProps={{
              src: "@/assets/vereador.png",
            }}
          />
        </CardHeader>
        <Divider />
        <CardBody className="overflow-visible items-center py-2">
          
        </CardBody>
        <Divider />
      </Card>
    </div>
  );
};

export default Page;
