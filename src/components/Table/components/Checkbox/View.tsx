import React from "react";
import { ICheckboxView } from "../../../../interafaces/blocks";

const View: React.FC<ICheckboxView> = ({ selected, handleChange }) => {
  return <input type={"checkbox"} checked={selected} onChange={handleChange} />;
};

export default React.memo(View);
