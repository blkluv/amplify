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
import { useTheme } from "@aws-amplify/ui-react";

export function Layout() {
  const { colors } = useTheme();
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
      <Heading
        level={1}
        style={{
          textAlign: "center",
          color: "white",
          backgroundColor: `black`,
          padding: "1rem",
          margin: "0 0 2rem 0",
        }}
      >
        World's Best Shopping App
      </Heading>
      <nav>
        <Button onClick={() => navigate("/")}>Home</Button>
        <Button onClick={() => navigate("/collections")}>Collections</Button>
        <Button onClick={() => navigate("/cart")}>Cart</Button>
        {route !== "authenticated" ? (
          <Button onClick={() => navigate("/login")}>Login</Button>
        ) : (
          <>
            <Button onClick={() => navigate("/profile")}>Profile</Button>
            <Button onClick={() => logOut()}>Logout</Button>
          </>
        )}
      </nav>
      <View>
        {route === "authenticated" ? "You are logged in!" : "Please Login!"}
      </View>

      <Outlet />
    </div>
  );
}
