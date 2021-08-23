import React from "react";
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

export default ImageGalleryItem;
