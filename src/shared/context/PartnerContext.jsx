import React, { createContext, useContext } from "react";

const PartnerContext = createContext(null);

export const PartnerProvider = ({ children, value }) => {
  return (
    <PartnerContext.Provider value={{ ...value }}>
      {children}
    </PartnerContext.Provider>
  );
};

export const usePartner = () => useContext(PartnerContext);
