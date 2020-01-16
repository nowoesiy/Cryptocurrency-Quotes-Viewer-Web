import React from "react";
import "./index.css";
function CreateCoinInfo({}) {
  return (
    <div className="JumpCoinInfo">
      <div className="Info-title">
        <h1>실시간 급등 코인</h1>
        <br></br>
      </div>
    </div>
  );
}

class Home extends React.Component {
  render() {
    return <CreateCoinInfo />;
  }
}

export default Home;
