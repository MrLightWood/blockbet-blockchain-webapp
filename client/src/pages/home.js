import React from "react";
import Bets from "../components/bets/bets";
import MyModal from "../components/modals/createBet";

class Home extends React.Component {

  render() {

    return (
      <div className="mx-8">
        <div className="flex w-full items-center justify-end mb-6 mt-6">
          <MyModal state={this.props.state}/>
        </div>
        <div>
          <Bets state={this.props.state}/>
        </div>
      </div>
    );
  }
}

export default Home;
