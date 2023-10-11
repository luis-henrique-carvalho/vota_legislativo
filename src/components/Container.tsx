import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex h-[680px] p-5 mt-11 flex-col items-center w-full">
      {children}
    </div>
  );
};



export default Container;
