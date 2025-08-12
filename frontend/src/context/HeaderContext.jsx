import { createContext } from "react";
import useHeader from "../hooks/useHeader";

export const HeaderContext = createContext(null);

export const HeaderProvider = ({ children }) => {
  const Header = useHeader();

  return (
    <HeaderContext.Provider value={Header}>
      {children}
    </HeaderContext.Provider>
  );
};
