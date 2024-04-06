import React from "react";

const defaultContextValue: StepsContextType = {
  userData: {}, 
  setUserData: () => {},
};

export const StepsContext = React.createContext(defaultContextValue);