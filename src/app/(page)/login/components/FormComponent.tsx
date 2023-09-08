"use client";
import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";

import useSignIn from "@/services/authServices";

const FormComponent = () => {
  const InitialLoginForm = {
    email: "",
    password: "",
  };

  const { signIn } = useSignIn();

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Email obrigatório"),
    password: Yup.string().required("Senha obrigatória"),
  });

  return (
    <Formik
      initialValues={InitialLoginForm}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        signIn(values);
      }}
    >
      {({ errors, touched, values, handleChange, handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="bg-divider flex flex-col min-h-[450px] justify-center w-[450px] rounded-xl px-14 py-10 gap-5"
        >
          <Input
            isClearable
            label="Email"
            placeholder="Insira seu Email"
            value={values.email}
            size="lg"
            onValueChange={handleChange("email")}
            errorMessage={touched.email && errors.email && errors.email}
            name="email"
            type="email"
          />

          <Input
            isClearable
            label="Password"
            placeholder="Insira seu password"
            size="lg"
            value={values.password}
            onValueChange={handleChange("password")}
            errorMessage={
              touched.password && errors.password && errors.password
            }
            name="password"
            type="password"
          />

          <Button color="primary" type="submit">
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
