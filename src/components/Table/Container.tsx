import React from "react";
import { ITable } from "../../interafaces/blocks";
import { StateProvider } from "../../store/store";
import View from "./View";
import { TForwardRefFunctions } from "../../interafaces/units";

export const Container: React.FC<ITable> = ({
  data,
  handleRowSelection,
  tableRef,
  ...props
}) => {
  const defaultRef = React.useRef<TForwardRefFunctions>(null);
  return (
    <StateProvider
      defaultValues={{
        ...props,
        current: data || [],
        original: data || [],
      }}
    >
      <View
        {...props}
        ref={tableRef || defaultRef}
        data={data}
        handleRowSelection={handleRowSelection}
      />
    </StateProvider>
  );
};
