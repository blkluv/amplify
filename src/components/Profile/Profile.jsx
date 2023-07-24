import { useEffect, useState } from "react";
import { Heading, View } from "@aws-amplify/ui-react";
import * as mutations from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { Auth } from "aws-amplify";
import EditProfileLocal from "../EditProfileLocal/EditProfileLocal";
import React from "react";
import { Storage } from "aws-amplify";

const address = {
  recipientName: "Lorem ipsum dolor sit amet",
  street: "Lorem ipsum dolor sit amet",
  city: "Lorem ipsum dolor sit amet",
  state: "Lorem ipsum dolor sit amet",
  postalCode: "Lorem ipsum dolor sit amet",
  country: "Lorem ipsum dolor sit amet",
};

const customer = {
  name: "Lorem ipsum dolor sit amet",
  dateOfBirth: "1970-01-01Z",
  email: "test12346789@testemailtestemail.com",
  billingAddress: address,
  shippingAddress: address,
  gender: "Lorem ipsum dolor sit amet",
};

const saveCustomer = async () =>
  await API.graphql(
    graphqlOperation(mutations.createCustomer, { input: customer })
  );

export default function Profile() {
  const [user, setUser] = useState({
    attributes: {
      name: "",
      email: "",
      DateOfBirth: "",
      address: "",
      gender: "",
      phoneNumber: "",
      profilePhoto: "",
    },
  });

  const [userProfilePhoto, setUserProfilePhoto] = useState("");

  useEffect(() => {
    getUserInfo();
    downloadFile(user);
  }, [userProfilePhoto]);

  async function getUserInfo() {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);
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
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
          justifyContent: "left",
          width: "50%",
          marginRight: "10px",
          borderRight: "1px solid #ddd",
        }}
      >
        <Heading level={3}>Profile</Heading>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",
            marginLeft: "50px",
          }}
        >
          <img
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
            src={userProfilePhoto}
            alt="profile"
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",
            marginLeft: "50px",
          }}
        >
          <Heading
            style={{
              marginRight: "10px",
            }}
            level={4}
          >
            Name:
          </Heading>
          <p>{user.attributes.name}</p>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",
            marginLeft: "50px",
          }}
        >
          <Heading
            style={{
              marginRight: "10px",
            }}
            level={4}
          >
            Email:
          </Heading>
          <p>{user.attributes.email}</p>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",
            marginLeft: "50px",
          }}
        >
          <Heading
            style={{
              marginRight: "10px",
            }}
            level={4}
          >
            Address:
          </Heading>
          <p>{user.attributes.address}</p>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",
            marginLeft: "50px",
          }}
        >
          <Heading
            style={{
              marginRight: "10px",
            }}
            level={4}
          >
            Gender:
          </Heading>
          <p>{user.attributes.gender}</p>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",
            marginLeft: "50px",
          }}
        >
          <Heading
            style={{
              marginRight: "10px",
            }}
            level={4}
          >
            Phone Number:
          </Heading>
          <p>
            {user.attributes.phoneNumber ? user.attributes.phoneNumber : "none"}
          </p>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "space-between",
          justifyContent: "center",
          width: "50%",
          marginLeft: "10px",
        }}
      >
        <EditProfileLocal user={user} />
      </View>
    </View>
  );
}
