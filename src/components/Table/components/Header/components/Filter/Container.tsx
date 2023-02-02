import React, { useEffect } from "react";
import { TFilters } from "../../../../../../interafaces/units";
import { ActionTypes } from "../../../../../../store/actions";
import { useStore } from "../../../../../../store/store";
import { accessKeys } from "../../../../utils/accessKey";
import { handleUpdateSelectedFilter } from "./utils";
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
        let optionValue = accessKeys({ accessor: value.accessor, data: row });
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
  }, [columns, original]);

  useEffect(() => {
    let newObj = { default: { default: { original: { rows: original } } } };
    dispatch({ type: ActionTypes.UPDATE_RESULTS, payload: newObj });
  }, [original]);

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
