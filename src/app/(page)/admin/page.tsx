// Flow
import React from "react";
// Component
import CardAlderman from './components/CardAlderman'
// Models
import { User } from "@/models/User";
// Hooks
import { useServerHook } from "@/hooks/useServerHook";

const Page =async  () => {
 
  const {fetchData, user} = useServerHook()

  const aldermanList:User[] = await fetchData()

  return (
    <div className="flex flex-col  lg:flex-row items-center gap-10 px-6 w-full">
      <CardAlderman aldermans={aldermanList} user={user}/>
    </div>
  );
};

export default Page;
