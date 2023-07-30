import React from "react";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Heading,
} from "@aws-amplify/ui-react";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { AuditLogs } from "../../models";
import { useState, useEffect } from "react";

function ActivityLogs({ sort }) {
  const [activityLogs, setActivityLogs] = useState([]);

  const fetchActivityLogs = async () => {
    const activityLogs = await DataStore.query(
      AuditLogs,
      Predicates.ALL,
      {
        sort: (s) => s.createdAt(SortDirection.DESCENDING),
      },
      {
        page: 0,
        limit: 10,
      }
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    setActivityLogs(activityLogs);
  };

  useEffect(() => {
    fetchActivityLogs();
  }, []);

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
          maxHeight: "20rem",
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
            <TableCell as="th">Operation Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activityLogs.map((activityLog) => (
            <TableRow key={activityLog.id}>
              <TableCell>{activityLog ? activityLog.model : "NA"}</TableCell>
              <TableCell>{activityLog ? activityLog.opType : "NA"}</TableCell>
              <TableCell>
                {activityLog.createdAt ? activityLog.createdAt : "NA"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default ActivityLogs;
