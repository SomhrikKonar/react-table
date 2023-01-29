import { IAction, IAppState } from "../../../../../../interafaces/stateManager";
import { TData } from "../../../../../../interafaces/units";
import { ActionTypes } from "../../../../../../store/actions";
import { handleSearchResults } from "../Search/utils";

interface IProps {
  e: React.ChangeEvent<HTMLSelectElement>;
  filters: IAppState["filters"];
  state: "filter" | "option";
  search: IAppState["search"];
  dispatch: React.Dispatch<IAction>;
  searchResults: IAppState["searchResults"];
  original: IAppState["original"];
  searchAccessors: IAppState["searchAccessors"];
  selectedFilter: IAppState["selectedFilter"];
  filteredResults: IAppState["filteredResults"];
}
export const handleUpdateSelectedFilter = ({
  e,
  selectedFilter,
  filteredResults,
  dispatch,
  original,
  state,
  filters,
  search,
  searchAccessors,
  searchResults,
}: IProps) => {
  e.stopPropagation();
  let latestFilterValues = { ...selectedFilter, [state]: e.target.value };
  if (state === "filter") latestFilterValues["option"] = "default";
  const filterEnabled =
    latestFilterValues.filter !== "default" &&
    latestFilterValues.option !== "default";
  let newCurrentRows: TData[] = [];
  let newFilteredResultsObject: IAppState["filteredResults"] = {
    ...filteredResults,
  };
  if (filterEnabled) {
    if (
      filteredResults[latestFilterValues.filter] &&
      filteredResults[latestFilterValues.filter][latestFilterValues.option]
    ) {
      newCurrentRows =
        filteredResults[latestFilterValues.filter][latestFilterValues.option];
    } else {
      let newFilteredResults = original.filter((row) => {
        let accessor = filters[selectedFilter.filter].accessor;
        let value: string | number = "";
        if (!accessor) return;
        value = typeof accessor === "string" ? row[accessor] : accessor(row);
        if (value.toString() === latestFilterValues.option) return row;
      });
      newCurrentRows = newFilteredResults;

      if (!newFilteredResultsObject[latestFilterValues.filter])
        newFilteredResultsObject[latestFilterValues.filter] = {};

      newFilteredResultsObject[latestFilterValues.filter][
        latestFilterValues.option
      ] = newFilteredResults;

      dispatch({
        type: ActionTypes.SET_FILTERED_RESULTS,
        payload: newFilteredResultsObject,
      });
    }
  } else {
    newCurrentRows = original;
  }
  if (search) {
    handleSearchResults({
      search,
      dispatch,
      searchResults,
      original,
      searchAccessors,
      selectedFilter: latestFilterValues,
      filteredResults: newFilteredResultsObject,
    });
  } else {
    dispatch({
      type: ActionTypes.SET_CURRENT_ROWS,
      payload: newCurrentRows,
    });
  }
  dispatch({
    type: ActionTypes.SELECT_FILTERS,
    payload: latestFilterValues,
  });
};
