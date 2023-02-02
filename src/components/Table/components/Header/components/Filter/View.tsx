import React from "react";
import { IFilter } from "../../../../../../interafaces/blocks";
import { useStore } from "../../../../../../store/store";
import SelectInput from "./components/SelectInput";
import styles from "./styles.module.css";
import FilterIcon from "../../../../../../assests/Filter.svg";
const View: React.FC<IFilter> = ({ handleUpdateSelectedFilter }) => {
  const [{ filters, selectedFilter }] = useStore();
  const filterOptions = Object.keys(filters);
  return filterOptions.length > 0 ? (
    <div className={styles.container}>
      <SelectInput
        value={selectedFilter.filter}
        options={filterOptions}
        handleChange={handleUpdateSelectedFilter("filter")}
        icon={FilterIcon}
        defaultMessage="Click to filter"
      />
      <SelectInput
        isDisabled={selectedFilter.filter === "default"}
        value={selectedFilter.option}
        options={
          filters[selectedFilter.filter]
            ? [...filters[selectedFilter.filter].options]
            : []
        }
        handleChange={handleUpdateSelectedFilter("option")}
      />
    </div>
  ) : (
    <></>
  );
};

export default React.memo(View);
