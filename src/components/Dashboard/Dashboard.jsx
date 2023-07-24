import React from "react";
import style from "./Dashboard.module.css";
import SideBar from "../../ui-components/SideBar";
import { View } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import InventoryCreateForm from "../../ui-components/InventoryCreateForm";

function Dashboard() {
  async function getUserInfo() {
    const user = await Auth.currentAuthenticatedUser();
    console.log("attributes:", user.attributes);
  }

  const convertStringToJSONForAddress = (string) => {
    const array = string.split(",");
    const address = {
      recipientName: array[0],
      street: array[1],
      city: array[2],
      state: array[3],
      postalCode: array[4],
      country: array[5],
    };
    return address;
  };

  const handleInventoryCreateSubmit = (values) => {
    const object = convertStringToJSONForAddress(values);
    console.log("values:", object);
  };

  return (
    <View className={style.container}>
      <SideBar className={style.sidebar} height={"100%"} />
      <View className={style.main}>
        <h1>Dashboard</h1>
        <button onClick={getUserInfo}>Get User Info</button>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            width: "35rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <InventoryCreateForm />
        </View>
      </View>
    </View>
  );
}

export default Dashboard;
