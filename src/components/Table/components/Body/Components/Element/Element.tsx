import React from "react";
import { IElement } from "../../../../../../interafaces/blocks";
import { handleTableElement } from "./utils";

const Element: React.FC<IElement> = ({ data, column, index }) => {
  const callHandleTableElement = () => {
    return handleTableElement({ data, column, index });
  };
  const detail = React.useMemo(callHandleTableElement, [data, column, index]);
  return <td>{detail}</td>;
};

export default React.memo(Element);
