import React, { createContext } from "react";
import useGalerie from "../hooks/useGalerie";

export const GalerieContext = createContext(null);

export const GalerieProvider = ({ children }) => {
  const Galerie = useGalerie();

  return (
    <GalerieContext.Provider value={Galerie}>
      {children}
    </GalerieContext.Provider>
  );
};
