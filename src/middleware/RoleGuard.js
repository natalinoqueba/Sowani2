import { useUserType } from "../context/UserTypeContext";
import { Navigate } from "react-router-dom";


const RoleGuard = ({ allowedRoles, children }) => {
  const { userType } = useUserType();

  // if (userType === null) {
  //   return <p className="p-6">Carregando...</p>;
  // }

  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/" />; // redireciona se não permitido
  } 

  return children;
};

export default RoleGuard;
