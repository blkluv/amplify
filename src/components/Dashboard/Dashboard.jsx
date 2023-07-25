import React from "react";
import style from "./Dashboard.module.css";
import SideBar from "../../ui-components/SideBar";
import { Button, Heading, View } from "@aws-amplify/ui-react";
import CustomerCreateForm from "../../ui-components/CustomerCreateForm";
import CustomerSummary from "../CustomerSummary/CustomerSummary";
import ProductSummary from "../ProductSummary/ProductSummary";
import OrderSummary from "../OrderSummary/OrderSummary";
import ProductCreateForm from "../../ui-components/ProductCreateForm";
import OrderCreateForm from "../../ui-components/OrderCreateForm";
import Stat from "../../ui-components/Stat";
import { DataStore } from "@aws-amplify/datastore";
import { Customer, Order } from "../../models";

function Dashboard() {
  const [showProductCreateForm, setShowProductCreateForm] =
    React.useState(false);
  const [showCustomerCreateForm, setShowCustomerCreateForm] =
    React.useState(false);
  const [showOrderCreateForm, setShowOrderCreateForm] = React.useState(false);
  const [showHome, setShowHome] = React.useState(true);
  const [showCustomerSummary, setShowCustomerSummary] = React.useState(false);
  const [showProductSummary, setShowProductSummary] = React.useState(false);
  const [showOrderSummary, setShowOrderSummary] = React.useState(false);
  const [salesValue, setSalesValue] = React.useState("$32,393");
  const [customerValue, setCustomerValue] = React.useState("4,536");
  const [orderValue, setOrderValue] = React.useState("2,345");
  const [salesValueChange, setSalesValueChange] = React.useState("+20.5%");
  const [customerValueChange, setCustomerValueChange] = React.useState("-1.2%");
  const [orderValueChange, setOrderValueChange] = React.useState("+300.4%");

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

  React.useEffect(() => {
    fetchCustomerData();
    fetchOrderData();
  }, [customerValue, orderValue]);

  const fetchCustomerData = async () => {
    const customerModels = await DataStore.query(Customer);
    setCustomerValue(customerModels.length);
    calculateCustomerValueChange();
    console.log("triggered");
  };

  const fetchOrderData = async () => {
    const orderModels = await DataStore.query(Order);
    setOrderValue(orderModels.length);
    calculateOrderValueChange();
    calculateTotalSales(orderModels);
  };

  const calculateTotalSales = (models) => {
    let totalSales = 0;
    models.forEach((model) => {
      totalSales += model.totalAmount;
    });
    setSalesValue(`$${totalSales}`);
    calculateSalesValueChange();
  };

  const calculateCustomerValueChange = () => {
    const change = Math.floor(Math.random() * 10);
    const isPositive = Math.floor(Math.random() * 2);
    if (isPositive) {
      setCustomerValueChange(`+${change}%`);
    } else {
      setCustomerValueChange(`-${change}%`);
    }
  };

  const calculateOrderValueChange = () => {
    const change = Math.floor(Math.random() * 10);
    const isPositive = Math.floor(Math.random() * 2);
    if (isPositive) {
      setOrderValueChange(`+${change}%`);
    } else {
      setOrderValueChange(`-${change}%`);
    }
  };

  const calculateSalesValueChange = () => {
    const change = Math.floor(Math.random() * 10);
    const isPositive = Math.floor(Math.random() * 2);
    if (isPositive) {
      setSalesValueChange(`+${change}%`);
    } else {
      setSalesValueChange(`-${change}%`);
    }
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
              onClick={() => {
                setShowProductCreateForm(!showProductCreateForm);
                setShowCustomerCreateForm(false);
                setShowOrderCreateForm(false);
              }}
            >
              Add Product
            </Button>
            <Button
              style={{
                width: "11rem",
                height: "3rem",
                marginTop: "2rem",
              }}
              onClick={() => {
                setShowCustomerCreateForm(!showCustomerCreateForm);
                setShowProductCreateForm(false);
                setShowOrderCreateForm(false);
              }}
            >
              Add Customer
            </Button>
            <Button
              style={{
                width: "11rem",
                height: "3rem",
                marginTop: "2rem",
              }}
              onClick={() => {
                setShowOrderCreateForm(!showOrderCreateForm);
                setShowCustomerCreateForm(false);
                setShowProductCreateForm(false);
              }}
            >
              Add Order
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
              <Button
                style={{
                  width: "6rem",
                  height: "1.5rem",
                  border: "1px solid black",
                }}
                onClick={() => {
                  fetchCustomerData();
                  fetchOrderData();
                }}
              >
                Refresh
              </Button>
              <Stat
                lable={"Total Sales"}
                value={salesValue}
                percentageChange={salesValueChange}
                padding={"1rem 0 1rem 0"}
              />
              <Stat
                lable={"Total Customers"}
                value={customerValue}
                percentageChange={customerValueChange}
                padding={"1rem 0 1rem 0"}
              />
              <Stat
                lable={"Total Orders"}
                value={orderValue}
                percentageChange={orderValueChange}
                padding={"1rem 0 1rem 0"}
              />
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
            {showProductCreateForm && <ProductCreateForm />}
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
            {showOrderCreateForm && (
              <OrderCreateForm border={"2px solid black"} />
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
