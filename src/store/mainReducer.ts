import { IAction, IAppState } from "../interafaces/stateManager";
import { ActionTypes } from "./actions";
export const mainReducer = (state: IAppState, action: IAction): IAppState => {
  const payload = action.payload;
  if (payload === undefined) return state;
  switch (action.type) {
    case ActionTypes.SET_NO_OF_ROWS:
      if (payload > 0 && typeof payload === "number")
        return { ...state, numberOfRows: payload };
      return state;
    case ActionTypes.SET_PAGE_NO:
      if (payload !== undefined && typeof payload === "number") {
        const maxPageNumber: number = Math.ceil(
          state.current.length / state.numberOfRows
        );
        if (payload >= 1 && payload <= maxPageNumber) {
          const minEntryIndex: number = (payload - 1) * state.numberOfRows;
          const maxEntryIndex: number = payload * state.numberOfRows - 1;
          return {
            ...state,
            pageNumber: payload,
            minEntryIndex,
            maxEntryIndex,
          };
        }
      }
      return state;
    case ActionTypes.SET_FILTERS:
      return { ...state, filters: payload };
    case ActionTypes.SELECT_FILTERS:
      return { ...state, selectedFilter: payload };
    case ActionTypes.SET_CURRENT_ROWS:
      return {
        ...state,
        current: payload,
        pageNumber: 1,
        minEntryIndex: 0,
        maxEntryIndex: state.numberOfRows - 1,
      };
    case ActionTypes.SET_FILTERED_RESULTS:
      return { ...state, filteredResults: payload };
    case ActionTypes.SET_SEARCHED_RESULTS:
      return { ...state, searchResults: payload };
    case ActionTypes.SET_SEARCH_ACCESSORS:
      return { ...state, searchAccessors: payload };
    case ActionTypes.SET_SEARCH:
      return { ...state, search: payload };
    case ActionTypes.UPDATE_PROPS:
      return { ...state, ...payload };
    case ActionTypes.SET_SELECTED_ROWS:
      return { ...state, selectedRows: payload };
    case ActionTypes.UPDATE_RESULTS:
      return { ...state, results: payload };

    default:
      return state;
  }
};
