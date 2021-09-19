import React from 'react';
import BetCard from './betCard';
import {blockbetService} from "../../services/blockbet.service";

class Bets extends React.Component {
    state = {
        bets: [],
        userBets: [],
        userAddress: "",
    }

    async componentDidMount() {
        this.interval = setInterval(async () => {
            const data = await blockbetService.getBets();
            let userBets = {data: [false, []]};
            if(this.props.state.user.loggedIn){
                userBets = await blockbetService.getUserBets();
            }
            this.setState({
                ...this.state,
                bets: data.data,
                userBets: userBets.data[0] === true ? userBets.data[1] : [],
                userAddress: userBets.data.userAddress,
            });
        }, 2000)
      }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate(prevProps) {
        if(this.props.state !== prevProps.state){
            this.updateInformation();
        }
    }

    updateInformation = async () => {
        const data = await blockbetService.getBets();
        let userBets = {data: [false, []]};
        if(this.props.state.user.loggedIn){
            userBets = await blockbetService.getUserBets();
        }
        this.setState({
            ...this.state,
            bets: data.data,
            userBets: userBets.data[0] === true ? userBets.data[1] : [],
            userAddress: userBets.data.userAddress,
        });
        if(this.props.state.fetch.fetched) {this.props.state.fetchActions.clear();}
    }
    

    render() {
        let betElements = []
        if(this.state.bets.length !== 0){
            betElements = this.state.bets.map((bet) => (
            <BetCard 
                key={bet.id}
                id={bet.id}
                optionOne={bet.optionOne}
                optionTwo={bet.optionTwo}
                optionOneCount={bet.optionOneCount}
                optionTwoCount={bet.optionTwoCount}
                owner={bet.owner}
                status={bet.status}
                winner={bet.winner}
                canBet={!this.state.userBets.includes(bet.id)}
                isOwner={bet.owner.toLowerCase() === this.state.userAddress}
                updateInformation={this.updateInformation}
                state={this.props.state}
            />
            ))
        } else {
            for(let i=0; i < 8; i++) {
                betElements.push((
                    <BetCard 
                        key={`betElement ${i}`}
                        id={i}
                        optionOne={"LOADING"}
                        optionTwo={"LOADING"}
                        optionOneCount={"LOADING"}
                        optionTwoCount={"LOADING"}
                        owner={"LOADING"}
                        status={0}
                        winner={0}
                        canBet={false}
                        isOwner={false}
                        updateInformation={this.updateInformation}
                        state={this.props.state}
                    />
                ))
            }
        }
        return(
            <>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 w-full">
                    {betElements}
                </div>
            </>
        );
    }
}

export default Bets;