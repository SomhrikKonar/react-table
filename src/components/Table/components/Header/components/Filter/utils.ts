import { IAction, IAppState } from "../../../../../../interafaces/stateManager";
import { TData } from "../../../../../../interafaces/units";
import { ActionTypes } from "../../../../../../store/actions";
import { accessKeys } from "../../../../utils/accessKey";
import {
  destructureObject,
  updateObject,
} from "../../../../utils/objectUtilities";
import { sortingHandler } from "../../../Head/components/Element/utils";
import { handleSearchResults } from "../Search/utils";

interface IHandleUpdateSelectedFilterProps {
  e: React.MouseEvent<HTMLDivElement>;
  filters: IAppState["filters"];
  state: "filter" | "option";
  search: IAppState["search"];
  dispatch: React.Dispatch<IAction>;
  original: IAppState["original"];
  searchAccessors: IAppState["searchAccessors"];
  selectedFilter: IAppState["selectedFilter"];
  results: IAppState["results"];
  selectedSort: IAppState["selectedSort"];
}
export const handleUpdateSelectedFilter = ({
  e,
  selectedFilter,
  state,
  ...props
}: IHandleUpdateSelectedFilterProps) => {
  e.stopPropagation();
  const value = (e.target as HTMLDivElement).accessKey;
  let latestFilterValues = { ...selectedFilter, [state]: value };
  if (state === "filter") latestFilterValues["option"] = "default";
  handleResetingSelectedFilter({
    ...props,
    latestFilterValues,
  });
};

interface updateUtilProps {
  latestFilterValues: IAppState["selectedFilter"];
  filters: IAppState["filters"];
  search: IAppState["search"];
  dispatch: React.Dispatch<IAction>;
  original: IAppState["original"];
  searchAccessors: IAppState["searchAccessors"];
  results: IAppState["results"];
  selectedSort: IAppState["selectedSort"];
}

export const handleResetingSelectedFilter = ({
  dispatch,
  original,
  latestFilterValues,
  filters,
  search,
  searchAccessors,
  results,
  selectedSort,
}: updateUtilProps) => {
  const filterEnabled =
    latestFilterValues.filter !== "default" &&
    latestFilterValues.option !== "default";

  const sortEnabled =
    selectedSort.order !== "default" && selectedSort.option !== "default";

  let newCurrentRows: TData[] = [];

  let newResultsObject: IAppState["results"] = {
    ...results,
  };

  if (filterEnabled) {
    //check cached data
    let cachedRows = destructureObject({
      object: newResultsObject,
      keys: [
        latestFilterValues.filter,
        latestFilterValues.option,
        "original",
        "rows",
      ],
    });
    if (Array.isArray(cachedRows)) {
      newCurrentRows = cachedRows;
    } else {
      let newFilteredResults = original.filter((row) => {
        let accessor = filters[latestFilterValues.filter].accessor;
        let value: string | number = "";
        if (!accessor) return;
        value =
          typeof accessor === "string"
            ? accessKeys({ accessor, data: row })
            : accessor(row);
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
    }
  } else {
    newCurrentRows = original;
  }

  if (search) {
    handleSearchResults({
      search,
      dispatch,
      searchAccessors,
      selectedFilter: latestFilterValues,
      results: newResultsObject,
      selectedSort,
    });
  } else if (sortEnabled) {
    sortingHandler({
      selectedSort,
      results: newResultsObject,
      selectedFilter: latestFilterValues,
      search,
      dispatch,
    });
  } else {
    dispatch({
      type: ActionTypes.UPDATE_RESULTS,
      payload: newResultsObject,
    });
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
