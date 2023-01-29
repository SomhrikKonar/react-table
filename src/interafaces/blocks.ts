import { TColumn, TData } from "./units";

export interface ITable {
  columns: TColumn[];
  data: TData[];
  uniqueDataField?: string;
  numberOfRows?: number;
  usePagination?: boolean;
  searchPlaceholder?: string;
  canSelectRows?: boolean;
  handleRowSelection?: (rows: TData[]) => void;
}

export type ITableView = Partial<ITable>;

export interface IPagination {
  goToFirstPage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  goToPreviousPage: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  goToNextPage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  goToLastPage: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface IRow {
  data: TData;
  index: number;
}

export interface IElement {
  data: TData;
  column: TColumn;
  index: number;
}

export interface IHeadElement {
  content: JSX.Element | string | number;
  sortable?: boolean;
}

export interface IFilter {
  handleUpdateSelectedFilter: (
    state: "filter" | "option"
  ) => (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface ISearch {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ICheckboxContainer {
  handleRowSelection: (rows: TData[]) => void;
  header: boolean;
  index?: number;
}

export interface ICheckboxView {
  selected: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
