import { Dispatch } from "react";
import { ActionTypes } from "../store/actions";
import { TColumn, TData, TFilters } from "./units";

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
  filteredResults: { [key: string]: { [key: string]: TData[] } };
  search: string;
  searchPlaceholder: string;
  searchAccessors: TColumn["accessor"][];
  searchResults: {
    [filter: string]: { [option: string]: { [search: string]: TData[] } };
  };
  canSelectRows: boolean;
  selectAll: boolean;
  selectedRows: { [key: number | string]: TData };
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
