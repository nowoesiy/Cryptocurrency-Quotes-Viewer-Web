import React, {useState, useEffect} from "react";

import "./index.css";
import { NavLink } from "react-router-dom";

const MenuItem = ({ children, link }) => {
  const activeStyle = {
    borderBottom: "3px solid #cccc00"
  };

  return (
    <NavLink className="menu-item" to={link} exact activeStyle={activeStyle}>
      {children}
    </NavLink>
  );
};

export default function Header ({activeId}) {
  const [date, setDate] = useState("");

  useEffect(()=> {
    setInterval(() => {
      let d = new Date();
      const clock = `${d.getHours()}:${
          d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
        }:${d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()}`
  
      setDate(clock);
    }, 1000);
  },[date])

  return (
    <div className="header">
      <div className="title">
        <span>
          <strong>Vis</strong>Coin
        </span>
      </div>
      <nav className="header_Menu">
        <MenuItem link="/">Home</MenuItem>
        <MenuItem link={"/quote/" + activeId}>코인정보</MenuItem>
      </nav>
      <div className="clock">{date}</div>
    </div>
  );
}