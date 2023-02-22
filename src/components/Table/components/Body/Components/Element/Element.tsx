import React from "react";
import { IElement } from "../../../../../../interafaces/blocks";
import { handleTableElement } from "./utils";

const Element: React.FC<IElement> = ({ data, column, index }) => {
  const callHandleTableElement = () => {
    return handleTableElement({ data, column, index });
  };

  const detail = React.useMemo(callHandleTableElement, [data, column, index]);

  const accessKey = React.useMemo(() => {
    if (column.preventClick) {
      return "PreventClick" + " " + index;
    }
    let str = column.name;
    if (str.indexOf(" ") !== -1) {
      str = "";
      for (let i = 0; i < column.name.length; i++) {
        if (column.name[i] !== " ") str += column.name[i];
      }
    }
    return str + " " + index;
  }, [column.name, index, column.preventClick]);

  const inlineStyles = React.useMemo(() => {
    let styles: React.CSSProperties = {};
    if (column.alignment) styles["textAlign"] = column.alignment;
    if (column.wrapCellContent === false) styles["whiteSpace"] = "nowrap";
    return styles;
  }, [column.minWidth, column.alignment, column.wrapCellContent]);

  return (
    <td style={inlineStyles} accessKey={accessKey}>
      {detail}
    </td>
  );
};

export default React.memo(Element);
