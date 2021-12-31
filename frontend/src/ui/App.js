import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "./main/Home";
import "./style.css";


export const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path={`/`} element={<Home/>}/>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
