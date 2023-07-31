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
import { Auth, DataStore, Storage } from "aws-amplify";
import { Product } from "../../models";
import { useEffect } from "react";
import { Analytics } from "@aws-amplify/analytics";

export default function AddProduct({ closeModal }) {
  useEffect(() => {
    Analytics.autoTrack("event", {
      enable: true,
      events: ["click"],
      selectorPrefix: "data-amplify-analytics-name",
      provider: "AWSPinpoint",
    });
  }, []);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [productImages, setProductImages] = React.useState([]);
  const [category, setCategory] = React.useState("");
  const [productTags, setProductTags] = React.useState([]);
  const [key, setKey] = React.useState("");

  const resetStateValues = () => {
    const cleanValues = {
      name: "",
      description: "",
      price: "",
      productImages: [],
      category: "",
      productTags: [],
    };
    setName(cleanValues.name);
    setDescription(cleanValues.description);
    setPrice(cleanValues.price);
    setProductImages(cleanValues.productImages);
    setCategory(cleanValues.category);
    setProductTags(cleanValues.productTags);
  };

  const handleSubmit = async () => {
    const productAttributes = {
      name: name,
      description: description,
      price: price,
      productImages: [key],
      category: category,
      productTags: productTags,
    };
    addProduct({ productAttributes });
  };

  async function addProduct({ productAttributes }) {
    await DataStore.save(
      new Product({
        name: productAttributes.name,
        description: productAttributes.description,
        price: productAttributes.price,
        productImages: productAttributes.productImages,
        category: productAttributes.category,
        productTags: productAttributes.productTags,
      })
    )
      .then(() => {
        resetStateValues();
      })
      .catch((err) => console.log(err));
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
          justifyContent: "space-between",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Heading level={3}>Add Product</Heading>
        <Button
          style={{
            width: "4rem",
            height: "2rem",
            margin: "0 0 0 2rem",
          }}
          onClick={closeModal}
          data-amplify-analytics-name="close-add-product-modal-button"
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
          label="Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        ></TextField>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></TextField>
        <TextField
          label="Product Tags"
          value={productTags}
          onChange={(e) => {
            const tags = e.target.value.split(",");
            setProductTags(tags);
          }}
        ></TextField>
        <TextField
          label="Category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        ></TextField>
        <View
          style={{
            maxWidth: "500px",
          }}
        >
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
            data-amplify-analytics-name="reset-add-product-form-button"
          ></Button>
          <Flex gap="15px">
            <Button
              children="Submit"
              type="submit"
              variation="primary"
              data-amplify-analytics-name="submit-add-product-form-button"
            ></Button>
          </Flex>
        </Flex>
      </Grid>
    </View>
  );
}
