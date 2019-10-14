import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ label, name, checked, value, onChange }) => (
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

// import React from "react";
// import PropTypes from "prop-types";

// const CheckBox = ({ name, checked, label, onChange, error }) => {
//   let wrapperClass = "form-group";
//   if (error && error.length > 0) {
//     wrapperClass += " has-error";
//   }

//   return (
//     <div className={wrapperClass}>
//       <label htmlFor={name}>{label}</label>
//       <div className="field">
//         <input
//           name={name}
//           type="radio"
//           checked={checked}
//           inline={true}
//           value={true}
//           onChange={onChange}
//         />
//         {error && <div className="alert alert-danger">{error}</div>}
//       </div>
//     </div>
//   );
// };

// CheckBox.defaultProps = {
//   checked: false
// };

// CheckBox.propTypes = {
//   name: PropTypes.string.isRequired,
//   checked: PropTypes.bool,
//   label: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   //   checked: PropTypes.bool,
//   error: PropTypes.string
// };

// export default CheckBox;
