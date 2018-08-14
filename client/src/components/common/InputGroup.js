import React from "react";
import classnames from "classnames";
import propTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} style={{ width: "1.125rem" }} />
        </span>
      </div>
      <input
        value={value}
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
      />
      {error && <div className={"invalid-feedback"}>{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: propTypes.string.isRequired,
  placeholder: propTypes.string,
  value: propTypes.string.isRequired,
  error: propTypes.string,
  icon: propTypes.string,
  type: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
