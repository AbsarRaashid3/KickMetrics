import { createContext, useContext, useState } from "react";

const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  return (
    <ImageContext.Provider value={{ images, updateImages }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  return useContext(ImageContext);
};
