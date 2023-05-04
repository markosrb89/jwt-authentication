import { useMutation } from "react-query";
import axios from "axios";
import {
  LOGIN_API,
  GET_ALL_USERS,
  GET_USER,
  REGISTER_API,
  DELETE_USER,
  REFRESH_JWT,
} from "./constants";
import { getAccessToken, setToken, removeToken } from "../auth";

interface APITokensResponse {
  success: boolean;
  payload: {
    accessToken: string;
    refreshToken: string;
  };
}

interface LoginProps {
  email: string;
  password: string;
}

async function login({ email, password }: LoginProps) {
  const { data } = await axios(LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: { email, password },
  });

  return data;
}

export function useLogin(callback: (flag: boolean) => void) {
  return useMutation(login, {
    onSuccess: (data: APITokensResponse) => {
      if (data.success) {
        setToken(data.payload.accessToken);
        return callback(true);
      }
    },
  });
}

interface RegisterProps {
  full_name: string;
  email: string;
  password: string;
}

export async function register({ full_name, email, password }: RegisterProps) {
  const { data } = await axios(REGISTER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: { full_name, email, password },
  });

  return data;
}

export async function getUsers() {
  const accessToken = getAccessToken();

  const { data } = await axios(GET_ALL_USERS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken,
    },
  });

  return data;
}

export async function getUser(userId: string) {
  const accessToken = getAccessToken();

  const { data } = await axios(GET_USER(userId), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken,
    },
  });

  return data;
}

export async function deleteUser(userId: string) {
  const accessToken = getAccessToken();

  const { data } = await axios(DELETE_USER(userId), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken,
    },
  });

  removeToken();

  return data;
}

export async function refreshJwt(): Promise<APITokensResponse> {
  const { data } = await axios(REFRESH_JWT, {
    method: "GET",
  });

  return data;
}
