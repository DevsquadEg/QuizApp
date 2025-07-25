import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../src/assets/Logo-white.png";
import authImage from "../../src/assets/AuthLogo.png";
import { FormInput } from "../formInput/FormInput";
import axios from "axios";
import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import ReusableForm from "../reusableForm/ReusableForm";
import { getValidationRules } from "../validation/validation";
import ButtonForm from "../../src/buttonForm/ButtonForm";

function ResetPassword() {
  interface ResetData {
    email: string;
    password: string;
    otp: string;
  }

  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = getValidationRules();

  const methods = useForm({
    defaultValues: {
      email: location?.state || "",
      password: "",
      otp: "",
    },
  });
  const onSubmit = async (data: ResetData) => {
    console.log(data);
    try {
      const response = await axios.post(
        `https://upskilling-egypt.com:3005/api/auth/reset-password`,
        data
      );
      navigate("/", { state: data.email });
      toast.success(response?.data?.message || "password changed successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Ckeck Your internet");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
          {/* email */}
          <FormInput
            disabled
            label="Email address"
            name="email"
            rules={email}
            placeholder="Type Your Email"
            type="email"
          />

          {/* OTP */}
          <FormInput
            name="otp"
            rules={{ required: "OTP is required" }}
            placeholder="Enter Your Otp"
            type="text"
            label="OTP"
          />

          {/* PASSWORD */}
          <FormInput
            name="password"
            rules={password}
            placeholder={"Type Your Password"}
            type="password"
            label="Password"
          />

          <ButtonForm isSubmitting={methods.formState.isSubmitting}>
            Reset
          </ButtonForm>
        </ReusableForm>
      </FormProvider>
    </>
  );
}

export default ResetPassword;
