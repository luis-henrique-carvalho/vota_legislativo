// Flow
import React from "react";
// Component
import CardAlderman from "./components/CardAlderman";
import Container from "@/components/Container";
// Models
import { User } from "@/models/User";
// Hooks
import { useServerHook } from "@/hooks/useServerHook";

const Page = async () => {
  const { fetchUserData, user } = useServerHook();

  const aldermanList: User[] = await fetchUserData();
  console.log(aldermanList)

  return (
    <Container>
      <CardAlderman aldermans={aldermanList} user={user} />
    </Container>
  );
};

export default Page;
