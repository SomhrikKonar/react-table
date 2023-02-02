import { TColumn, TData } from "../../../interafaces/units";

export const accessKeys = ({
  accessor,
  data,
}: {
  accessor: TColumn["accessor"];
  data: TData;
}) => {
  let value: string | number = "--";
  if (accessor)
    if (typeof accessor === "string") {
      let keys = accessor.split(".");
      let dataCopy: TData | undefined = { ...data };
      for (const key of keys) {
        if (dataCopy !== undefined) {
          if (
            typeof dataCopy[key] === "string" ||
            typeof dataCopy[key] === "number"
          )
            value = dataCopy[key];
          dataCopy = dataCopy[key];
        } else {
          value = "--";
          break;
        }
      }
    } else if (typeof accessor === "function") {
      value = accessor(data);
    }
  return value;
};
