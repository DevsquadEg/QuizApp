import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ReusableForm from "../components/reusableForm/ReusableForm";
import { FormInput } from "../formInput/FormInput";
import ButtonForm from "../buttonForm/ButtonForm";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { getValidationRules } from "../services/validation/validation";

export default function Login() {
  const navigate = useNavigate();
  const { email, password } = getValidationRules();

  interface LoginData {
    email: string;
    password: string;
  }

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginData) => {
    console.log(data);
    // return;
    try {
      const response = await axios.post(
        `https://upskilling-egypt.com:3005/api/auth/login`,
        data
      );
      navigate("/dashboard", { state: data?.email });
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
        <FormInput
          label="Your Email Address"
          name="email"
          rules={email}
          placeholder="Type Your Email"
          type="email"
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
            Sign In
          </ButtonForm>
          <a
            onClick={() => navigate("/forget-password")}
            className="text-sm font-medium text-[#F5F5F5] hover:underline hover:cursor-pointer"
          >
            Forget Password ?
          </a>
        </div>
      </ReusableForm>
    </FormProvider>
  );
}
