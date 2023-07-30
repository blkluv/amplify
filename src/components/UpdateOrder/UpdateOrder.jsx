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
import { Order } from "../../models";
import { useEffect } from "react";
import { Analytics } from "@aws-amplify/analytics";

export default function UpdateOrder({ Order: OrderObj, closeModel }) {
  useEffect(() => {
    Analytics.autoTrack("event", {
      enable: true,
      events: ["click"],
      selectorPrefix: "data-amplify-analytics-name",
      provider: "AWSPinpoint",
    });
  }, []);

  const [billingAddress, setBillingAddress] = React.useState(
    OrderObj.billingAddress
  );
  const [shippingAddress, setShippingAddress] = React.useState(
    OrderObj.shippingAddress
  );
  const [orderItems, setOrderItems] = React.useState(OrderObj.items);
  const [totalAmount, setTotalAmount] = React.useState(OrderObj.totalAmount);

  const initialAddressValue = {
    recipientName: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  };

  const resetStateValues = () => {
    const cleanValues = {
      billingAddress: initialAddressValue,
      shippingAddress: initialAddressValue,
      orderItems: [],
      totalAmount: "",
    };
    setBillingAddress(cleanValues.billingAddress);
    setShippingAddress(cleanValues.shippingAddress);
    setOrderItems(cleanValues.orderItems);
    setTotalAmount(cleanValues.totalAmount);
  };

  const handleSubmit = async () => {
    const OrderAttributes = {
      billingAddress: billingAddress,
      shippingAddress: shippingAddress,
      orderItems: orderItems,
      totalAmount: totalAmount,
    };
    updateOrder({ OrderAttributes: OrderAttributes });
  };

  async function updateOrder({ OrderAttributes }) {
    const original = await DataStore.query(Order, OrderObj.id);
    await DataStore.save(
      Order.copyOf(original, (updated) => {
        updated.billingAddress = OrderAttributes?.billingAddress;
        updated.shippingAddress = OrderAttributes?.shippingAddress;
        updated.orderItems = OrderAttributes?.orderItems;
        updated.totalAmount = OrderAttributes?.totalAmount;
      })
    )
      .then(() => {
        resetStateValues();
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
        <Heading level={3}>Edit Order</Heading>
        <Button
          style={{
            width: "4rem",
            height: "2rem",
            margin: "0 0 0 4rem",
          }}
          onClick={closeModel}
          data-amplify-analytics-name="close-update-order-model"
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
        data-amplify-analytics-name="update-order-form"
      >
        <TextField
          label="Total Amount"
          value={totalAmount}
          onChange={(e) => {
            setTotalAmount(e.target.value);
          }}
        ></TextField>
        <TextField
          label="Items"
          value={orderItems}
          onChange={(e) => {
            const orderItems = e.target.value.split(",");
            setOrderItems(orderItems);
          }}
        ></TextField>
        <TextField
          label="Billing Address"
          value={billingAddress}
          onChange={(e) => {
            const billingAddress = e.target.value.split(",");
            setBillingAddress({
              recipientName: billingAddress[0],
              street: billingAddress[1],
              city: billingAddress[2],
              state: billingAddress[3],
              postalCode: billingAddress[4],
              country: billingAddress[5],
            });
          }}
        ></TextField>
        <TextField
          label="Shipping Address"
          value={shippingAddress}
          onChange={(e) => {
            const shippingAddress = e.target.value.split(",");
            setShippingAddress({
              recipientName: shippingAddress[0],
              street: shippingAddress[1],
              city: shippingAddress[2],
              state: shippingAddress[3],
              postalCode: shippingAddress[4],
              country: shippingAddress[5],
            });
          }}
        ></TextField>
        <Flex justifyContent="space-between">
          <Button
            children="Reset"
            type="reset"
            onClick={(event) => {
              event.preventDefault();
              resetStateValues();
            }}
            data-amplify-analytics-name="reset-update-order-form"
          ></Button>
          <Flex gap="15px">
            <Button
              children="Submit"
              type="submit"
              variation="primary"
              data-amplify-analytics-name="submit-update-order-form"
            ></Button>
          </Flex>
        </Flex>
      </Grid>
    </View>
  );
}
