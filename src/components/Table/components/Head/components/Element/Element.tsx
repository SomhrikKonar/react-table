import React from "react";
import { IHeadElement } from "../../../../../../interafaces/blocks";
import styles from "./styles.module.css";
import sortIcon from "../../../../../../assests/Sort.svg";
import ascendingSortIcon from "../../../../../../assests/AscendingSort.svg";
import descendingSortIcon from "../../../../../../assests/DescendingSort.svg";
import { useStore } from "../../../../../../store/store";
import { handleSetNewSelectedSort, sortingHandler } from "./utils";
import { ActionTypes } from "../../../../../../store/actions";
const Element: React.FC<IHeadElement> = ({
  content,
  name,
  accessor,
  sortType,
}) => {
  const [{ selectedSort, results, selectedFilter, search }, dispatch] =
    useStore();
  const { option, order } = selectedSort;

  const icon =
    option === name
      ? order === "descending"
        ? descendingSortIcon
        : order === "ascending"
        ? ascendingSortIcon
        : sortIcon
      : sortIcon;

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const newSelectedSort = handleSetNewSelectedSort({
      option,
      order,
      accessor,
      name,
      sortType,
    });
    dispatch({
      type: ActionTypes.UPDATE_PROPS,
      payload: { selectedSort: newSelectedSort },
    });
    sortingHandler({
      selectedFilter,
      selectedSort: newSelectedSort,
      search,
      results,
      dispatch,
    });
  };

  return (
    <th>
      <div className={styles.headElementContainer}>
        <p>{content}</p>
        <button onClick={handleOnClick}>
          <img src={icon} alt="sort-icon" height={"12px"} />
        </button>
      </div>
    </th>
  );
};

export default React.memo(Element);
