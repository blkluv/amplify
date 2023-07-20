import { useAuthenticator, Heading } from "@aws-amplify/ui-react";
export function Cart() {
  const { route } = useAuthenticator((context) => [context.route]);

  const message = route === "authenticated" ? "Your Cart" : "Loading...";
  return <Heading level={1}>{message}</Heading>;
}
