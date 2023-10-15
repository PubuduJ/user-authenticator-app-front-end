import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import {routes} from "./routes";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<MainLayout/>}>
            {routes}
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
