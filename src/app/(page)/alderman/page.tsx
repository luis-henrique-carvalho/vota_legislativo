import React from "react";
import { cookies } from "next/headers";
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Project } from "@/models/Projects";
import AldermanImage from "@/assets/vereador.png";
import { User } from "@/models/User";
import { User as UserComponent } from "@nextui-org/user";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import { getProfile } from "@/config/profile";
import TableComponent from "@/components/TableComponent";

const page = async () => {
  const cookieStore = cookies().get("user")?.value;
  const user: User = JSON.parse(cookieStore!);
  const profile = await getProfile();
  const projects: Project[] = profile.projetos;

  return (
    <div className="flex flex-col  lg:flex-row items-center gap-10 px-6 w-full">
      <Card className="py-4 w-full  " shadow="sm" isHoverable>
        <CardHeader className="pY-2  px-4 flex-row justify-between items-center">
          <UserComponent
            name={user.name}
            description={user.funcao}
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
          <Link href={`/alderman/edit/${user.id}`} className="text-primary">
            Editar
          </Link>
        </CardFooter>
      </Card>

      <Card className="py-4 w-full " shadow="sm" isHoverable>
        <CardHeader className="pY-2  px-4 flex-row justify-between items-center">
          <h2 className="text-large font-bold">Projetos</h2>
        </CardHeader>
        <Divider />
        <CardBody className="overflow-visible items-center py-2">
          <TableComponent projects={projects} />
        </CardBody>
        <Divider />
        <CardFooter className="flex flex-col">
          <Link href={`/alderman/edit/${user.id}`} className="text-primary">
            email
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
