import { useAuthenticator, Heading, Button } from "@aws-amplify/ui-react";
import ProfileCard from "../../ui-components/ProfileCard";
import * as mutations from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

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

  const message = route === "authenticated" ? "Your Profile" : "Loading...";
  return (
    <>
      <Heading level={1}>{message}</Heading>
      <Button onClick={saveCustomer}>Save</Button>
      <ProfileCard />
    </>
  );
}
