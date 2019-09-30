import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

const DateInput = ({ name, label, onChange, placeholder, value, error }) => {
  let wrapperClass = "form-group";
  if (error && error.length > 0) {
    wrapperClass += " has-error";
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>

      <div className="field">
        <input
          type="date"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={moment(value).format("YYYY-MM-DD")}
          onChange={onChange}
        />

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  // value: PropTypes.instanceOf(Date),
  value: PropTypes.string,
  error: PropTypes.string
};

export default DateInput;
