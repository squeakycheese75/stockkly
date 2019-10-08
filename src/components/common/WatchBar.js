import React from "react";
import PropTypes from "prop-types";
import styles from "./WatchBar.css";

const WatchBar = ({ prices, error }) => {
  return (
    <div className={wrapperClass} style={styles}>
      {/* <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div> */}
    </div>
  );
};

WatchBar.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string
};

export default WatchBar;
