import React from "react";
import { IFilter } from "../../../../../../interafaces/blocks";
import { useStore } from "../../../../../../store/store";
import styles from "./styles.module.css";
const View: React.FC<IFilter> = ({ handleUpdateSelectedFilter }) => {
  const [{ filters, selectedFilter }] = useStore();
  const filterOptions = Object.keys(filters);
  return filterOptions.length > 0 ? (
    <div className={styles.container}>
      <select
        value={selectedFilter.filter}
        onChange={handleUpdateSelectedFilter("filter")}
      >
        <option value="default">All</option>
        {filterOptions.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      <select
        onChange={handleUpdateSelectedFilter("option")}
        value={selectedFilter.option}
      >
        <option value="default">All</option>
        {filters[selectedFilter.filter] &&
          [...filters[selectedFilter.filter].options].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(View);
