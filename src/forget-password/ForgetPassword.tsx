import React from "react";
import { useNavigate } from "react-router-dom";
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

export default function ForgetPassword() {
  const navigate = useNavigate();
  const { email } = getValidationRules();

  interface ForgetPassData {
    email: string;
  }

  const methods = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgetPassData) => {
    try {
      const response = await axios.post(
        `https://upskilling-egypt.com:3005/api/auth/forgot-password`,
        data
      );
      navigate("/reset-password", { state: data?.email });
      console.log(response);

      toast.success(
        response?.data?.message || "Password Reset OTP Sent to Your Email"
      );
    } catch (error: any) {
      console.log(error);

      toast.error(error?.response?.data?.message || "Ckeck Your internet");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
          <FormInput
            label="Email address"
            name="email"
            rules={email}
            placeholder="Type Your Email"
            type="email"
          />
          <div className="flex items-center justify-between text-white">
            <ButtonForm isSubmitting={methods.formState.isSubmitting}>
              Send email
            </ButtonForm>
            <p>
              Login?
              <span className="text-(--color-title) underline">
                <Link to="login">click here</Link>
              </span>
            </p>
          </div>
        </ReusableForm>
      </FormProvider>
    </>
  );
}
