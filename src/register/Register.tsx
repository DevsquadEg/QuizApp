import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReusableForm from "../reusableForm/ReusableForm";
import { FormInput } from "../formInput/FormInput";
import { getValidationRules } from "../validation/validation";
import ButtonForm from "../buttonForm/ButtonForm";
import toast from "react-hot-toast";
import axios, { isAxiosError } from "axios";

// type Props = {};

export default function Register() {
  const navigate = useNavigate();
  const { email, password, firstName, lastName } = getValidationRules();

  interface RegisterData {
    email: string;
    role: string;
    first_name: string;
    last_name: string;
    password: string;
  }

  const methods = useForm({
    defaultValues: {
      email: "",
      role: "Student",
      first_name: "",
      last_name: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterData) => {
    console.log(data);
    // return;
    try {
      const response = await axios.post(
        `https://upskilling-egypt.com:3005/api/auth/register`,
        data
      );
      navigate("/login", { state: data?.email });
      console.log(response);

      toast.success(
        response?.data?.message || "Password Reset OTP Sent to Your Email"
      );
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Ckeck Your internet");
      }
    }
  };
  return (
    <FormProvider {...methods}>
      <ReusableForm onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex gap-1">
          <div className="w-1/2">
            <FormInput
              label="First Name"
              name="first_name"
              rules={firstName}
              placeholder="Enter Your First Name"
              type="text"
            />
          </div>
          <div className="w-1/2">
            <FormInput
              label="Last Name"
              name="last_name"
              rules={lastName}
              placeholder="Enter Your Last Name"
              type="text"
            />
          </div>
        </div>
        <FormInput
          label="Your Email Address"
          name="email"
          rules={email}
          placeholder="Type Your Email"
          type="email"
        />
        <FormInput
          label="Your Role"
          name="role"
          placeholder="Select Your Role"
          type="text"
        />
        <FormInput
          label="Password"
          name="password"
          rules={password}
          placeholder="Type Your Password"
          type="password"
        />
        <div className="flex items-center justify-between text-white">
          <ButtonForm isSubmitting={methods.formState.isSubmitting}>
            Sign Up
          </ButtonForm>
        </div>
      </ReusableForm>
    </FormProvider>
  );
}
