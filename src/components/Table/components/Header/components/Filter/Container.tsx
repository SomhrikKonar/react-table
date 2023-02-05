import React, { useEffect } from "react";
import { TFilters } from "../../../../../../interafaces/units";
import { ActionTypes } from "../../../../../../store/actions";
import { useStore } from "../../../../../../store/store";
import { accessKeys } from "../../../../utils/accessKey";
import {
  handleResetingSelectedFilter,
  handleUpdateSelectedFilter,
} from "./utils";
import View from "./View";

export const Container = () => {
  const [
    {
      columns,
      original,
      selectedFilter,
      filters,
      search,
      searchAccessors,
      results,
      selectedSort,
    },
    dispatch,
  ] = useStore();

  useEffect(() => {
    let filters: TFilters = {};
    columns.forEach((column) => {
      if (column.filter) {
        filters[column.name] = {
          accessor: column.accessor,
          options: new Set([]),
        };
      }
    });
    original.forEach((row) => {
      Object.entries(filters).forEach(([key, value]) => {
        if (!value.accessor) return;
        let optionValue = accessKeys({
          accessor: value.accessor,
          data: row,
        }).toString();
        if (optionValue !== "--") {
          filters[key].options.add(optionValue);
        }
      });
    });
    Object.entries(filters).map(([key, value]) => {
      if (value.options.size <= 0) {
        delete filters[key];
      }
    });

    dispatch({ type: ActionTypes.SET_FILTERS, payload: filters });

    //new Selected filter/option
    let latestFilterValues = { ...selectedFilter };
    if (filters[latestFilterValues.filter]) {
      if (
        !filters[latestFilterValues.filter].options.has(
          latestFilterValues.option
        )
      ) {
        latestFilterValues["option"] = "default";
      }
    } else {
      latestFilterValues = { filter: "default", option: "default" };
    }

    //resetting results
    let newObj = {
      default: { default: { original: { rows: original, sortedResults: {} } } },
    };

    //updating current results
    handleResetingSelectedFilter({
      latestFilterValues,
      dispatch,
      original,
      filters,
      search,
      searchAccessors,
      results: { ...newObj },
      selectedSort,
    });
  }, [columns, original]);

  const updateSelectedFilter =
    (state: "filter" | "option") => (e: React.MouseEvent<HTMLDivElement>) => {
      handleUpdateSelectedFilter({
        e,
        state,
        selectedFilter,
        dispatch,
        original,
        filters,
        search,
        searchAccessors,
        results,
        selectedSort,
      });
    };

  return <View handleUpdateSelectedFilter={updateSelectedFilter} />;
};
