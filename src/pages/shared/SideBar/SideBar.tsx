import { motion } from "framer-motion";
import {
  
  FileText,
  GraduationCap,
  Home,
  LayoutList,
  Menu as List,
  LockKeyholeOpen,
  LogOut,
  MessageCircleQuestion,
  Users2,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToggle from "../../../Hooks/useToggle";
import CookieServices from "../../../Store/ResultsSlice/CookieServices";
import useAuth from "../../../Hooks/useAuth";


interface IFormChangePass {
  password: string;
  password_new: string;
  confirmPassword: string;
}

interface IProps {
  toggleSidebar: () => void;
}

interface IMenu {
  style: string;
  path?: React.ReactElement;
  icon: React.ReactNode;
  body: string;
  onClick?: () => void;
}

export default function SideBar({ toggleSidebar }: IProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    trigger,
  } = useForm<IFormChangePass>();

  const [iscollapsed, toggleCollapsed] = useToggle();
    const { logedInData } = useAuth();
  

  const { pathname } = useLocation();
  const handleToggle = () => {
    toggleCollapsed();
    toggleSidebar();
  };

  const navigate = useNavigate();
  const logout = () => {
    CookieServices.remove("role");
    CookieServices.remove("token");
    navigate("/");
  };

  const [isOpen, toggle] = useToggle();

  function openModal() {
    toggle();
  }

  function closeModal() {
    toggle();
  }


 

  const sidebarInstructorItems: IMenu[] = [
    {
      style: `${
        pathname === "/dashboard" ? "bg-secondColor " : ""
      } border-b border-black text-[19px] link`,
      path: <Link to="/dashboard" />,
      icon: <Users2 size={"35px"} className=" p-1 rounded-md bg-[#FFEDDF]" />,
      body: "Dashboard",
    },
    {
      style: `${
        pathname === "/dashboard/group-list" ? "bg-secondColor" : ""
      } border-b border-black text-[19px] link`,
      path: <Link to="/dashboard/group-list" />,
      icon: <Home size={"35px"} className=" p-1 rounded-md bg-[#FFEDDF]" />,
      body: "Groups",
    },
    {
      style: `${
        pathname === "/dashboard/student" ? "bg-secondColor" : ""
      } border-b border-black text-[19px] link`,
      path: <Link to="/dashboard/student" />,
      icon: <GraduationCap size={"35px"} className=" p-1 rounded-md bg-[#FFEDDF]" />,
      body: "Students",
    },
    {
      style: `${
        pathname?.includes("quizzes") ? "bg-secondColor" : ""
      } border-b border-black text-[19px] link`,
      path: <Link to="/dashboard/quizzes" />,
      icon: <LayoutList size={"35px"} className=" p-1 rounded-md bg-[#FFEDDF]" />,
      body: "Quizzes",
    },
    {
      style: `${
        pathname === "/dashboard/questions" ? "bg-secondColor" : ""
      } border-b border-black  text-[19px] link`,
      path: <Link to="/dashboard/questions" />,
      icon: (
        <MessageCircleQuestion size={"35px"} className=" p-1 rounded-md bg-[#FFEDDF]" />
      ),
      body: "Questions",
    },
    {
      style: `${
        pathname?.includes("results") ? "bg-secondColor" : ""
      } border-b border-black text-[19px] link`,
      path: <Link to="/dashboard/results" />,
      icon: <FileText size={"35px"} className=" p-1 rounded-md bg-[#FFEDDF]" />,
      body: "Results",
    },
    {
      path: <Link to="/dashboard/change-password" />,
      style: `border-b border-black text-[19px] link`,
      icon: <LockKeyholeOpen size={"35px"} className=" p-1 rounded-md bg-[#FFEDDF]" />,
      body: "ChangePassword",
      
    },
    {
      style: `border-b border-black text-[19px] link`,
      icon: <LogOut size={"35px"} className=" p-1 rounded-md bg-[#FFEDDF]" />,
      body: "Logout",
      onClick: logout,
    },
  ];

  const sidebarStudentItems: IMenu[] = [
    {
      style: `${
        pathname?.includes("quizzes") || pathname?.includes("exam")
          ? "bg-secondColor"
          : ""
      } border-b border-black text-[19px]   link`,
      path: <Link to="/dashboard/quizzes" />,
      icon: <LayoutList size={"35px"} className=" p-1 rounded-md bg-[#FFEDDF]" />,
      body: "Quizzes",
    },
    {
      style: `${
        pathname === "/dashboard/results" ? "bg-secondColor" : ""
      } border-b border-black text-[19px] link`,
      path: <Link to="/dashboard/results" />,
      icon: <FileText size={"35px"} className=" p-1 rounded-md bg-[#FFEDDF]" />,
      body: "Results",
    },
    {
      path: <Link to="/dashboard/change-password" />,
      style: `border-b border-black text-[19px] link`,
      icon: <LockKeyholeOpen size={"35px"} className=" p-1 rounded-md bg-[#FFEDDF]" />,
      body: "ChangePassword",
    },
    {
      style: `border-b border-black text-[19px] link`,
      icon: <LogOut size={"35px"} className=" p-1 rounded-md bg-[#FFEDDF]" />,
      body: "Logout",
      onClick: logout,
    },
  ];

  const MotionMenuItems = motion(MenuItem);

  useEffect(() => {
    if (watch("confirmPassword")) {
      trigger("confirmPassword");
    }
  }, [watch("password_new")]);
  return (
    <>
     
      <Sidebar
        collapsed={iscollapsed}
        className="h-screen side fixed hidden lg:block"
      >
        <Menu>
          <MenuItem
            className="border-b border-black  mt-4 pb-3"
            onClick={handleToggle}
            icon={<List size={"30px"} />}
          ></MenuItem>

          {logedInData?.profile?.role === "Instructor" ? (
            <>
              {sidebarInstructorItems?.map(
                ({ style, path, icon, body, onClick }: IMenu, idx) => (
                  <MotionMenuItems
                    whileHover={{ scale: 1.1 , backgroundColor:"#FFEDDF" }}
                    whileTap={{ scale: 0.95 }}
                    key={idx}
                    className={`${style}`}
                    onClick={onClick}
                    component={path}
                    icon={icon}
                  >
                    {(body)}
                  </MotionMenuItems>
                )
              )}
            </>
          ) : (
            <>
              {sidebarStudentItems?.map(
                ({ style, path, icon, body, onClick }: IMenu, idx) => (
                  <MotionMenuItems
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    key={idx}
                    className={`${style}`}
                    onClick={onClick}
                    component={path}
                    icon={icon}
                  >
                    {(body)}
                  </MotionMenuItems>
                )
              )}
            </>
          )}
        </Menu>
      </Sidebar>
    </>
  );
}
