import "./App.css";
import ForgetPassword from "./forget-password/ForgetPassword";
import { Toaster } from "react-hot-toast";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Login from "./login/Login";
import Register from "./pages/authPages/register/Register";
import NotFound from "./not-found/NotFound";
import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout";
import Dashboard from "./dashboard/Dashboard";
import ResetPassword from "./pages/authPages/reset-password/ResetPassword";
import AuthLayout from "./layouts/authLayOut/AuthLayout";
function App() {
  const Routes = createHashRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> }, // "/"
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
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
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={Routes} />
      <Toaster />
    </>
  );
}

export default App;
