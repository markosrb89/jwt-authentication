import React from "react";
import { JwtPayload } from "jwt-decode";

import UserContext from "./UserContext";
import { decodeJwt, getAccessToken } from "../auth";

export interface PayloadProps extends JwtPayload {
  id: string;
  email: string;
  full_name: string;
}

interface BootstrapAppProps {
  children: React.ReactNode;
}

function BootstrapApp({ children }: BootstrapAppProps) {
  const { id, full_name, email } = useGetJwtPayload();

  return (
    <UserContext.Provider value={{ id, full_name, email }}>
      {children}
    </UserContext.Provider>
  );
}

function useGetJwtPayload(): PayloadProps {
  const [jwtPayload, setJwtPayload] = React.useState<PayloadProps>();
  const accessToken = getAccessToken();

  React.useEffect(() => {
    if (accessToken) {
      const decodedAccessToken = decodeJwt(accessToken);
      setJwtPayload(decodedAccessToken);
    }
  }, [accessToken]);

  if (jwtPayload) {
    return jwtPayload;
  }

  return { id: "", full_name: "", email: "" };
}

export default BootstrapApp;
