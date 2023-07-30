import React from "react";
import { useAuthenticator, View, Grid, Heading } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
import ActionCard from "../../ui-components/ActionCard";
import { Product } from "../../models";
import { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { Analytics } from "aws-amplify";

export function Collections() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  useEffect(() => {
    setStartTime(new Date());
    return () => setEndTime(new Date());
  }, []);

  useEffect(() => {
    if (startTime && endTime) {
      const seconds = (endTime.getTime() - startTime.getTime()) / 1000;
      Analytics.record({
        name: "timeOnCollectionPage",
        attributes: { timeOnPage: seconds },
      });
    }

    Analytics.autoTrack("session", {
      enable: true,
      attributes: {
        page: "Collections",
      },
    });

    Analytics.autoTrack("pageView", {
      enable: true,
      eventName: "pageView",
      type: "singlePageApp",
      provider: "AWSPinpoint",
      getUrl: () => {
        return window.location.origin + window.location.pathname;
      },
    });

    Analytics.autoTrack("event", {
      enable: true,
      events: ["click"],
      selectorPrefix: "data-amplify-analytics-name",
      provider: "AWSPinpoint",
    });
  }, [endTime]);

  const { route } = useAuthenticator((context) => [context.route]);
  const message =
    route === "authenticated" ? "See Our Collections" : "Login to Buy";
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const models = await DataStore.query(Product);
    setProducts(models);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const downloadImage = async (imageArray) => {
    const image = imageArray.slice(0, 1)[0];
    const signedUrl = await Storage.get(image);
    console.log(signedUrl);
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
        flexDirection: "column",
      }}
    >
      <Heading level={3}>{message}</Heading>
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
              image={downloadImage(product.productImages)}
              data-amplify-analytics-name="productClick"
            />
          </View>
        ))}
      </Grid>
    </View>
  );
}
