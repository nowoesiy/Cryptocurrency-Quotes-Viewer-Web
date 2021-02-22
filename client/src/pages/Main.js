import React from 'react';

import Header from "../components/Header";
import List from "../components/List";
import Home from "../components/Home";

export default function Main () {
    return (
        <div className="app">
        <Header/>
        <div className="container">
          <div className="board">
            <Home/>
          </div>
        </div>
      </div>
    )
}