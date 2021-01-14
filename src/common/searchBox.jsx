import React from "react";

const SearchBox = ({ onChange, value }) => {
  return (
    <input
      onChange={onChange}
      value={value}
      type="text"
      className="form-control my-2"
      placeholder="Search..."
    />
  );
};

export default SearchBox;
