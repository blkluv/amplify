import React from "react";
import style from "./Dashboard.module.css";
import SideBar from "../../ui-components/SideBar";
import { View } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

function Dashboard() {
  async function getUserInfo() {
    const user = await Auth.currentAuthenticatedUser();
    console.log("attributes:", user.attributes);
  }

  return (
    <View className={style.container}>
      <SideBar className={style.sidebar} height={"100%"} />
      <View className={style.main}>
        <h1>Dashboard</h1>
        <button onClick={getUserInfo}>Get User Info</button>
      </View>
    </View>
  );
}

export default Dashboard;
