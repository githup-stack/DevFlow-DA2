"use client";

import React from "react";

import { signUpWithCredentials } from "@/app/lib/actions/auth.action";
import { SignUpSchema } from "@/app/lib/validations";
import AuthForm from "@/components/forms/AuthForm";

const SignUp = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      onSubmit={signUpWithCredentials}
    />
  );
};

export default SignUp;
