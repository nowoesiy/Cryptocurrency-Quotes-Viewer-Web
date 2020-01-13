import React from "react";
import "./index.css";
import { NavLink } from "react-router-dom";

const MenuItem = ({ active, children, link }) => {
  const activeStyle = {
    borderBottom: "5px solid #00cccc"
  };

  return (
    <NavLink className="menu-item" to={link} exact activeStyle={activeStyle}>
      {children}
    </NavLink>
  );
};

class Header extends React.Component {
  render() {
    const { date } = this.props;
    return (
      <div className="header">
        <div className="title">
          <span>
            <strong>Coin</strong>View
          </span>
        </div>
        <nav className="header_Menu">
          <MenuItem link="/">Home</MenuItem>
          <MenuItem link="/stock">코인정보</MenuItem>
          <MenuItem link="/sales">거래정보</MenuItem>
        </nav>
        <div className="title">{date}</div>
      </div>
    );
  }
}

export default Header;
