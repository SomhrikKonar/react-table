import React, { createContext, useContext, useReducer } from "react";
import {
  TAppContext,
  IAppState,
  IDefaultProps,
} from "../interafaces/stateManager";
import { initialState } from "./constants";
import { mainReducer } from "./mainReducer";

const Store = createContext<TAppContext>([initialState, () => {}]);
Store.displayName = "Store";

export const useStore = () => useContext(Store);

export const StateProvider = ({
  children,
  defaultValues,
}: {
  children: React.ReactNode;
  defaultValues: IDefaultProps;
}) => {
  const initialValues: IAppState = { ...initialState, ...defaultValues };
  const [state, dispatch] = useReducer(mainReducer, initialValues);

  return <Store.Provider value={[state, dispatch]}>{children}</Store.Provider>;
};
