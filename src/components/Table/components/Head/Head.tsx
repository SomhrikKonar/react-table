import React from "react";
import { useStore } from "../../../../store/store";
import { Element } from "./components/Element";

const Head: React.FC = () => {
  const [{ columns, current }] = useStore();

  return (
    <thead>
      <tr>
        {columns.map(({ name, hideHeader, headerCell, sortable }) => (
          <Element
            content={hideHeader ? "" : headerCell ? headerCell(current) : name}
            sortable={sortable}
            key={name}
          />
        ))}
      </tr>
    </thead>
  );
};

export default React.memo(Head);
