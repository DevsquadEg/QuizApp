import "./App.css";
import ForgetPassword from "./forget-password/ForgetPassword";
import { Toaster } from "react-hot-toast";
import ResetPassword from "./reset-password/ResetPassword";
import { createHashRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./authLayOut/AuthLayout";
import Login from "./login/Login";
import Register from "./register/Register";
import NotFound from "./not-found/NotFound";
import DashboardLayout from "./dashboardLayout/DashboardLayout";
import Dashboard from "./dashboard/Dashboard";
function App() {
  const Routes = createHashRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
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
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Dashboard />,
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
