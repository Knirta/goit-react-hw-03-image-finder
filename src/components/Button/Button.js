import React from "react";
import PropTypes from "prop-types";
import s from "./Button.module.css";

const Button = ({ text, onClick }) => {
  return (
    <button className={s.Button} type="button" onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
