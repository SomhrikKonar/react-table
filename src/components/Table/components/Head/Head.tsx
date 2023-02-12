import React from "react";
import { useStore } from "../../../../store/store";
import { Element } from "./components/Element";
import styles from "./styles.module.css";
const Head: React.FC = () => {
  const [{ columns, current }] = useStore();
  const alignmentClassname = React.useCallback(
    (alignment?: "center" | "left" | "right") => {
      let name: string = "centerAligned";
      if (alignment) name = alignment + "Aligned";
      return name;
    },
    []
  );
  return (
    <thead>
      <tr>
        {columns.map(
          ({
            name,
            hideHeader,
            headerCell,
            sortable,
            sortType,
            accessor,
            alignment,
            minWidth,
          }) =>
            sortable && accessor ? (
              <Element
                content={
                  hideHeader ? "" : headerCell ? headerCell(current) : name
                }
                sortType={sortType || "string"}
                name={name}
                key={name}
                accessor={accessor}
                alignmentClassname={alignmentClassname(alignment)}
                minWidth={minWidth || "auto"}
              />
            ) : (
              <th
                key={name}
                className={styles[alignmentClassname(alignment)]}
                style={{ minWidth: minWidth || "auto" }}
              >
                {hideHeader ? "" : headerCell ? headerCell(current) : name}
              </th>
            )
        )}
      </tr>
    </thead>
  );
};

export default React.memo(Head);
