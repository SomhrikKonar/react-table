import React from "react";
import { ActionTypes } from "../../../../store/actions";
import { useStore } from "../../../../store/store";
import View from "./View";

export const Container = () => {
  const [{ pageNumber, current, numberOfRows }, dispatch] = useStore();

  const goToFirstPage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch({ type: ActionTypes.SET_PAGE_NO, payload: 1 });
  };

  const goToPreviousPage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    dispatch({ type: ActionTypes.SET_PAGE_NO, payload: pageNumber - 1 });
  };

  const goToNextPage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    dispatch({ type: ActionTypes.SET_PAGE_NO, payload: pageNumber + 1 });
  };

  const goToLastPage = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    const maxPageNumber: number = Math.ceil(current.length / numberOfRows);
    dispatch({ type: ActionTypes.SET_PAGE_NO, payload: maxPageNumber });
  };

  return (
    <View
      goToFirstPage={goToFirstPage}
      goToPreviousPage={goToPreviousPage}
      goToNextPage={goToNextPage}
      goToLastPage={goToLastPage}
    />
  );
};
