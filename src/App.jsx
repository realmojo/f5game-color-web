import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Board } from "./components/Board";
import { Result } from "./components/Result";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
