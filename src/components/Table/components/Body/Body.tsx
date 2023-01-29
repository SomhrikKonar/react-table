import React from "react";
import { TData } from "../../../../interafaces/units";
import { useStore } from "../../../../store/store";
import { Row } from "./Components/Rows";

const Body: React.FC = () => {
  const [
    { current, uniqueDataField, maxEntryIndex, minEntryIndex, usePagination },
  ] = useStore();

  const handleKey = (row: TData, index: number) => {
    let key;
    if (uniqueDataField) {
      if (typeof uniqueDataField === "function") {
        key = uniqueDataField(row);
      } else {
        key = row[uniqueDataField];
      }
    } else {
      key = index;
    }
    if (key === undefined || key === null) key = index;
    return key;
  };

  return (
    <tbody>
      {current.map(
        (row, index) =>
          ((index >= minEntryIndex &&
            index <= maxEntryIndex &&
            usePagination) ||
            !usePagination) && (
            <Row key={handleKey(row, index)} index={index} data={row} />
          )
      )}
    </tbody>
  );
};

export default React.memo(Body);
