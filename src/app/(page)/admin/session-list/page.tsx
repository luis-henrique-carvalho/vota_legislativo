import { useServerHook } from "@/hooks/useServerHook";
import { SessionData } from "@/models/Session";
import React from "react";
import CardSessions from "./components/CardSessions";

const page = async () => {
  const { getSessions, user } = useServerHook();

  const sessionList: SessionData[] = await getSessions();
  return (
    <div>
      <CardSessions sessions={sessionList} user={user} />
    </div>
  );
};

export default page;
