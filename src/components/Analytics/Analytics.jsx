import React from "react";
import { View } from "@aws-amplify/ui-react";
import SideBar from "../../ui-components/SideBar";
import { useNavigate } from "react-router";

function Analytics() {
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
      <View>Analytics</View>
    </>
  );
}

export default Analytics;
