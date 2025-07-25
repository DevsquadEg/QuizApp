import "./App.css";
import ForgetPassword from "./forget-password/ForgetPassword";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./reset-password/ResetPassword";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./authLayOut/AuthLayout";
import Login from "./login/Login";
import Register from "./register/Register";
function App() {
  const Routes = createHashRouter([
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={Routes}></RouterProvider>
      <Toaster />
    </>
  );
}

export default App;
