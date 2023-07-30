import React from "react";
import style from "./Layout.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { View, useAuthenticator } from "@aws-amplify/ui-react";
import NavBarHeader from "../../ui-components/NavBarHeader";
import NavBarHeader2 from "../../ui-components/NavBarHeader2";
import { Auth } from "aws-amplify";
import { Storage } from "@aws-amplify/storage";
import { useEffect } from "react";
import { Analytics } from "aws-amplify";

export function Layout() {
  useEffect(() => {
    Analytics.autoTrack("event", {
      enable: true,
      events: ["click"],
      selectorPrefix: "data-amplify-analytics-name",
      provider: "AWSPinpoint",
    });
  }, []);

  const { route } = useAuthenticator((context) => [
    context.route,
    context.signOut,
  ]);

  const [userProfilePhoto, setUserProfilePhoto] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    getUserInfo();
  }, []);

  async function getUserInfo() {
    const user = await Auth.currentAuthenticatedUser();
    downloadFile(user);
  }

  const downloadFile = async (user) => {
    await Storage.get(`${user.attributes.picture}`, {
      level: "public",
    })
      .then((result) => {
        setUserProfilePhoto(result);
      })
      .catch((err) => console.log(err));
  };

  return (
    <View className={style.container}>
      {route !== "authenticated" ? (
        <NavBarHeader2
          width={"100%"}
          className={style.navbar}
          loginHandler={() => navigate("/login")}
          data-amplify-analytics-name="login"
        />
      ) : (
        <>
          <NavBarHeader
            width={"100%"}
            className={style.navbar}
            cartHandler={() => navigate("/cart")}
            profileImage={userProfilePhoto}
            data-amplify-analytics-name="cart"
          />
        </>
      )}
      <Outlet />
    </View>
  );
}
