import React from "react";
import { v4 as uuidV4 } from "uuid";

import UserContext from "../../app/UserContext";
import { getUsers } from "../../api";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { removeToken } from "../../auth";

interface PayloadProps {
  id: number;
  email: string;
  full_name: string;
  password: string;
}

function Dashboard() {
  const user = React.useContext(UserContext);
  const navigate = useNavigate();
  const { data } = useQuery("users", getUsers);

  return (
    <div>
      <h2>
        <span>
          {`Welcome ${user.full_name}! To logout click`}
          <a
            style={{
              marginLeft: "5px",
              cursor: "pointer",
              color: "bisque",
            }}
            onClick={() => {
              removeToken();
              return navigate("/login");
            }}
          >
            here
          </a>
        </span>
      </h2>
      <ul>
        {data?.payload?.users.map((user: PayloadProps) => (
          <li key={uuidV4()}>{user.full_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
