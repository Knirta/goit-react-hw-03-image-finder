import React from "react";
import PropTypes from "prop-types";
import s from "./LoaderContainer.module.css";

const LoaderContainer = ({ children }) => {
  return <div className={s.Container}>{children}</div>;
};

LoaderContainer.propTypes = {
  children: PropTypes.node,
};

export default LoaderContainer;
