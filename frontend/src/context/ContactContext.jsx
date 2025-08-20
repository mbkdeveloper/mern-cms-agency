import React, { createContext } from "react";
import useContact from "../hooks/useContact";

export const ContactContext = createContext(null);

export const ContactProvider = ({ children }) => {
  const Contact = useContact();

  return (
    <ContactContext.Provider value={Contact}>
      {children}
    </ContactContext.Provider>
  );
};
