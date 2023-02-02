import React from "react";
import { useStore } from "../../../../store/store";
import { Element } from "./components/Element";
const Head: React.FC = () => {
  const [{ columns, current }] = useStore();

  return (
    <thead>
      <tr>
        {columns.map(
          ({ name, hideHeader, headerCell, sortable, sortType, accessor }) =>
            sortable && accessor ? (
              <Element
                content={
                  hideHeader ? "" : headerCell ? headerCell(current) : name
                }
                sortType={sortType || "string"}
                name={name}
                key={name}
                accessor={accessor}
              />
            ) : (
              <th key={name}>
                <div>
                  {hideHeader ? "" : headerCell ? headerCell(current) : name}
                </div>
              </th>
            )
        )}
      </tr>
    </thead>
  );
};

export default React.memo(Head);
