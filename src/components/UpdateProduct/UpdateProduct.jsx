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
import { Product } from "../../models";

export default function UpdateProduct({ Product: ProductObj, closeModel }) {
  const [name, setName] = React.useState(ProductObj.name);
  const [price, setPrice] = React.useState(ProductObj.price);
  const [description, setDescription] = React.useState(ProductObj.description);
  const [category, setCategory] = React.useState(ProductObj.category);
  const [images, setImages] = React.useState(ProductObj.productImages);
  const [tags, setTags] = React.useState(ProductObj.productTags);
  const [key, setKey] = React.useState("");

  const resetStateValues = () => {
    const cleanValues = {
      name: "",
      price: "",
      description: "",
      category: "",
      images: [],
      tags: [],
    };
    setName(cleanValues.name);
    setPrice(cleanValues.price);
    setDescription(cleanValues.description);
    setCategory(cleanValues.category);
    setImages(cleanValues.images);
    setTags(cleanValues.tags);
  };

  const handleSubmit = async () => {
    const ProductAttributes = {
      name: name,
      price: price,
      description: description,
      category: category,
      images: [...images, key],
      tags: [...tags],
    };
    updateProduct({ ProductAttributes: ProductAttributes });
  };

  async function updateProduct({ ProductAttributes }) {
    const original = await DataStore.query(Product, ProductObj.id);
    await DataStore.save(
      Product.copyOf(original, (updated) => {
        updated.name = ProductAttributes?.name;
        updated.price = ProductAttributes?.price;
        updated.description = ProductAttributes?.description;
        updated.category = ProductAttributes?.category;
        updated.productImages = ProductAttributes?.images;
        updated.productTags = ProductAttributes?.tags;
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
          label="Category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        ></TextField>
        <TextField
          label="Tags"
          value={tags}
          onChange={(e) => {
            const tags = e.target.value.split(",");
            setTags(tags);
          }}
        ></TextField>
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
