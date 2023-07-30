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
import { Product } from "../../models";
import { useState, useEffect } from "react";
import UpdateProduct from "../UpdateProduct/UpdateProduct";
import SideBar from "../../ui-components/SideBar";
import { useNavigate } from "react-router";

function ProductSummary() {
  const [products, setProducts] = useState([]);
  const [showDeleteSuccessFullAlert, setShowDeleteSuccessFullAlert] =
    useState(false);
  const [showDeleteUnsuccessFullAlert, setShowDeleteUnsuccessFullAlert] =
    useState(false);
  const [showProductUpdateForm, setShowProductUpdateForm] = useState(false);
  const [product, setProduct] = useState({});
  const Navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const products = await DataStore.query(Product);
    setProducts(products);
  };

  const handleProductUpdate = (id) => async (e) => {
    setShowProductUpdateForm(true);
    await DataStore.query(Product, id)
      .then((res) => {
        setProduct(res);
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleProductDelete = (id) => async (e) => {
    const model = await DataStore.query(Product, id);
    DataStore.delete(model)
      .then(() => {
        setShowDeleteSuccessFullAlert(true);
        fetchProducts();
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
        Product deleted successfully
      </Alert>
    );
  };

  const showUnsuccessfullDeleteAlert = () => {
    return (
      <Alert type="error" dismissible={true}>
        Product deletion failed
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
          Product Summary
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
              <TableCell as="th">Product ID</TableCell>
              <TableCell as="th">Product Name</TableCell>
              <TableCell as="th">Product Price</TableCell>
              <TableCell as="th">Category</TableCell>
              <TableCell as="th">Description</TableCell>
              <TableCell as="th">Tags</TableCell>
              <TableCell as="th">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name ? product.name : "NA"}</TableCell>
                <TableCell>{product.price ? product.price : "NA"}</TableCell>
                <TableCell>
                  {product.category ? product.category : "NA"}
                </TableCell>
                <TableCell>
                  {product.description ? product.description : "NA"}
                </TableCell>
                <TableCell>
                  {product.productTags ? product.productTags : "NA"}
                </TableCell>
                <TableCell>
                  <Button
                    style={{
                      marginRight: "0.5rem",
                      width: "5rem",
                      height: "2rem",
                      border: "none",
                    }}
                    onClick={handleProductUpdate(product.id)}
                  >
                    Update
                  </Button>
                  <Button
                    style={{
                      width: "5rem",
                      height: "2rem",
                      border: "none",
                    }}
                    onClick={handleProductDelete(product.id)}
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
            display: showProductUpdateForm ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {showProductUpdateForm && (
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
              <UpdateProduct
                Product={product}
                closeModel={() => setShowProductUpdateForm(false)}
              />
            </Card>
          )}
        </View>
      </View>
    </View>
  );
}

export default ProductSummary;
