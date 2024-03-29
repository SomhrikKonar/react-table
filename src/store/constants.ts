import { styleVariables } from "../constansts/styleValriables";
import { IAppState } from "../interafaces/stateManager";

export const initialState: IAppState = {
  columns: [],
  current: [],
  original: [],
  uniqueDataField: "",
  numberOfRows: 25,
  pageNumber: 1,
  minEntryIndex: 0,
  maxEntryIndex: 24,
  usePagination: false,
  filters: {},
  search: "",
  searchPlaceholder: "Search here...",
  selectedFilter: { filter: "default", option: "default" },
  searchAccessors: [],
  canSelectRows: false,
  selectAll: false,
  selectedRows: {},
  results: {},
  selectedSort: {
    option: "default",
    order: "default",
    accessor: "",
    sortType: "string",
  },
  stylesheet: styleVariables,
  mounted: false,
  fixedTableHeight: false,
  loading: false,
  preventAutoScroll: false,
};
