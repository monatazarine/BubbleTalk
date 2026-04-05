import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//context is used to share data across components without prop drilling
export const AccountContext = createContext();


const UserContext = ({ children }) => {
             const [account, setAccount] = useState({loggedInc : null});
             const navigate = useNavigate();
             useEffect(() => {
                 fetch("http://localhost:4000/auth/login", {
                    credentials: "include",
                     })
                     .catch(err => {
                         setAccount({loggedIn : false})
                         return;})
                       .then(res => {
                           if(!res || !res.ok || res.status >= 400) {
                               setAccount({loggedIn : false})
                               return;
                           }
                                       return res.json();
                       })
                      .then(data => {
                          if(!data){
                         setAccount({loggedIn : false})
                         return;}
                         navigate('/home');  
                         setAccount({...data});
                              })
             }, []
)

             return (
                         <AccountContext.Provider value={{account, setAccount}}>
                          {children}
                         </AccountContext.Provider>
             )
}
export default UserContext;

