import "./App.css";
import { Button, View, withAuthenticator } from "@aws-amplify/ui-react";
import { Route, Routes } from "react-router";

function App({ signOut }) {
  return (
    <View className="App">
      inside app
      <Button onClick={signOut}>Sign out</Button>
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="/profile" element={<div>profile</div>} />
      </Routes>
    </View>
  );
}

export default withAuthenticator(App);
