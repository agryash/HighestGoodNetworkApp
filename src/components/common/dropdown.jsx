import React from "react";

const Dropdown = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {options.map(item => (
          <option value={item.projectId} key={item.projectId}>
            {item.projectName}
          </option>
        ))}
      </select>
      {/* {error && <div className="alert alert-danger">{error}</div>} */}
    </div>
  );
};

export default Dropdown;
