import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AmplifyProvider, ThemeProvider } from "@aws-amplify/ui-react";
import { studioTheme } from "./ui-components";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AmplifyProvider>
      <ThemeProvider theme={studioTheme}>
        <App />
      </ThemeProvider>
    </AmplifyProvider>
  </React.StrictMode>
);

reportWebVitals();
