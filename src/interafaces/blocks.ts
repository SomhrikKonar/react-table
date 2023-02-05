import { TColumn, TData, TStyleVariables } from "./units";

export interface ITable {
  columns: TColumn[];
  data: TData[];
  uniqueDataField?: string;
  numberOfRows?: number;
  usePagination?: boolean;
  searchPlaceholder?: string;
  canSelectRows?: boolean;
  handleRowSelection?: (rows: TData[]) => void;
  handleRowClick?: (row: TData) => void;
  styleVariables?: TStyleVariables;
  fixedTableHeight?: boolean;
  loading?: boolean;
  loadingComponent?: React.ReactNode;
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

export interface IBodyProps {
  tableContainerRef: React.MutableRefObject<HTMLDivElement | null>;
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
  sortType: "string" | "number" | "date";
  name: string;
  accessor: TColumn["accessor"];
}

export interface IFilter {
  handleUpdateSelectedFilter: (
    state: "filter" | "option"
  ) => (e: React.MouseEvent<HTMLDivElement>) => void;
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

export interface ISelectInput {
  handleChange: (e: React.MouseEvent<HTMLDivElement>) => void;
  value: string;
  options: (string | number)[];
  isDisabled?: boolean;
  icon?: string;
  defaultMessage?: string;
}
