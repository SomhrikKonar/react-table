import React from "react";
import { IRow } from "../../../../../../interafaces/blocks";
import { useStore } from "../../../../../../store/store";
import { Element } from "../Element";
const Row: React.FC<IRow> = ({ data, index }) => {
  const [{ columns }] = useStore();
  return (
    <tr>
      {columns.map((column) => (
        <Element index={index} key={column.name} column={column} data={data} />
      ))}
    </tr>
  );
};

export default React.memo(Row);
