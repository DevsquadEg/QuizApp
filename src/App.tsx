import "./App.css";
import ForgetPassword from "./forget-password/ForgetPassword";
import { Toaster } from "react-hot-toast";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Login from "./login/Login";
import Register from "./pages/authPages/register/Register";
import NotFound from "./not-found/NotFound";
import DashboardLayout from "./layouts/dashboardLayout/DashboardLayout";
import Dashboard from "./dashboard/Dashboard";
import { AuthContextProvider } from "./Context/AuthContext";
import AuthLayout from "./layouts/authLayOut/AuthLayout";
import GroupList from "./Modules/Instructor/Components/Group/GroupList/GroupList";
import ChangePassword from "./Modules/Authentication/ChangePassword/ChangePassword";
import ResetPassword from "./pages/authPages/reset-password/ResetPassword";
import Quiz from "./pages/Quizzes/Quiz";
import Results from "./pages/Results/Results";
import ResultsDetails from "./pages/ResultsDetails/ResultsDetails";
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
        {
          path:"group-list",
          element: <GroupList/>,
        },
        {
          path:"quizzes",
          element: <Quiz/>,
        },
        { path: "results", element: <Results /> },

        { path: "results-details", element: <ResultsDetails /> },
        {
          path:"change-password",
          element: <ChangePassword/>,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
    <AuthContextProvider>
         <RouterProvider router={Routes} />
      </AuthContextProvider>
      <Toaster />
    </>
  );
}

export default App;
