import React from "react";
import s from "./Button.module.css";

const Button = ({ text, onClick }) => {
  return (
    <button className={s.Button} type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
