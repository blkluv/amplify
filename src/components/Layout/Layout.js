// components/Layout.js
import React from "react";
import style from "./Layout.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import {
  useAuthenticator,
  Button,
  Heading,
  View,
  ThemeProvider,
} from "@aws-amplify/ui-react";
import NavBarHeader from "../../ui-components/NavBarHeader";
import NavBarHeader2 from "../../ui-components/NavBarHeader2";

export function Layout() {
  const { route, signOut } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);
  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate("/login");
  }
  return (
    <div className={style.container}>
      {route !== "authenticated" ? (
        <NavBarHeader2 loginHandler={() => navigate("/login")} />
      ) : (
        <>
          <NavBarHeader
            style={{
              width: "100vw",
            }}
            cartHandler={() => navigate("/cart")}
          />
        </>
      )}
      <View>
        {route === "authenticated" ? "You are logged in!" : "Please Login!"}
      </View>

      <Outlet />
    </div>
  );
}
