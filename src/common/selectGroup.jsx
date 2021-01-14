import React from "react";

const SelectGroup = ({ name, label, data, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} id={name} className="form-control">
        {data.map((option) => (
          <option key={option._id}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectGroup;
