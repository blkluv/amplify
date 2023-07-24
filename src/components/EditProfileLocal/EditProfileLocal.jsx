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
import {
  fetchByPath,
  processFile,
  validateField,
} from "../../ui-components/utils";
import { Storage, Auth } from "aws-amplify";

const props = {
  idProp: undefined,
  customerModelProp: undefined,
  onSuccess: undefined,
  onError: undefined,
  onSubmit: undefined,
  onValidate: undefined,
  onChange: undefined,
  overrides: undefined,
};

export default function EditProfileLocal({ user }) {
  const initialValues = {
    name: user ? user.attributes.name : "",
    email: user ? user.attributes.email : "",
    DateOfBirth: user ? user.attributes.birthdate : "",
    address: user ? user.attributes.address : "",
    gender: user ? user.attributes.gender : "",
    phoneNumber: user ? user.attributes.phone_number : "",
    profilePhoto: user ? user.attributes.picture : "",
  };

  const [name, setName] = React.useState(initialValues.name);
  const [email, setEmail] = React.useState(initialValues.email);
  const [DateOfBirth, setDateOfBirth] = React.useState(
    initialValues.DateOfBirth
  );
  const [address, setAddress] = React.useState(initialValues.address);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [phoneNumber, setPhoneNumber] = React.useState(
    initialValues.phoneNumber
  );
  const [picture, setPicture] = React.useState(initialValues.profilePhoto);

  const resetStateValues = () => {
    const cleanValues = {
      name: "",
      email: "",
      DateOfBirth: "",
      address: "",
      gender: "",
      phoneNumber: "",
      profilePhoto: "",
    };
    setName(cleanValues.name);
    setEmail(cleanValues.email);
    setDateOfBirth(cleanValues.DateOfBirth);
    setAddress(cleanValues.address);
    setGender(cleanValues.gender);
    setPhoneNumber(cleanValues.phoneNumber);
    setPicture(cleanValues.profilePhoto);
  };

  const downloadFile = async (user) => {
    await Storage.get(`${user.attributes.picture}`, {
      level: "public",
    })
      .then((result) => {
        setPicture(result);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    downloadFile(user);
  }, []);

  React.useEffect(resetStateValues, [user]);

  const handleSubmit = async () => {
    const userAttributes = {
      name: name ? name : user.attributes.name,
      email: email ? email : user.attributes.email,
      birthdate: DateOfBirth ? DateOfBirth : user.attributes.birthdate,
      address: address,
      gender: gender,
      phone_number: phoneNumber,
      picture: key ? key : user.attributes.picture,
    };
    updateUser({ userAttributes });
  };

  async function updateUser({ userAttributes }) {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, userAttributes).catch((err) =>
      console.log(err)
    );
  }

  const [key, setKey] = React.useState("");

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

  const onUploadSuccess = async () => {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.updateUserAttributes(user, {
      picture: key,
    }).catch((err) => console.log(err));
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
      <Heading level={3}>Edit Profile</Heading>
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
          value={DateOfBirth}
          onChange={(e) => {
            setDateOfBirth(e.target.value);
          }}
        ></TextField>
        <TextField
          label="Address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
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
        <TextField
          label="Phone Number"
          type="tel"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        ></TextField>
        <View>
          <StorageManager
            acceptedFileTypes={["image/*"]}
            accessLevel="public"
            maxFileCount={1}
            isResumable
            processFile={processFile}
            onUploadSuccess={onUploadSuccess}
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
