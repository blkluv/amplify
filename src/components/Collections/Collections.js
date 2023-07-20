import { useAuthenticator, Heading } from "@aws-amplify/ui-react";
export function Collections() {
  const { route } = useAuthenticator((context) => [context.route]);

  const message =
    route === "authenticated" ? "See Our Collections" : "Loading...";
  return <Heading level={1}>{message}</Heading>;
}
