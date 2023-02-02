import { IAction, IAppState } from "../../../../../../interafaces/stateManager";
import { ActionTypes } from "../../../../../../store/actions";
import {
  destructureObject,
  updateObject,
} from "../../../../utils/objectUtilities";
import { sortingHandler } from "../../../Head/components/Element/utils";

interface IProps {
  search: IAppState["search"];
  dispatch: React.Dispatch<IAction>;
  searchAccessors: IAppState["searchAccessors"];
  selectedFilter: IAppState["selectedFilter"];
  results: IAppState["results"];
  selectedSort: IAppState["selectedSort"];
}

export const handleSearchResults = ({
  search,
  dispatch,
  searchAccessors,
  selectedFilter,
  results,
  selectedSort,
}: IProps) => {
  const { filter, option } = selectedFilter;

  let keys = [];

  if (filter !== "default" && option !== "default") {
    keys = [filter, option, search || "original", "rows"];
  } else {
    keys = ["default", "default", search || "original", "rows"];
  }

  const sortEnabled =
    selectedSort.order !== "default" && selectedSort.option !== "default";

  //cached results
  const existingSearchResults: IAppState["results"] = destructureObject({
    object: results,
    keys: keys,
  });

  if (existingSearchResults) {
    console.log("returning cached rows", existingSearchResults);
    if (sortEnabled)
      sortingHandler({
        selectedSort,
        results,
        selectedFilter,
        search,
        dispatch,
      });
    else
      dispatch({
        type: ActionTypes.SET_CURRENT_ROWS,
        payload: existingSearchResults,
      });
    return;
  }

  let editedSearch = search.toLowerCase().replaceAll("+", "\\+");
  let destructureKeys = [...keys];
  destructureKeys[2] = "original";
  const filteredResults = destructureObject({
    object: results,
    keys: destructureKeys,
  });

  if (!Array.isArray(filteredResults)) return;
  //filtering
  let newResults = filteredResults.filter((row) => {
    for (let i = 0; i < searchAccessors.length; i++) {
      //stored accessor
      let accessor = searchAccessors[i];
      // skipped iteration in invalid accessor
      if (!accessor) continue;
      //initialised value
      let value = "";
      //got value
      if (typeof accessor === "function") value = accessor(row);
      else value = row[accessor];
      //converting text to lowercase
      value = value.toString().toLowerCase().trim();
      // setting up regex
      let regex = new RegExp(editedSearch);
      //matching regex
      if (value.match(regex)) {
        return row;
      }
    }
  });
  //updating new search results
  let updatedResults = updateObject({
    object: results,
    keys: keys,
    newValue: newResults,
  });
  //updating context
  dispatch({
    type: ActionTypes.UPDATE_RESULTS,
    payload: updatedResults,
  });

  if (sortEnabled)
    sortingHandler({
      selectedSort,
      results: updatedResults,
      selectedFilter,
      search,
      dispatch,
    });
  else
    dispatch({
      type: ActionTypes.SET_CURRENT_ROWS,
      payload: newResults,
    });
};
