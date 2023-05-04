import jwt_decode, { JwtPayload } from "jwt-decode";
import * as localStorageWrapper from "./util/localStorage";

export function setToken(jwt: string) {
  return localStorageWrapper.setItem("x-access-token", jwt);
}

export function removeToken() {
  return localStorageWrapper.removeItem("x-access-token");
}

export function getAccessToken() {
  return localStorageWrapper.getItem("x-access-token");
}

export function isAuthenticated() {
  const jwt = getAccessToken();

  // Check if JWT is in storage
  if (!jwt || jwt === "null") {
    return { expired: null, jwt: null };
  }

  // If it is, check if it's still valid
  const decodedJwt = decodeJwt(jwt);
  const currentDate = new Date();

  if (!validateToken(decodedJwt, currentDate)) {
    // Access token expired
    return { expired: true, jwt };
  }

  // Token is valid
  return { expired: false, jwt };
}

interface TokenPayload extends JwtPayload {
  id: string;
  email: string;
  full_name: string;
}

export function decodeJwt(jwt: string) {
  const decodedJwt = jwt_decode<TokenPayload>(jwt);
  return decodedJwt;
}

export function validateToken(decodedJwt: JwtPayload, currentDate: Date) {
  if (decodedJwt.exp && decodedJwt.exp * 1000 < currentDate.getTime()) {
    // Token has expired
    return false;
  }
  return true;
}
