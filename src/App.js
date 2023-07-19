//App.js
import { Authenticator } from "@aws-amplify/ui-react";

import { Protected } from "./components/Protected/Protected";
import { RequireAuth } from "./RequireAuth";
import { Login } from "./components/Login/Login";
import { ProtectedSecond } from "./components/ProtectedSecond/ProtectedSecond";
import { Home } from "./components/Home/Home";
import { Layout } from "./components/Layout/Layout";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

function MyRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/protected"
            element={
              <RequireAuth>
                <Protected />
              </RequireAuth>
            }
          />
          <Route
            path="/protected2"
            element={
              <RequireAuth>
                <ProtectedSecond />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <MyRoutes />
    </Authenticator.Provider>
  );
}

export default App;
