import React from "react";
export const Columns = [
  {
    name: "Id",
    accessor: "id",
  },
  {
    name: "Name",
    accessor: (row: any) => row.firstName + " " + row.lastName,
    cell: (row: any) => {
      return <>{row.firstName + " " + row.lastName}</>;
    },
    searchable: true,
    sortable: true,
  },
  {
    name: "age",
    accessor: (row: any) => row.age,
    filter: true,
    searchable: true,
  },
  {
    name: "Birth Date",
    cell: (row: any) => <div>{row.birthDate}</div>,
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
  },
  {
    name: "Company Name",
    accessor: "company.name",
  },
];
