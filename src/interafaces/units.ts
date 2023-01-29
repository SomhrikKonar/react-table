export type TColumn = {
  name: string;
  accessor?: string | ((row: TData) => string);
  cell?: (row: TData, index: number) => JSX.Element;
  filter?: boolean;
  hideHeader?: boolean;
  searchable?: boolean;
  sortable?: boolean;
  headerCell?: (rows: TData[]) => JSX.Element;
};
export type TData = { [key: string]: any };
export type TFilters = {
  [key: string]: {
    accessor?: string | ((row: object) => string);
    options: Set<number | string>;
  };
};
