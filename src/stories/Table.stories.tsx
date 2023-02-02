import { Table as TableStory } from "../components";
import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import data from "../constansts/sampleData.json";
import Columns from "../constansts";
export default {
  title: "My Components/Table",
  component: TableStory,
} as ComponentMeta<typeof TableStory>;

const Template: ComponentStory<typeof TableStory> = (args) => (
  <TableStory {...args} />
);

export const Table = Template.bind({});
Table.args = {
  columns: Columns,
  data,
  uniqueDataField: "id",
  numberOfRows: 20,
  usePagination: true,
  canSelectRows: false,
  handleRowSelection: (rows) => console.log(rows),
  styleVariables: { "font-family": "Georgia, serif" },
  handleRowClick: (row) => console.log(row),
};
