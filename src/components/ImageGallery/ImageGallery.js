import React from "react";
import ImageGalleryItem from "../ImageGalleryItem";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map((image) => {
        const { id, webformatURL, largeImageURL, tags } = image;
        return (
          <ImageGalleryItem
            key={id}
            webUrl={webformatURL}
            largeUrl={largeImageURL}
            desc={tags}
            openModal={openModal}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
