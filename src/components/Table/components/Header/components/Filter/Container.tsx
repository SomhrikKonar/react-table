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
      filteredResults,
      filters,
      search,
      searchAccessors,
      searchResults,
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

  const updateSelectedFilter =
    (state: "filter" | "option") =>
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      handleUpdateSelectedFilter({
        e,
        state,
        selectedFilter,
        filteredResults,
        dispatch,
        original,
        filters,
        search,
        searchAccessors,
        searchResults,
      });
    };

  return <View handleUpdateSelectedFilter={updateSelectedFilter} />;
};
