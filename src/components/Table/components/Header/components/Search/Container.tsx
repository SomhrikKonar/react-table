import React from "react";
import { TColumn } from "../../../../../../interafaces/units";
import { ActionTypes } from "../../../../../../store/actions";
import { useStore } from "../../../../../../store/store";
import { handleSearchResults } from "./utils";
import View from "./View";

export const Container = () => {
  const [
    { results, columns, selectedSort, searchAccessors, selectedFilter, search },
    dispatch,
  ] = useStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionTypes.SET_SEARCH, payload: e.target.value });
  };

  React.useEffect(() => {
    let searchAccessors: TColumn["accessor"][] = [];
    columns.forEach((column) => {
      if (column.searchable) {
        searchAccessors.push(column.accessor);
      }
    });
    dispatch({
      type: ActionTypes.SET_SEARCH_ACCESSORS,
      payload: searchAccessors,
    });
  }, []);

  React.useEffect(() => {
    let timestamp = setTimeout(() => {
      handleSearchResults({
        search,
        dispatch,
        searchAccessors,
        selectedFilter,
        results,
        selectedSort,
      });
    }, 250);
    return () => {
      clearTimeout(timestamp);
    };
  }, [search]);

  return <View search={search} handleSearch={handleSearch} />;
};
