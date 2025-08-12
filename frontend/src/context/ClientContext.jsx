import React, { createContext } from "react";
import useClient from "../hooks/useClient";

export const ClientContext = createContext(null);

export const ClientProvider = ({ children }) => {
  const Client = useClient();

  return <ClientContext.Provider value={Client}>{children}</ClientContext.Provider>;
};
