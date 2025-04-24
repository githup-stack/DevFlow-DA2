"use client";

import React from "react";

import { signInWithCredentials } from "@/app/lib/actions/auth.action";
import { SignInSchema } from "@/app/lib/validations";
import AuthForm from "@/components/forms/AuthForm";

const SignIn = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default SignIn;
