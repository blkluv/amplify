import { useAuthenticator, Heading, View } from "@aws-amplify/ui-react";
export function Collections() {
  const { route } = useAuthenticator((context) => [context.route]);

  const message =
    route === "authenticated" ? "See Our Collections" : "Loading...";
  return (
    <View>
      <Heading level={1}>{message}</Heading>
    </View>
  );
}
