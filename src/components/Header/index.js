import React from 'react';
import './index.css';
import logo from '../../logo.png';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="title">
          <a href="https://github.com/alexKwonIsAwesome" target="_blank">
            <img className="logo" src={logo} />
          </a>
          <span>Alex's 심플노트</span>
        </div>
      </div>
    );
  }
}

export default Header;