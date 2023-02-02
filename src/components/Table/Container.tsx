import React from "react";
import { ITable } from "../../interafaces/blocks";
import { StateProvider } from "../../store/store";
import View from "./View";

export const Container: React.FC<ITable> = ({
  data,
  handleRowSelection,
  ...props
}) => {
  return (
    <StateProvider
      defaultValues={{
        ...props,
        current: data || [],
        original: data || [],
      }}
    >
      <View {...props} handleRowSelection={handleRowSelection} />
    </StateProvider>
  );
};
