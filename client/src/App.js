import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import Home from "./components/Home/Home.jsx";
import Create from "./components/Create/Create.jsx";
import Detail from "./components/Detail/Detail";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/pokemons" component={Home} />
      <Route path="/pokemons/:id" component={Detail} />
      <Route path="/create" component={Create} />
    </div>
  );
}

export default App;
