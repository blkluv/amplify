import { useEffect, useState } from "react";
import { useAuthenticator, Heading, Button } from "@aws-amplify/ui-react";
import ProfileCard from "../../ui-components/ProfileCard";
import * as mutations from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import EditProfile from "../../ui-components/EditProfile";
import NewForm1 from "../../ui-components/NewForm1";
import { Auth } from "aws-amplify";
import EditProfileLocal from "../EditProfileLocal/EditProfileLocal";

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
  )
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

export function Profile() {
  const { route } = useAuthenticator((context) => [context.route]);

  const [user, setUser] = useState(null);

  async function getUserInfo() {
    const user = await Auth.currentAuthenticatedUser();
    console.log("attributes:", user.attributes.name);
    setUser(user);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Heading level={4}>
        {user
          ? `Hi, ${user.attributes.name}. See your details here`
          : "Hi, See your details here"}
      </Heading>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <EditProfileLocal user={user} />
      </div>
    </>
  );
}
