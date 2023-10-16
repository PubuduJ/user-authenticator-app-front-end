import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import {routes} from "./routes";
import SignIn from "./pages/auth/SignIn";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            {/*<Route path={"/"} element={<MainLayout/>}>*/}
            {/*    {routes}*/}
            {/*</Route>*/}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
