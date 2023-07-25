import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Cart } from "./components/Cart/Cart";
import { RequireAuth } from "./RequireAuth";
import { Login } from "./components/Login/Login";
import { Collections } from "./components/Collections/Collections";
import { Home } from "./components/Home/Home";
import { Layout } from "./components/Layout/Layout";
import Profile from "./components/Profile/Profile";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { withInAppMessaging } from "@aws-amplify/ui-react-notifications";

function MyRoutes() {
  const { route } = useAuthenticator((context) => [context.route]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={route === "authenticated" ? <Dashboard /> : <Home />}
          />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route path="/collections" element={<Collections />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
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

export default withInAppMessaging(App);
