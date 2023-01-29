import { accessKeys } from "../../../../utils/accessKey";
import { IElement } from "../../../../../../interafaces/blocks";
export const handleTableElement = ({ data, column, index }: IElement) => {
  if (column.cell) {
    return column.cell(data, index);
  } else if (column.accessor) {
    return accessKeys({ accessor: column.accessor, data });
  }
  return "--";
};
