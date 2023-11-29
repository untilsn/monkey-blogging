import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase-app/Firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };
  auth;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
    });
  }, []);
  return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("authContext must be used within authProvider");
  return context;
}

export { useAuth, AuthProvider };
