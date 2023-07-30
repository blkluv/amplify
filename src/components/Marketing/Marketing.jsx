import {
  Button,
  Heading,
  View,
  Card,
  Text,
  TextField,
  ToggleButton,
  CheckboxField,
} from "@aws-amplify/ui-react";
import React from "react";
import { useNavigate } from "react-router";
import SideBar from "../../ui-components/SideBar";
import axios from "axios";

function Marketing() {
  const navigate = useNavigate();
  const [showSendEmailsContainer, setShowSendEmailsContainer] =
    React.useState(false);
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sendTo, setSendTo] = React.useState("");
  const [sendToAllCustomers, setSendToAllCustomers] = React.useState(false);

  const handleHomeButton = () => navigate("/");
  const handleCustomerSummaryButton = () => navigate("/customers");
  const handleProductSummaryButton = () => navigate("/products");
  const handleOrderSummaryButton = () => navigate("/orders");
  const handleMarketingButton = () => navigate("/marketing");
  const handleStorageButton = () => navigate("/storage");
  const handleAnalyticsButton = () => navigate("/analytics");

  let data = JSON.stringify({
    ConfigurationSetName: "",
    Content: {
      Simple: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: "<html><body><h1>Hello!</h1><p>This is a test email.</p></body></html>",
          },
          Text: {
            Charset: "UTF-8",
            Data: "Hello, this is a test mail",
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "sample mail",
        },
      },
    },
    Destination: {
      ToAddresses: ["visheshbaghel99@gmail.com"],
    },
    EmailTags: [
      {
        Name: "tag1",
        Value: "value1",
      },
    ],
    FromEmailAddress: "visheshbaghel99@gmail.com",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    serviceName: "ses",
    url: "https://email.ap-south-1.amazonaws.com/v1/email/outbound-emails",
    headers: {
      "Content-Type": "application/json",
      "X-Amz-Content-Sha256":
        "beaead3198f7da1e70d03ab969765e0821b24fc913697e929e726aeaebf0eba3",
      "X-Amz-Date": `${new Date().toISOString()}`,
      Authorization:
        "AWS4-HMAC-SHA256 Credential=AKIA4XETEFG4DHWCEVWO/20230730/ap-south-1/ses/aws4_request, SignedHeaders=content-length;content-type;host;x-amz-content-sha256;x-amz-date, Signature=4ffc6261922e5f64b612d61f2c1dc498e62371e6cb3bfeb833150bc820bfa145",
    },
    data: data,
  };

  const handleEmailSendSubmit = () => {
    if (sendToAllCustomers) {
      console.log("send to all customers");
    } else {
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // const handleEmailSendSubmit = (e) => {
  //   e.preventDefault();
  //   fetch(
  //     "https://acm422vdf2.execute-api.ap-south-1.amazonaws.com/staging/emails",
  //     {
  //       mode: "no-cors",
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         senderName: "visheshbaghel99@gmail.com",
  //         senderEmail: "visheshbaghel99@gmail.com",
  //         message: "HELLO WORLD THIS IS FROM REACT APP P.S. Lebron the GOAT.",
  //         date: new Date(),
  //       }),
  //     }
  //   ).catch((err) => console.log(err));
  // };

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <SideBar
          style={{
            width: "20%",
            height: "100%",
          }}
          HomeButtonHandler={handleHomeButton}
          CustomerButtonHandler={handleCustomerSummaryButton}
          ProductButtonHandler={handleProductSummaryButton}
          OrderButtonHandler={handleOrderSummaryButton}
          marketingButtonHandler={handleMarketingButton}
          storageButtonHandler={handleStorageButton}
          analyticsButtonHandler={handleAnalyticsButton}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "left",
            }}
          >
            <Heading level={3}>Email Marketing</Heading>
            <Button
              style={{
                width: "10rem",
                height: "2.5rem",
                margin: "0.5rem 0 0.5rem 0",
              }}
              onClick={() => setShowSendEmailsContainer(true)}
            >
              Send emails
            </Button>
          </View>
          <View>
            <Heading level={3}>SMS Marketing</Heading>
          </View>
        </View>
        <View
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
            zIndex: "9998",
            display: showSendEmailsContainer ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card variation="elevated">
            <View
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              marginBottom="1rem"
            >
              <Heading level={4}>Send Emails</Heading>
              <Button
                style={{
                  width: "5rem",
                  height: "2rem",
                  border: "none",
                  marginLeft: "0.5rem",
                }}
                onClick={() => setShowSendEmailsContainer(false)}
              >
                Close
              </Button>
            </View>
            <Text
              style={{
                display: "flex",
                justifyContent: "left",
              }}
            >
              The email feature in the aws pinpoint is currently in sandbox
              mode.{" "}
            </Text>
            <Text
              style={{
                marginBottom: ".5rem",
                display: "flex",
                justifyContent: "left",
              }}
            >
              So only the verified email addresses can receive the emails.
            </Text>
            <Text
              style={{
                marginBottom: ".5rem",
                display: "flex",
                justifyContent: "left",
              }}
            >
              But still you can select 'send to all customers' toggle.
            </Text>
            <Text
              style={{
                marginBottom: ".5rem",
                display: "flex",
                justifyContent: "left",
              }}
            >
              It will make a dummy request to send the email to all the
              customers in the database.
            </Text>
            <Text
              style={{
                marginBottom: ".5rem",
                display: "flex",
                justifyContent: "left",
              }}
            >
              For this demo, only my email address is verified. So only I will
              receive the email.
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "left",
                alignItems: "left",
              }}
            >
              <TextField
                label="Subject"
                placeholder="Enter the subject"
                style={{
                  marginBottom: ".5rem",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "left",
                }}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <TextField
                label="Message"
                placeholder="Enter the message"
                style={{
                  marginBottom: ".5rem",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "left",
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <TextField
                label="Send to"
                placeholder="Enter the emails"
                style={{
                  marginBottom: ".5rem",
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "left",
                }}
                value={sendTo}
                onChange={(e) => setSendTo(e.target.value)}
              />
              <View
                style={{
                  marginBottom: ".5rem",
                  marginTop: ".5rem",
                  display: "flex",
                  justifyContent: "left",
                  flexDirection: "column",
                }}
              >
                <Button
                  style={{
                    width: "10rem",
                    height: "2.5rem",
                    margin: "0.5rem 0 0.5rem 0",
                  }}
                  onClick={handleEmailSendSubmit}
                >
                  Send
                </Button>
                <CheckboxField
                  label="Send to all customers"
                  checked={sendToAllCustomers}
                  onChange={(e) => setSendToAllCustomers(e.target.checked)}
                />
              </View>
            </View>
          </Card>
        </View>
      </View>
    </>
  );
}

export default Marketing;
