import { IAction, IAppState } from "../../../../../../interafaces/stateManager";
import { ActionTypes } from "../../../../../../store/actions";
import {
  destructureObject,
  updateObject,
} from "../../../../utils/objectUtilities";
import { sortArray } from "../../../../utils/sort";

interface handleSetNewSelectedSortProps {
  option: IAppState["selectedSort"]["option"];
  order: IAppState["selectedSort"]["order"];
  name: string;
  accessor: IAppState["selectedSort"]["accessor"];
  sortType: IAppState["selectedSort"]["sortType"];
}
export const handleSetNewSelectedSort: (
  props: handleSetNewSelectedSortProps
) => IAppState["selectedSort"] = ({
  option,
  order,
  name,
  accessor,
  sortType,
}) => {
  if (option !== name) {
    return { option: name, order: "descending", accessor, sortType };
  }
  let newSortedFilter = { option, order, accessor, sortType };
  if (order === "ascending") {
    newSortedFilter["order"] = "default";
    newSortedFilter["option"] = "default";
    newSortedFilter["accessor"] = "";
    newSortedFilter["sortType"] = "string";
  } else if (order === "descending") newSortedFilter["order"] = "ascending";
  else newSortedFilter["order"] = "descending";
  return newSortedFilter;
};

interface sortingHandler {
  selectedSort: IAppState["selectedSort"];
  results: IAppState["results"];
  selectedFilter: IAppState["selectedFilter"];
  search: IAppState["search"];
  dispatch: React.Dispatch<IAction>;
}

export const sortingHandler = ({
  selectedSort,
  results,
  selectedFilter,
  search,
  dispatch,
}: sortingHandler) => {
  const filterEnabled =
    selectedFilter.filter !== "default" && selectedFilter.option !== "default";

  const sortEnabled =
    selectedSort.option !== "default" && selectedSort.order !== "default";

  const { accessor, sortType } = selectedSort;

  let keys = [
    filterEnabled ? selectedFilter.filter : "default",
    filterEnabled ? selectedFilter.option : "default",
    search || "original",
  ];

  if (sortEnabled) {
    keys.push("sortedResults", selectedSort.option, selectedSort.order);
  } else keys.push("rows");

  let newCurrentRows: IAppState["current"] = [];
  let newResults: IAppState["results"] = {
    ...results,
  };

  let cachedResults = destructureObject({ object: newResults, keys });

  if (Array.isArray(cachedResults)) {
    newCurrentRows = cachedResults;
  } else if (
    selectedSort.option !== "default" &&
    selectedSort.order !== "default"
  ) {
    let keysToOriginalRows = [
      filterEnabled ? selectedFilter.filter : "default",
      filterEnabled ? selectedFilter.option : "default",
      search || "original",
      "rows",
    ];
    let rows = destructureObject({
      object: { ...newResults },
      keys: keysToOriginalRows,
    });
    if (rows)
      newCurrentRows = sortArray({
        sortType,
        array: rows,
        order: selectedSort.order,
        accessor,
      });
    newResults = updateObject({
      object: { ...newResults },
      keys,
      newValue: [...newCurrentRows],
    });
  }
  dispatch({ type: ActionTypes.SET_CURRENT_ROWS, payload: newCurrentRows });
  dispatch({ type: ActionTypes.UPDATE_RESULTS, payload: newResults });
};
