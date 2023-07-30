import React from "react";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  View,
  Heading,
  Button,
  Alert,
  Card,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
import { Order } from "../../models";
import { useState, useEffect } from "react";
import UpdateOrder from "../UpdateOrder/UpdateOrder";
import SideBar from "../../ui-components/SideBar";
import { useNavigate } from "react-router";
import { Analytics } from "aws-amplify";

function OrderSummary() {
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
        name: "timeOnOrderSummaryPage",
        attributes: { timeOnPage: seconds },
      });
    }

    Analytics.autoTrack("session", {
      enable: true,
      attributes: {
        page: "OrderSummary",
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

  const [orders, setOrders] = useState([]);
  const [showDeleteSuccessFullAlert, setShowDeleteSuccessFullAlert] =
    useState(false);
  const [showDeleteUnsuccessFullAlert, setShowDeleteUnsuccessFullAlert] =
    useState(false);
  const [showOrderUpdateForm, setShowOrderUpdateForm] = useState(false);
  const [order, setOrder] = useState({});
  const Navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const Orders = await DataStore.query(Order);
    setOrders(Orders);
  };

  const handleOrderUpdate = (id) => async (e) => {
    setShowOrderUpdateForm(true);
    await DataStore.query(Order, id)
      .then((res) => {
        setOrder(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOrderDelete = (id) => async (e) => {
    const model = await DataStore.query(Order, id);
    DataStore.delete(model)
      .then(() => {
        setShowDeleteSuccessFullAlert(true);
      })
      .catch((err) => {
        setShowDeleteUnsuccessFullAlert(true);
        console.log(err);
      });
  };

  setTimeout(() => {
    setShowDeleteSuccessFullAlert(false);
    setShowDeleteUnsuccessFullAlert(false);
  }, 3000);

  const showSuccessfullDeleteAlert = () => {
    return (
      <Alert
        style={{
          position: "fixed",
          top: "3%",
          left: "40%",
          width: "fit-content",
          height: "3rem",
          zIndex: "9999",
          justifyContent: "center",
          alignItems: "center",
        }}
        hasIcon={true}
        variation="success"
        isDismissible={true}
      >
        Order deleted successfully
      </Alert>
    );
  };

  const showUnsuccessfullDeleteAlert = () => {
    return (
      <Alert type="error" dismissible={true}>
        Order deletion failed
      </Alert>
    );
  };

  const handleHomeButton = () => Navigate("/");
  const handleCustomerSummaryButton = () => Navigate("/customers");
  const handleProductSummaryButton = () => Navigate("/products");
  const handleOrderSummaryButton = () => Navigate("/orders");
  const handleMarketingButton = () => Navigate("/marketing");
  const handleStorageButton = () => Navigate("/storage");
  const handleAnalyticsButton = () => Navigate("/analytics");

  return (
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
      <View>
        <Heading
          style={{
            marginBottom: "1rem",
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
            margin: "1rem 0 1rem 0",
          }}
          level={3}
        >
          Order Summary
        </Heading>
        <Table
          style={{
            marginBottom: "1rem",
            height: "fit-content",
            width: "100%",
          }}
          highlightOnHover={true}
          size={"small"}
          variation={"bordered"}
        >
          <TableHead>
            <TableRow
              style={{
                height: "1rem",
              }}
            >
              <TableCell as="th">Order ID</TableCell>
              <TableCell as="th">Order Items</TableCell>
              <TableCell as="th">Total Amount</TableCell>
              <TableCell as="th">Customer Id</TableCell>
              <TableCell as="th">Created At</TableCell>
              <TableCell as="th">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((Order, index) => (
              <TableRow key={index}>
                <TableCell>{Order.id}</TableCell>
                <TableCell>{Order.items ? Order.items : "NA"}</TableCell>
                <TableCell>
                  {Order.totalAmount ? Order.totalAmount : "NA"}
                </TableCell>
                <TableCell>
                  {Order.customerID ? Order.customerID : "NA"}
                </TableCell>
                <TableCell>
                  {Order.createdAt ? Order.createdAt : "NA"}
                </TableCell>
                <TableCell>
                  <Button
                    style={{
                      marginRight: "0.5rem",
                      width: "5rem",
                      height: "2rem",
                      border: "none",
                    }}
                    onClick={handleOrderUpdate(Order.id)}
                    data-amplify-analytics-name="OrderUpdateButton"
                  >
                    Update
                  </Button>
                  <Button
                    style={{
                      width: "5rem",
                      height: "2rem",
                      border: "none",
                    }}
                    onClick={handleOrderDelete(Order.id)}
                    data-amplify-analytics-name="OrderDeleteButton"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {showDeleteSuccessFullAlert && showSuccessfullDeleteAlert()}
        {showDeleteUnsuccessFullAlert && showUnsuccessfullDeleteAlert()}
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
            display: showOrderUpdateForm ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {showOrderUpdateForm && (
            <Card
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "9999",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <UpdateOrder
                Order={order}
                closeModel={() => setShowOrderUpdateForm(false)}
              />
            </Card>
          )}
        </View>
      </View>
    </View>
  );
}

export default OrderSummary;
