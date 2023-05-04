import { BrowserRouter, Route, Routes } from "react-router-dom";

import CheckAuth from "./CheckAuth";
import BootstrapApp from "./BootstrapApp";
import { LoginForm, RegisterForm } from "../components/Form";
import { Dashboard } from "../components/Dashboard";
import { NotFound } from "../components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth>
              <BootstrapApp>
                <Dashboard />
              </BootstrapApp>
            </CheckAuth>
          }
        />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
