import { useContext, type ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader } from "../ui/loader";

type Props = {
  children: ReactNode;
}

export const GuestRoute = ({ children }: Props) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children;
}