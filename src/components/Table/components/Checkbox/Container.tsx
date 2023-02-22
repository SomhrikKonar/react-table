import React from "react";
import { ICheckboxContainer } from "../../../../interafaces/blocks";
import { IAppState } from "../../../../interafaces/stateManager";
import { ActionTypes } from "../../../../store/actions";
import { useStore } from "../../../../store/store";
import View from "./View";

export const Container: React.FC<ICheckboxContainer> = ({
  handleRowSelection,
  header,
  index,
}) => {
  const [{ selectedRows, selectAll, current }, dispatch] = useStore();
  const [mounted, setMounted] = React.useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = e.target.checked;
    let newObj: IAppState["selectedRows"] = { ...selectedRows };
    if (value) {
      if (header) {
        newObj = {};
        current.forEach((row, i) => {
          newObj[i] = row;
        });
      } else if (index !== undefined) {
        newObj[index] = current[index];
      }
    } else {
      if (header) {
        newObj = {};
      } else if (index !== undefined) {
        delete newObj[index];
      }
    }
    handleRowSelection(Object.values(newObj));
    dispatch({ type: ActionTypes.SET_SELECTED_ROWS, payload: newObj });
    if (header)
      dispatch({
        type: ActionTypes.UPDATE_PROPS,
        payload: { selectAll: value },
      });
  };

  React.useEffect(() => {
    setMounted(false);
  }, []);

  React.useEffect(() => {
    if (!header || !mounted) return;
    //will be called when the component is header (as it passes all current rows as props) and if header is in checked
    let newObj: IAppState["selectedRows"] = {};
    if (selectAll) {
      current.forEach((row, i) => {
        newObj[i] = row;
      });
    }
    handleRowSelection(Object.values(newObj));
    dispatch({ type: ActionTypes.SET_SELECTED_ROWS, payload: newObj });
  }, [current]);

  const isCheckboxSelected: boolean = header
    ? selectAll
    : index !== undefined
    ? !!selectedRows[index]
    : false;

  return <View selected={isCheckboxSelected} handleChange={handleChange} />;
};
