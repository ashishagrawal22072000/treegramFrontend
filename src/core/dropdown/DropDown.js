import React from "react";
import "./DropDown.css";
const DropDown = ({ data, onChange, initialValue, initialName }) => {
  return (
    <>
      <select
        onChange={onChange}
        className="dropdown_select"
        name={initialName}
      >
        <option value="">{initialValue}</option>
        {data.map((ele) => {
          return (
            <>
              <option className="dropdown_option" value={ele}>
                {ele}
              </option>
            </>
          );
        })}
      </select>
    </>
  );
};
export default DropDown;
