import React from "react";
import { IHeadElement } from "../../../../../../interafaces/blocks";

const Element: React.FC<IHeadElement> = ({ content, sortable }) => {
  return (
    <th>
      {content}
      {/* {sortable ? <div>hi</div> : ""} */}
    </th>
  );
};

export default React.memo(Element);
