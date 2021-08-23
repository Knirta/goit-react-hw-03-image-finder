import React from "react";
import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ webUrl, largeUrl, desc, openModal }) => {
  return (
    <li
      className={s.ImageGalleryItem}
      data-url={largeUrl}
      data-desc={desc}
      onClick={openModal}
    >
      <img src={webUrl} alt={desc} className={s.ImageGalleryItem__image} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webUrl: PropTypes.string.isRequired,
  largeUrl: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
