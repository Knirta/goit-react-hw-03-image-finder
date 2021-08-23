import React from "react";
import s from "./LoaderContainer.module.css";

const LoaderContainer = ({ children }) => {
  return <div className={s.Container}>{children}</div>;
};

export default LoaderContainer;
