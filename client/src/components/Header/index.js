import React from "react";

import "./index.css";
import { NavLink } from "react-router-dom";

const MenuItem = ({ active, children, link }) => {
  const activeStyle = {
    borderBottom: "3px solid #cccc00"
  };

  return (
    <NavLink className="menu-item" to={link} exact activeStyle={activeStyle}>
      {children}
    </NavLink>
  );
};

class Header extends React.Component {
  render() {
    const { activeId, date } = this.props;
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
          <MenuItem link="/tradeinfo">거래정보</MenuItem>
        </nav>
        <div className="clock">{date}</div>
      </div>
    );
  }
}

export default Header;
