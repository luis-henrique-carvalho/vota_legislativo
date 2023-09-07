import React from "react";
import FormComponent from "./components/FormComponent";


const page = () => {


  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-3xl font-bold">Bem vindo de volta</h1>
        <h2 className="text-lg">Faça Login na sua conta</h2>
      </div>

      <FormComponent  />
    </div>
  );
};

export default page;
