import { IAction, IAppState } from "../../../../../../interafaces/stateManager";
import { TData } from "../../../../../../interafaces/units";
import { ActionTypes } from "../../../../../../store/actions";
import {
  destructureObject,
  updateObject,
} from "../../../../utils/objectUtilities";
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
  results: IAppState["results"];
}
export const handleUpdateSelectedFilter = ({
  e,
  selectedFilter,
  dispatch,
  original,
  state,
  filters,
  search,
  searchAccessors,
  searchResults,
  results,
}: IProps) => {
  e.stopPropagation();
  let latestFilterValues = { ...selectedFilter, [state]: e.target.value };
  if (state === "filter") latestFilterValues["option"] = "default";

  const filterEnabled =
    latestFilterValues.filter !== "default" &&
    latestFilterValues.option !== "default";

  let newCurrentRows: TData[] = [];

  let newResultsObject: IAppState["results"] = {
    ...results,
  };

  if (filterEnabled) {
    //check cached data
    let cachedRows: IAppState["current"] | undefined = destructureObject({
      object: newResultsObject,
      keys: [
        latestFilterValues.filter,
        latestFilterValues.option,
        "original",
        "rows",
      ],
    });
    if (cachedRows) {
      newCurrentRows = cachedRows;
    } else {
      let newFilteredResults = original.filter((row) => {
        let accessor = filters[selectedFilter.filter].accessor;
        let value: string | number = "";
        if (!accessor) return;
        value = typeof accessor === "string" ? row[accessor] : accessor(row);
        if (value.toString() === latestFilterValues.option) return row;
      });
      newCurrentRows = newFilteredResults;
      newResultsObject = updateObject({
        object: results,
        newValue: newCurrentRows,
        keys: [
          latestFilterValues.filter,
          latestFilterValues.option,
          "original",
          "rows",
        ],
      });
      dispatch({
        type: ActionTypes.UPDATE_RESULTS,
        payload: newResultsObject,
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
      results: newResultsObject,
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
