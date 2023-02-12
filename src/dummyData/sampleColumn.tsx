import React from "react";
import { TColumn } from "../interafaces/units";
export const Columns: TColumn[] = [
  {
    name: "Id",
    accessor: "id",
    preventClick: true,
  },
  {
    name: "Name",
    accessor: (row: any) => row.firstName + " " + row.lastName,
    cell: (row: any) => {
      return <>{row.firstName + " " + row.lastName}</>;
    },
    searchable: true,
    sortable: true,
    sortType: "string",
    minWidth: "200px",
    alignment: "right",
  },
  {
    name: "age",
    accessor: (row: any) => row.age,
    filter: true,
    sortType: "number",
    searchable: true,
    sortable: true,
  },
  {
    name: "Birth Date",
    sortable: true,
    sortType: "date",
    accessor: (row: any) => row["birthDate"],
    cell: (row: any) => {
      return <div>{row.birthDate || "--"}</div>;
    },
  },
  {
    name: "Blood Group",
    accessor: "bloodGroup",
    searchable: true,
    filter: true,
  },
  {
    name: "Eye Colour",
    accessor: "eyeColor",
    searchable: true,
    filter: true,
  },
  {
    name: "University",
    accessor: "university",
    filter: true,
    wrapCellContent: false,
  },
  {
    name: "Company Name",
    accessor: "company.name",
  },
];
