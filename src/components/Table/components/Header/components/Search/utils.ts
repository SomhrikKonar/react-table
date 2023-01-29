import { IAction, IAppState } from "../../../../../../interafaces/stateManager";
import { ActionTypes } from "../../../../../../store/actions";

interface IProps {
  search: IAppState["search"];
  dispatch: React.Dispatch<IAction>;
  searchResults: IAppState["searchResults"];
  original: IAppState["original"];
  searchAccessors: IAppState["searchAccessors"];
  selectedFilter: IAppState["selectedFilter"];
  filteredResults: IAppState["filteredResults"];
}

export const handleSearchResults = ({
  search,
  dispatch,
  searchResults,
  original,
  searchAccessors,
  selectedFilter,
  filteredResults,
}: IProps) => {
  const { filter, option } = selectedFilter;
  const filterEnabled = filter !== "default" && option !== "default";

  //cleared search text field
  if (!search) {
    if (!filterEnabled)
      dispatch({ type: ActionTypes.SET_CURRENT_ROWS, payload: original });
    else
      dispatch({
        type: ActionTypes.SET_CURRENT_ROWS,
        payload: filteredResults[selectedFilter.filter][selectedFilter.option],
      });
    return;
  }

  //checking for cache
  let existingSearchResults = !filterEnabled
    ? searchResults["default"]
      ? searchResults["default"]["default"]
      : undefined
    : searchResults[filter]
    ? searchResults[filter][option]
    : undefined;

  if (existingSearchResults && existingSearchResults[search]) {
    console.log("returning cached rows", existingSearchResults[search]);

    dispatch({
      type: ActionTypes.SET_CURRENT_ROWS,
      payload: existingSearchResults[search],
    });
    return;
  }

  let editedSearch = search.toLowerCase().replaceAll("+", "\\+");

  //filtering
  const parentArray = filterEnabled
    ? filteredResults[filter][option]
    : original;
  let results = parentArray.filter((row) => {
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
  let newSearchResults = searchResults;
  newSearchResults[filter] = searchResults[filter] || {};
  newSearchResults[filter][option] =
    { ...newSearchResults[filter][option] } || {};
  newSearchResults[filter][option][search] = results;

  //updating context
  dispatch({
    type: ActionTypes.SET_SEARCHED_RESULTS,
    payload: newSearchResults,
  });
  dispatch({
    type: ActionTypes.SET_CURRENT_ROWS,
    payload: results,
  });
};
