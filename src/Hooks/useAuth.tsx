import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../Context/AuthContext";

export default function useAuth(){
   const navigate = useNavigate()
 const {logedInData,setLogedInData} = useContext(AuthContext)!




function logOut(){
    Cookies.remove("LOGEDDATA")
    setLogedInData(undefined)
    navigate("/")

}



 return {logOut ,logedInData,setLogedInData}
}