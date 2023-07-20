import { useAuthenticator, Heading, Button } from "@aws-amplify/ui-react";
import ProfileCard from "../../ui-components/ProfileCard";
import { DataStore } from "@aws-amplify/datastore";
import { Customer } from "../../models";
import { API } from "aws-amplify";
import * as mutations from "./graphql/mutations";

await DataStore.save(
  new Customer({
    name: "Lorem ipsum dolor sit amet",
    dateOfBirth: "1970-01-01Z",
    email: "test12346789@testemailtestemail.com",
    billingAddress: [],
    shippingAddress: [],
    profileImage: "Lorem ipsum dolor sit amet",
    gender: "Lorem ipsum dolor sit amet",
    Orders: [],
    Cart: [],
  })
);

const customer = {
  name: "Lorem ipsum dolor sit amet",
  dateOfBirth: "1970-01-01Z",
  email: "test12346789@testemailtestemail.com",
  billingAddress: [],
  shippingAddress: [],
  profileImage: "Lorem ipsum dolor sit amet",
  gender: "Lorem ipsum dolor sit amet",
  Orders: [],
  Cart: [],
};

const saveCustomer = await API.graphql({
  graphqlOperation: mutations.createCustomer,
  variables: { input: customer },
});

export function Profile() {
  const { route } = useAuthenticator((context) => [context.route]);

  const message = route === "authenticated" ? "Your Profile" : "Loading...";
  return (
    <>
      <Heading level={1}>{message}</Heading>
      <Button onClick={saveCustomer}>Save</Button>
      <ProfileCard />
    </>
  );
}
