import { TColumn } from "../../../interafaces/units";
import { accessKeys } from "./accessKey";

interface props {
  sortType: "string" | "number" | "date";
  array: any[];
  order: "ascending" | "descending";
  accessor: TColumn["accessor"];
}
export const sortArray = ({ sortType, array, order, accessor = "" }: props) => {
  if (!accessor) return [...array];
  let newArray = [...array];
  let arrayElementType = typeof newArray[0];
  newArray.sort((a, b) =>
    compareFunction(a, b, arrayElementType, sortType, order, accessor)
  );
  return newArray;
};

const compareFunction = (
  a: any,
  b: any,
  elementType: string = "string",
  sortType: "string" | "number" | "date",
  order: "ascending" | "descending",
  accessor?: TColumn["accessor"]
) => {
  let newA = a;
  let newB = b;
  if (elementType === "object") {
    if (accessor === undefined) return 0;
    newA =
      typeof accessor === "function"
        ? accessor(a)
        : accessKeys({ accessor, data: a });
    newB =
      typeof accessor === "function"
        ? accessor(b)
        : accessKeys({ accessor, data: b });
  }

  //changes if sortType is string||date
  if (sortType === "string") {
    newA = typeof newA === "string" ? newA.toLowerCase() : undefined;
    newB = typeof newB === "string" ? newB.toLowerCase() : undefined;
  } else if (sortType === "date") {
    newA = new Date(newA);
    newB = new Date(newB);
  }

  //sorting by order
  if (
    newA === undefined ||
    newA === null ||
    (sortType === "date" && !newA?.getTime())
  ) {
    return 1;
  } else if (
    newB === undefined ||
    newB === null ||
    (sortType === "date" && !newB?.getTime())
  ) {
    return -1;
  }

  let toReturn: number = 0;
  if (newA > newB) {
    toReturn = -1;
  } else if (newA < newB) {
    toReturn = 1;
  } else {
    toReturn = 0;
  }

  if (order === "descending") {
    toReturn *= -1;
  }
  return toReturn;
};
