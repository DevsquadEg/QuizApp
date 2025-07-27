import { Link, Outlet, useLocation } from "react-router-dom";

import authImage from "/public/imgs/Logoauth.svg";
import { User, UserPlus } from "lucide-react";
export default function AuthLayout() {
  const location = useLocation();
  const isLogin = location.pathname === "/login" || location.pathname === "/";
  const isRegister = location.pathname === "/register";
  const allowedPaths = ["/", "/login", "/register"];

  
  const Login = isLogin
    ? "border-[4px] border-[--color-title] text-[--color-title]"
    : "text-white";
  
const Register = isRegister
  ? "border-[4px] border-[--color-title] text-[--color-title]"
    : "text-white";
  
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/login":
        return "Continue your learning journey with QuizWiz!";
      case "/register":
        return "Continue your learning journey with QuizWiz!";
      case "/forget-password":
        return "Forgot Password";
      case "/reset-password":
        return "Reset Password";
      case "/change-password":
        return "Change Password";
      default:
        return "Continue your learning journey with QuizWiz!";
    }
  };

  return (
    <>
      <div
        className="grid min-h-screen grid-cols-1  lg:grid-cols-2"
        style={{ backgroundColor: "#0D1321" }}
      >
        {/* Left side: Form */}
        <div className="w-full p-6 sm:p-12 text-white flex flex-col justify-center lg:w-auto">
          <img
            src={authImage}
            alt="Logo"
            className="w-60 fixed top-6 left-6 z-50"
          />
          <h1 className="mb-8 text-2xl font-bold tracking-wider">
            {getPageTitle()}
          </h1>

          {allowedPaths.map(
            (item) =>
              item === location.pathname && (
                <div className="my-10 flex gap-8" key={item}>
                  <Link to="/login">
                    <div
                      className={`flex h-[120px] w-[150px] flex-col items-center justify-center rounded-lg bg-[#333333] shadow ${Login}`}
                    >
                      <User size={60} />
                      <span className="font-bold capitalize">sign in</span>
                    </div>
                  </Link>
                  <Link to="/register">
                    <div
                      className={`flex h-[120px] w-[150px] flex-col items-center justify-center rounded-lg bg-[#333333] shadow ${Register}`}
                    >
                      <UserPlus size={60} />
                      <span className="font-bold capitalize">Sign Up</span>
                    </div>
                  </Link>
                </div>
              )
          )}
          <Outlet />
        </div>

        {/* Right side: Image */}
        <div className="hidden p-6 px-11 items-center justify-center sm:flex">
          <img
            src="/imgs/rightAuth.svg"
            alt="Quiz app Illustration"
            className="h-full w-full object-contain"
          />
        </div>
      </div>
    </>
  );
}
