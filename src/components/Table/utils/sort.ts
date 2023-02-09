import { TColumn } from "../../../interafaces/units";

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
    newA = typeof accessor === "function" ? accessor(a) : a[accessor];
    newB = typeof accessor === "function" ? accessor(b) : b[accessor];
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
    (newA === undefined || newA === null) &&
    (newB === undefined || newB === null)
  ) {
    return 0;
  } else if (newA === undefined || newA === null) {
    return -1;
  } else if (newB === undefined || newB === null) {
    return 1;
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
