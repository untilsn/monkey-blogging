import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/Auth-context";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<SignupPage></SignupPage>}></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
