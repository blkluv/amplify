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
import CustomerUpdateForm from "../../ui-components/CustomerUpdateForm";

function CustomerSummary() {
  const [customers, setCustomers] = useState([]);
  const [showDeleteSuccessFullAlert, setShowDeleteSuccessFullAlert] =
    useState(false);
  const [showDeleteUnsuccessFullAlert, setShowDeleteUnsuccessFullAlert] =
    useState(false);
  const [showCustomerUpdateForm, setShowCustomerUpdateForm] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const customers = await DataStore.query(Customer);
    setCustomers(customers);
  };

  const handleCustomerUpdate = (id) => (e) => {
    console.log(id);
    setShowCustomerUpdateForm(true);
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

  useEffect(() => {
    const subscription = DataStore.observe(Customer).subscribe((msg) => {
      console.log(msg.model, msg.opType, msg.element);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
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
                  <Button
                    style={{
                      marginRight: "0.5rem",
                      width: "5rem",
                      height: "2rem",
                    }}
                    onClick={handleCustomerUpdate(customer.id)}
                  >
                    Update
                  </Button>
                  <Button
                    style={{
                      width: "5rem",
                      height: "2rem",
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
            <Button
              style={{
                height: "1rem",
                width: "1rem",
                border: "none",
                backgroundColor: "transparent",
              }}
              onClick={() => setShowCustomerUpdateForm(false)}
            >
              X
            </Button>
            <CustomerUpdateForm />
          </Card>
        )}
      </View>
    </>
  );
}

export default CustomerSummary;
