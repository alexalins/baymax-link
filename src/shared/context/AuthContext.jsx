import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children, value }) {
  const [hasVisitedHome, setHasVisitedHome] = useState(false);

  return (
    <AuthContext.Provider value={{ ...value, hasVisitedHome, setHasVisitedHome }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}