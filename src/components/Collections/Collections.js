import React from "react";
import { useAuthenticator, View, Grid } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
import ActionCard from "../../ui-components/ActionCard";
import { Product } from "../../models";
import { useState, useEffect } from "react";
import { Storage } from "aws-amplify";

export function Collections() {
  const { route } = useAuthenticator((context) => [context.route]);
  const message =
    route === "authenticated" ? "See Our Collections" : "Loading...";
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const models = await DataStore.query(Product);
    setProducts(models);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const downloadImage = async (imageArray) => {
    const signedUrl = await Storage.get(imageArray);
    return signedUrl;
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2rem",
        width: "100%",
        height: "100%",
        overflow: "scroll",
      }}
    >
      <Grid templateColumns="1fr 1fr 1fr 1fr" gap={15}>
        {products.map((product) => (
          <View
            key={product.id}
            style={{
              height: "100%",
              border: "1px solid #ddd",
            }}
          >
            <ActionCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={`$${product.price}`}
              image={downloadImage(product.productImage)}
            />
          </View>
        ))}
      </Grid>
    </View>
  );
}
