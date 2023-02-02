import { Dispatch } from "react";
import { ActionTypes } from "../store/actions";
import { TColumn, TData, TFilters, TStyleVariables } from "./units";

export interface IAppState {
  current: TData[];
  original: TData[];
  columns: TColumn[];
  uniqueDataField: string | ((data: TData) => string);
  numberOfRows: number;
  pageNumber: number;
  minEntryIndex: number;
  maxEntryIndex: number;
  usePagination: boolean;
  filters: TFilters;
  selectedFilter: { filter: string; option: string };
  selectedSort: {
    option: string;
    order: "ascending" | "descending" | "default";
    accessor?: string | ((row: TData) => string);
    sortType: "string" | "number" | "date";
  };
  search: string;
  searchPlaceholder: string;
  searchAccessors: TColumn["accessor"][];
  canSelectRows: boolean;
  selectAll: boolean;
  mounted: boolean;
  selectedRows: { [key: number | string]: TData };
  handleRowClick?: (row: TData) => void;
  results: {
    [filter: string]: {
      [option: string]: {
        [search: string]: {
          rows: TData[];
          sortedResults: {
            [sortBy: string]: {
              ascending?: TData[];
              descending?: TData[];
            };
          };
        };
      };
    };
  };
  stylesheet: TStyleVariables;
}

export interface IDefaultProps {
  current: TData[];
  original: TData[];
  columns: TColumn[];
  numberOfRows?: number;
  uniqueDataField?: string | ((data: TData) => string);
  usePagination?: boolean;
  searchPlaceholder?: string;
  canSelectRows?: boolean;
}

export type TAppContext = [IAppState, Dispatch<IAction>];

export interface IAction {
  type: ActionTypes;
  payload?: any;
}
