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
import GroupList from "./Modules/Instructor/Components/Group/GroupList/GroupList";
import { AuthContextProvider } from "./Context/AuthContext";
import  ChangePassword from "./Modules/Authentication/ChangePassword/ChangePassword";
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
        {
          path:"group-list",
          element: <GroupList/>,
        },
        {
          path:"change-password",
          element: <ChangePassword/>,
        },
      ],
    },
  ]);

  return (
    <>
    <AuthContextProvider>
         <RouterProvider router={Routes}></RouterProvider>
      </AuthContextProvider>
      <Toaster />
    </>
  );
}

export default App;
