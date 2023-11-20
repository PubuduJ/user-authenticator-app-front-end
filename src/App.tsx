import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import {routes} from "./routes";
import SignIn from "./pages/auth/SignIn";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path={"/"} element={<MainLayout/>}>
                {routes}
            </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
