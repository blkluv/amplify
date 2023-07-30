import { View } from "@aws-amplify/ui-react";
import React from "react";
import { useNavigate } from "react-router";
import SideBar from "../../ui-components/SideBar";

function Marketing() {
  const navigate = useNavigate();

  const handleHomeButton = () => navigate("/");
  const handleCustomerSummaryButton = () => navigate("/customers");
  const handleProductSummaryButton = () => navigate("/products");
  const handleOrderSummaryButton = () => navigate("/orders");
  const handleMarketingButton = () => navigate("/marketing");
  const handleStorageButton = () => navigate("/storage");
  const handleAnalyticsButton = () => navigate("/analytics");

  return (
    <>
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
      </View>
      <View>Marketing</View>
    </>
  );
}

export default Marketing;
