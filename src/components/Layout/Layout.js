import React from "react";
import style from "./Layout.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import { View, useAuthenticator } from "@aws-amplify/ui-react";
import NavBarHeader from "../../ui-components/NavBarHeader";
import NavBarHeader2 from "../../ui-components/NavBarHeader2";
import { Auth } from "aws-amplify";
import { Storage } from "@aws-amplify/storage";

export function Layout() {
  const { route, signOut } = useAuthenticator((context) => [
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
        />
      ) : (
        <>
          <NavBarHeader
            width={"100%"}
            className={style.navbar}
            cartHandler={() => navigate("/cart")}
            profileImage={userProfilePhoto}
          />
        </>
      )}
      <Outlet />
    </View>
  );
}
