import { Authenticator } from "@aws-amplify/ui-react";
import { Cart } from "./components/Cart/Cart";
import { RequireAuth } from "./RequireAuth";
import { Login } from "./components/Login/Login";
import { Collections } from "./components/Collections/Collections";
import { Home } from "./components/Home/Home";
import { Layout } from "./components/Layout/Layout";
import { Profile } from "./components/Profile/Profile";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthenticator } from "@aws-amplify/ui-react";

import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";

function MyRoutes() {
  const { route } = useAuthenticator((context) => [context.route]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={route === "authenticated" ? <Dashboard /> : <Home />}
          />
          <Route
            path="/cart"
            element={
              <RequireAuth>
                <Cart />
              </RequireAuth>
            }
          />
          <Route
            path="/collections"
            element={
              <RequireAuth>
                <Collections />
              </RequireAuth>
            }
          />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <MyRoutes />
    </Authenticator.Provider>
  );
}

export default App;
