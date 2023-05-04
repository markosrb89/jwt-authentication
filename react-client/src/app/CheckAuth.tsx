import React from "react";
import { useNavigate } from "react-router-dom";

import { isAuthenticated, setToken } from "../auth";
import { refreshJwt } from "../api";

interface CheckAuthProps {
  children: React.ReactNode;
}

function CheckAuth({ children }: CheckAuthProps) {
  const navigate = useNavigate();

  const authenticateUser = React.useCallback(async () => {
    const { expired: accessTokenExpired, jwt } = isAuthenticated();

    // JWT does not exist in local storage, so we assume
    // it's initial render hence redirect user to /login
    if (!accessTokenExpired && !jwt) {
      return navigate("/login");
    }

    if (jwt) {
      // Access token has expired, so we will obtain a new access
      // token without requiring the user to re-authenticate
      if (accessTokenExpired) {
        const tokens = await refreshJwt();
        setToken(tokens.payload.accessToken);
      }
    }
  }, [navigate]);

  React.useEffect(() => {
    authenticateUser();
  }, [authenticateUser]);

  return <>{children}</>;
}

export default CheckAuth;
