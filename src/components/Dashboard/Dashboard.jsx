import React from "react";
import style from "./Dashboard.module.css";
import SideBar from "../../ui-components/SideBar";
import { Button, Heading, View } from "@aws-amplify/ui-react";
import InventoryCreateForm from "../../ui-components/InventoryCreateForm";
import CustomerCreateForm from "../../ui-components/CustomerCreateForm";
import CustomerSummary from "../CustomerSummary/CustomerSummary";
import ProductSummary from "../ProductSummary/ProductSummary";
import OrderSummary from "../OrderSummary/OrderSummary";

function Dashboard() {
  const [showInventoryCreateForm, setShowInventoryCreateForm] =
    React.useState(false);
  const [showProductCreateForm, setShowProductCreateForm] =
    React.useState(false);
  const [showCustomerCreateForm, setShowCustomerCreateForm] =
    React.useState(false);
  const [showHome, setShowHome] = React.useState(false);
  const [showCustomerSummary, setShowCustomerSummary] = React.useState(false);
  const [showProductSummary, setShowProductSummary] = React.useState(false);
  const [showOrderSummary, setShowOrderSummary] = React.useState(false);

  const handleHomeButton = () => {
    setShowHome(true);
    setShowCustomerSummary(false);
    setShowOrderSummary(false);
    setShowProductSummary(false);
  };

  const handleCustomerSummaryButton = () => {
    setShowCustomerSummary(true);
    setShowHome(false);
    setShowOrderSummary(false);
    setShowProductSummary(false);
  };

  const handleProductSummaryButton = () => {
    setShowProductSummary(true);
    setShowHome(false);
    setShowCustomerSummary(false);
    setShowOrderSummary(false);
  };

  const handleOrderSummaryButton = () => {
    setShowOrderSummary(true);
    setShowHome(false);
    setShowCustomerSummary(false);
    setShowProductSummary(false);
  };

  return (
    <View className={style.container}>
      <SideBar
        className={style.sidebar}
        height={"100%"}
        HomeButtonHandler={handleHomeButton}
        CustomerButtonHandler={handleCustomerSummaryButton}
        ProductButtonHandler={handleProductSummaryButton}
        OrderButtonHandler={handleOrderSummaryButton}
      />
      {showHome && (
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            position: "relative",
          }}
        >
          <Heading
            style={{
              display: "flex",
              alignContent: "left",
              marginTop: "1rem",
            }}
            level={3}
          >
            Admin Dashboard
          </Heading>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "left",
              gap: "1rem",
            }}
          >
            <Button
              style={{
                width: "11rem",
                height: "3rem",
                marginTop: "2rem",
              }}
              onClick={() => setShowProductCreateForm(!showProductCreateForm)}
            >
              Add Product
            </Button>
            <Button
              style={{
                width: "11rem",
                height: "3rem",
                marginTop: "2rem",
              }}
              onClick={() =>
                setShowInventoryCreateForm(!showInventoryCreateForm)
              }
            >
              Add Inventory
            </Button>
            <Button
              style={{
                width: "11rem",
                height: "3rem",
                marginTop: "2rem",
              }}
              onClick={() => setShowCustomerCreateForm(!showCustomerCreateForm)}
            >
              Add Customer
            </Button>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              marginTop: "2rem",
            }}
          >
            <Heading
              style={{
                display: "flex",
                alignContent: "left",
              }}
              level={3}
            >
              Summary
            </Heading>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                justifyContent: "left",
                marginTop: "2rem",
              }}
            >
              <p>Total products: </p>
              <p>Total orders: </p>
              <p>Total sales: </p>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              width: "35rem",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: "30%",
              left: "100%",
              backdropFilter: "blur(10px)",
            }}
          >
            {showInventoryCreateForm && (
              <InventoryCreateForm border={"2px solid black"} />
            )}
            {showProductCreateForm && (
              <InventoryCreateForm border={"2px solid black"} />
            )}
            {showCustomerCreateForm && (
              <CustomerCreateForm
                border={"2px solid black"}
                onSuccess={() => {
                  alert("Customer created successfully!");
                  setShowCustomerCreateForm(false);
                }}
                onError={() => {
                  alert("Customer creation failed!");
                  setShowCustomerCreateForm(false);
                }}
              />
            )}
          </View>
        </View>
      )}
      {showCustomerSummary && <CustomerSummary />}
      {showProductSummary && <ProductSummary />}
      {showOrderSummary && <OrderSummary />}
    </View>
  );
}

export default Dashboard;
