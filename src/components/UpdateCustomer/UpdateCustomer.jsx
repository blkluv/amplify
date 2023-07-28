/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  Heading,
  SelectField,
  TextField,
  View,
} from "@aws-amplify/ui-react";
import { StorageManager } from "@aws-amplify/ui-react-storage";
import { DataStore } from "aws-amplify";
import { Customer } from "../../models";

export default function UpdateCustomer({ Customer: CustomerObj, closeModel }) {
  const initialAddressValue = {
    recipientName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  };

  const [name, setName] = React.useState(CustomerObj.name);
  const [email, setEmail] = React.useState(CustomerObj.email);
  const [dateOfBirth, setDateOfBirth] = React.useState(CustomerObj.dateOfBirth);
  const [gender, setGender] = React.useState(CustomerObj.gender);
  const [profileImage, setProfileImage] = React.useState(
    CustomerObj.profileImage
  );
  const [billingAddress, setBillingAddress] = React.useState(
    CustomerObj.billingAddress
  );
  const [shippingAddress, setShippingAddress] = React.useState(
    CustomerObj.shippingAddress
  );
  const [key, setKey] = React.useState("");

  const resetStateValues = () => {
    const cleanValues = {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      profileImage: "",
      billingAddress: initialAddressValue,
      shippingAddress: [initialAddressValue],
    };
    setName(cleanValues.name);
    setEmail(cleanValues.email);
    setDateOfBirth(cleanValues.dateOfBirth);
    setGender(cleanValues.gender);
    setProfileImage(cleanValues.profileImage);
    setBillingAddress(cleanValues.billingAddress);
    setShippingAddress(cleanValues.shippingAddress);
  };

  const handleSubmit = async () => {
    const customerAttributes = {
      name: name,
      email: email,
      birthdate: dateOfBirth,
      billingAddress: billingAddress,
      shippingAddress: shippingAddress,
      gender: gender,
      profileImage: key,
    };
    updateCustomer({ customerAttributes: customerAttributes });
  };

  async function updateCustomer({ customerAttributes }) {
    const original = await DataStore.query(Customer, CustomerObj.id);
    await DataStore.save(
      Customer.copyOf(original, (updated) => {
        updated.name = customerAttributes?.name;
        updated.email = customerAttributes?.email;
        updated.dateOfBirth = customerAttributes.birthdate;
        updated.billingAddress = customerAttributes.billingAddress;
        updated.shippingAddress = customerAttributes.shippingAddress;
        updated.gender = customerAttributes.gender;
        updated.profileImage = customerAttributes.profileImage;
      })
    )
      .then(() => {
        resetStateValues();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const processFile = async ({ file }) => {
    const fileExtension = file.name.split(".").pop();

    return file
      .arrayBuffer()
      .then((filebuffer) => window.crypto.subtle.digest("SHA-1", filebuffer))
      .then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((a) => a.toString(16).padStart(2, "0"))
          .join("");
        setKey(`${hashHex}.${fileExtension}`);
        return { file, key: `${hashHex}.${fileExtension}` };
      });
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Heading level={3}>Edit Profile</Heading>
        <Button
          style={{
            width: "4rem",
            height: "2rem",
            margin: "0 0 0 4rem",
          }}
          onClick={closeModel}
        >
          Close
        </Button>
      </View>
      <Grid
        as="form"
        rowGap="15px"
        columnGap="15px"
        padding="20px"
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></TextField>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></TextField>
        <TextField
          label="Date of Birth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => {
            setDateOfBirth(e.target.value);
          }}
        ></TextField>
        <TextField
          label="Billing Address"
          value={billingAddress}
          onChange={(e) => {
            setBillingAddress(e.target.value);
          }}
        ></TextField>
        <TextField
          label="Shipping Address"
          value={shippingAddress}
          onChange={(e) => {
            const shippingAddressArray = e.target.value.split(",");
            setShippingAddress(shippingAddressArray);
          }}
        ></TextField>
        <SelectField
          label="Gender"
          placeholder="Please select an option"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
          }}
        >
          <option children="Male" value="Male"></option>
          <option children="Femail" value="Femail"></option>
          <option
            children="Prefer Not to Say"
            value="Prefer Not to Say"
          ></option>
        </SelectField>
        <View>
          <StorageManager
            acceptedFileTypes={["image/*"]}
            accessLevel="public"
            maxFileCount={1}
            isResumable
            processFile={processFile}
          />
        </View>
        <Flex justifyContent="space-between">
          <Button
            children="Reset"
            type="reset"
            onClick={(event) => {
              event.preventDefault();
              resetStateValues();
            }}
          ></Button>
          <Flex gap="15px">
            <Button
              children="Submit"
              type="submit"
              variation="primary"
            ></Button>
          </Flex>
        </Flex>
      </Grid>
    </View>
  );
}
