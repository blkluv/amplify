import {
  Heading,
  View,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Text,
  Card,
} from "@aws-amplify/ui-react";
import React from "react";
import { useNavigate } from "react-router";
import SideBar from "../../ui-components/SideBar";
import { Storage } from "aws-amplify";
import { useEffect, useState } from "react";
import { StorageManager } from "@aws-amplify/ui-react-storage";

function StorageSummary() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [totalSpaceOccupied, setTotalSpaceOccupied] = useState(0);
  const [totalNumberOfFiles, setTotalNumberOfFiles] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [totalOtherFiles, setTotalOtherFiles] = useState(0);
  const [showUploadContainer, setShowUploadContainer] = useState(false);

  const handleHomeButton = () => navigate("/");
  const handleCustomerSummaryButton = () => navigate("/customers");
  const handleProductSummaryButton = () => navigate("/products");
  const handleOrderSummaryButton = () => navigate("/orders");
  const handleMarketingButton = () => navigate("/marketing");
  const handleStorageButton = () => navigate("/storage");
  const handleAnalyticsButton = () => navigate("/analytics");

  const calculateTotalSpaceOccupied = (files) => {
    let totalSpaceOccupied = 0;
    files.forEach((file) => {
      totalSpaceOccupied += file.size;
    });
    setTotalSpaceOccupied(convertBytesToMegabytes(totalSpaceOccupied));
  };

  const calculateTotalNumberOfFiles = (files) => {
    setTotalNumberOfFiles(files.length);
  };

  const calculateTotalImages = (files) => {
    let totalImages = 0;
    files.forEach((file) => {
      if (file.key.endsWith(".jpg") || file.key.endsWith(".png")) {
        totalImages += 1;
      }
    });
    setTotalImages(totalImages);
  };

  const calculateTotalVideos = (files) => {
    let totalVideos = 0;
    files.forEach((file) => {
      if (file.key.endsWith(".mp4") || file.key.endsWith(".webm")) {
        totalVideos += 1;
      }
    });
    setTotalVideos(totalVideos);
  };

  const calculateTotalOtherFiles = (files) => {
    let totalOtherFiles = 0;
    files.forEach((file) => {
      if (
        !file.key.endsWith(".mp4") &&
        !file.key.endsWith(".webm") &&
        !file.key.endsWith(".jpg") &&
        !file.key.endsWith(".png")
      ) {
        totalOtherFiles += 1;
      }
    });
    setTotalOtherFiles(totalOtherFiles);
  };

  const convertBytesToMegabytes = (bytes) => {
    let megabytes = bytes / 1000000;
    return megabytes.toFixed(2);
  };

  const sortFilesWithMostRecentFirst = (files) => {
    files.sort((a, b) => {
      return new Date(b.lastModified) - new Date(a.lastModified);
    });
  };

  useEffect(() => {
    Storage.list("", { level: "public" })
      .then(({ results }) => {
        sortFilesWithMostRecentFirst(results);
        calculateTotalSpaceOccupied(results);
        calculateTotalNumberOfFiles(results);
        calculateTotalImages(results);
        calculateTotalVideos(results);
        calculateTotalOtherFiles(results);
        setFiles(results);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleFileDownload = (key) => async (e) => {
    const signedURL = await Storage.get(key, { level: "public" });
    window.open(signedURL, "_blank");
  };

  const handleFileDelete = (key) => async (e) => {
    await Storage.remove(key, { level: "public" })
      .then(() => {
        Storage.list("", { level: "public" })
          .then(({ results }) => {
            setFiles(results);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const processFile = async ({ file }) => {
    const fileExtension = file.name.split(".").pop();

    return file
      .arrayBuffer()
      .then((filebuffer) => window.crypto.subtle.digest("SHA-1", filebuffer))
      .then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((a) => a.toString(16).padStart(2, "0"))
          .join("");
        return { file, key: `${hashHex}.${fileExtension}` };
      });
  };

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
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
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
            Storage Summary
          </Heading>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "1rem 0 1rem 0",
            }}
          >
            <Text
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "left",
              }}
            >
              Total Space Occupied: {totalSpaceOccupied} MB
            </Text>
            <Text
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "left",
              }}
            >
              Total Number of Files: {totalNumberOfFiles}
            </Text>
            <Text
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "left",
              }}
            >
              Total Images: {totalImages}
            </Text>
            <Text
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "left",
              }}
            >
              Total Videos: {totalVideos}
            </Text>
            <Text
              style={{
                marginBottom: "1rem",
                display: "flex",
                justifyContent: "left",
              }}
            >
              Total Other Files: {totalOtherFiles}
            </Text>
          </View>
          <Button
            style={{
              marginBottom: "1rem",
              width: "10rem",
              height: "2.5rem",
            }}
            onClick={() => setShowUploadContainer(!showUploadContainer)}
          >
            Upload Files
          </Button>
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
                <TableCell as="th">File Key</TableCell>
                <TableCell as="th">File Size</TableCell>
                <TableCell as="th">Last Modified By</TableCell>
                <TableCell as="th">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file, index) => (
                <TableRow key={index}>
                  <TableCell>{file.key}</TableCell>
                  <TableCell>{`${convertBytesToMegabytes(
                    file.size
                  )} MB`}</TableCell>
                  <TableCell>{file.lastModified.toString()}</TableCell>
                  <TableCell>
                    <Button
                      style={{
                        marginRight: "0.5rem",
                        width: "5rem",
                        height: "2rem",
                        border: "none",
                      }}
                      onClick={handleFileDownload(file.key)}
                    >
                      View
                    </Button>
                    <Button
                      style={{
                        width: "5rem",
                        height: "2rem",
                        border: "none",
                      }}
                      onClick={handleFileDelete(file.key)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </View>
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
            display: showUploadContainer ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {showUploadContainer && (
            <Card variation="elevated">
              <View
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginBottom="1rem"
              >
                <Heading level={4}>Upload Files</Heading>
                <Button
                  style={{
                    width: "5rem",
                    height: "2rem",
                    border: "none",
                    marginLeft: "0.5rem",
                  }}
                  onClick={() => setShowUploadContainer(false)}
                >
                  Close
                </Button>
              </View>
              <Text
                style={{
                  display: "flex",
                  justifyContent: "left",
                }}
              >
                You can upload upto 5 files having less than 10MB file size.{" "}
              </Text>
              <Text
                style={{
                  marginBottom: ".5rem",
                  display: "flex",
                  justifyContent: "left",
                }}
              >
                Accepted file types are: .gif, .bmp, .doc, .jpeg, .jpg, .png,
                .mp4, .webm
              </Text>
              <StorageManager
                acceptedFileTypes={[
                  ".gif",
                  ".bmp",
                  ".doc",
                  ".jpeg",
                  ".jpg",
                  "image/png",
                  "video/*",
                ]}
                accessLevel="public"
                maxFileCount={5}
                maxFileSize={10000000}
                isResumable
                processFile={processFile}
              />
            </Card>
          )}
        </View>
      </View>
    </>
  );
}

export default StorageSummary;
