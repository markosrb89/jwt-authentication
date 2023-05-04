import React from "react";

interface User {
  id: string;
  full_name: string;
  email: string;
}

const defaultUser: User = {
  id: "",
  full_name: "",
  email: "",
};

const UserContext = React.createContext(defaultUser);

export default UserContext;
