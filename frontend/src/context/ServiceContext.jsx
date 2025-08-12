import { createContext } from "react";
import useService from "../hooks/useService";

export const ServiceContext = createContext(null);

export const ServiceProvider = ({ children }) => {
  const Services = useService();

  return (
    <ServiceContext.Provider value={Services}>
      {children}
    </ServiceContext.Provider>
  );
};
