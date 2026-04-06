import { useContext } from "react";
import { AccountContext } from "./AccountContext";
import { Navigate ,Outlet} from"react-router-dom";


const useAuth = () => {
   const { account } = useContext(AccountContext);
   return account && account.loggedIn;};

const PrivateRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;