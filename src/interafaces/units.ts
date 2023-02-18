export type TColumn = {
  name: string;
  accessor?: string | ((row: TData) => string);
  cell?: (row: TData, index: number) => JSX.Element;
  filter?: boolean;
  hideHeader?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  sortType?: "string" | "number" | "date";
  headerCell?: (rows: TData[]) => JSX.Element;
  minWidth?: React.CSSProperties["minWidth"];
  preventClick?: boolean;
  alignment?: "left" | "right" | "center";
  wrapCellContent?: boolean;
};

export type TData = { [key: string]: any };

export type TFilters = {
  [key: string]: {
    accessor?: string | ((row: object) => string);
    options: Set<number | string>;
  };
};

type TStyleVariablesKeys =
  | "font-family"
  | "table-container-border"
  | "header-bg"
  | "header-column-separator"
  | "even-row-bg"
  | "odd-row-bg"
  | "row-hover"
  | "body-column-separator"
  | "scrollbar-track-bg"
  | "scrollbar-thumb-bg"
  | "header-color"
  | "header-font-size"
  | "header-font-weight"
  | "body-font-color"
  | "body-font-size"
  | "body-font-weight"
  | "select-container-border"
  | "dropdown-arrow-color"
  | "disabled-select-container"
  | "options-container-bg"
  | "options-container-border"
  | "options-container-box-shadow"
  | "selected-option-color"
  | "options-color"
  | "options-font-size"
  | "option-separator"
  | "option-hover"
  | "selected-option-bg"
  | "search-border"
  | "search-font-size"
  | "search-font-color"
  | "search-font-weight"
  | "pagination-text-color"
  | "pagiantion-text-size"
  | "pagination-text-weight"
  | "pagination-page-info-color"
  | "pagiantion-page-info-size"
  | "pagination-page-info-weight"
  | "body-row-height"
  | "head-row-height"
  | "max-table-height"
  | "cell-content-vertical-alignment";

export type TStyleVariables = { [k in TStyleVariablesKeys]?: string };
