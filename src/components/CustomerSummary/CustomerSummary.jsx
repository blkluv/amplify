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
import { Customer } from "../../models";
import { useState, useEffect } from "react";
import UpdateCustomer from "../UpdateCustomer/UpdateCustomer";
import SideBar from "../../ui-components/SideBar";
import { useNavigate } from "react-router";

function CustomerSummary() {
  const [customers, setCustomers] = useState([]);
  const [showDeleteSuccessFullAlert, setShowDeleteSuccessFullAlert] =
    useState(false);
  const [showDeleteUnsuccessFullAlert, setShowDeleteUnsuccessFullAlert] =
    useState(false);
  const [showCustomerUpdateForm, setShowCustomerUpdateForm] = useState(false);
  const [customer, setCustomer] = useState({});

  const Navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const customers = await DataStore.query(Customer);
    setCustomers(customers);
  };

  const handleCustomerUpdate = (id) => async (e) => {
    setShowCustomerUpdateForm(true);
    await DataStore.query(Customer, id)
      .then((res) => {
        setCustomer(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCustomerDelete = (id) => async (e) => {
    const model = await DataStore.query(Customer, id);
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
        Customer deleted successfully
      </Alert>
    );
  };

  const showUnsuccessfullDeleteAlert = () => {
    return (
      <Alert type="error" dismissible={true}>
        Customer deletion failed
      </Alert>
    );
  };

  const handleHomeButton = () => Navigate("/");
  const handleCustomerSummaryButton = () => Navigate("/customers");
  const handleProductSummaryButton = () => Navigate("/products");
  const handleOrderSummaryButton = () => Navigate("/orders");
  const handleMarketingButton = () => Navigate("/marketing");
  const handleStorageButton = () => Navigate("/storage");

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
          Customer Summary
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
              <TableCell as="th">Customer ID</TableCell>
              <TableCell as="th">Customer Name</TableCell>
              <TableCell as="th">Customer Email</TableCell>
              <TableCell as="th">Billing Address</TableCell>
              <TableCell as="th">Shipping Address</TableCell>
              <TableCell as="th">Date of Birth</TableCell>
              <TableCell as="th">Gender</TableCell>
              <TableCell as="th">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  {customer.billingAddress
                    ? customer.billingAddress.city
                    : "NA"}
                </TableCell>
                <TableCell>
                  {customer.shippingAddress
                    ? customer.shippingAddress.city
                    : "NA"}
                </TableCell>
                <TableCell>
                  {customer.dateOfBirth ? customer.dateOfBirth : "NA"}
                </TableCell>
                <TableCell>
                  {customer.gender ? customer.gender : "NA"}
                </TableCell>
                <TableCell>
                  <Button
                    style={{
                      marginRight: "0.5rem",
                      width: "5rem",
                      height: "2rem",
                      border: "none",
                    }}
                    onClick={handleCustomerUpdate(customer.id)}
                  >
                    Update
                  </Button>
                  <Button
                    style={{
                      width: "5rem",
                      height: "2rem",
                      border: "none",
                    }}
                    onClick={handleCustomerDelete(customer.id)}
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
            display: showCustomerUpdateForm ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {showCustomerUpdateForm && (
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
              <UpdateCustomer
                Customer={customer}
                closeModel={() => setShowCustomerUpdateForm(false)}
              />
            </Card>
          )}
        </View>
      </View>
    </View>
  );
}

export default CustomerSummary;
