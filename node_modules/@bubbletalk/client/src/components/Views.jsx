
import {Routes,Route} from "react-router-dom";
import Login from "./Login/Login.jsx";
import SignUp from "./Login/SignUp.jsx";
import { Text } from "@chakra-ui/react";
import PrivateRoute from "./PrivateRoutes.jsx";
import { useContext } from "react";
import  { AccountContext } from "./AccountContext";
import Home from "./Home/Home.jsx";
const Views = () => {
    const {account} = useContext(AccountContext);

    return account.loggedIn === null ? 
      <Text>Loading...</Text>          
   
    : (
   <>
             
         <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route element={<PrivateRoute/>}>
                <Route path="/home" element={<Home/>} /> 
             </Route> 
            <Route path="*" element={<Login/>} />

        </Routes>

   </>
    )
}
;    
export default Views;