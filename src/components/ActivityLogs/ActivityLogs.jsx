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

function ActivityLogs() {
  return (
    <>
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
        Activity Logs
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
            <TableCell as="th">Model Name</TableCell>
            <TableCell as="th">Operation Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell as="td">{}</TableCell>
            <TableCell as="td">{}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}

export default ActivityLogs;
