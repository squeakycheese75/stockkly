import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ label, name, value, onChange }) => (
  <div className="form-check">
    <label>
      <input
        type="checkbox"
        name={name}
        defaultChecked={value}
        onChange={onChange}
        className="form-check-input"
      />
      {label}
    </label>
  </div>
);

Checkbox.propTypes = {
  value: PropTypes.bool.isRequired,
  checked: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default Checkbox;
