import { Button, Link } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";

export const inspectionReportColumns = [
  {
    name: "Farmer ID",
    selector: "farmerId",
    sortable: true,
    width: "100px",
  },
  {
    name: "Name",
    selector: "farmerFirstName",
    cell: ({ farmerFirstName, farmerLastName }) => `${farmerFirstName} ${farmerLastName}`,
  },
  {
    name: "Cooperative",
    selector: "cooperativeName",
  },
  {
    name: "CC Name",
    selector: "collectionCenterName",
  },
  {
    name: "Last Approved Certification",
    selector: "version",
    cell: ({ prevReportId }) =>
      prevReportId ? (
        <NextLink
          href={`/farmer-certification/inspection-report/show?pid=${prevReportId}`}
          passHref={true}
        >
          <Button variant="outline" variantColor="blue" size="xs" as={Link}>
            View Report
          </Button>
        </NextLink>
      ) : (
        "No Previous Report"
      ),
  },
  {
    name: "Pending Reports",
    selector: "isReportFinalized",
    width: "160px",
    cell: ({ isReportFinalized, reportId, prevReportId }) =>
      isReportFinalized ? (
        "No Pending Report"
      ) : (
        <NextLink
          href={`/farmer-certification/inspection-report/show?cid=${reportId}&pid=${prevReportId}`}
          passHref={true}
        >
          <Button variant="outline" variantColor="blue" size="xs" as={Link}>
            Manage Report
          </Button>
        </NextLink>
      ),
  },
];
