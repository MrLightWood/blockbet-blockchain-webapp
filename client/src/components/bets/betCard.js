import React from 'react';
import {blockbetService} from "../../services/blockbet.service";

class BetCard extends React.Component {
    state = {
        option: 0,
    }

    selectButton = (index) => {
        if(this.state.option === index + 1) {
            this.setState({
                ...this.state,
                option: 0,
            });
            return;
        }
        this.setState({
            ...this.state,
            option: index + 1,
        });
    }

    makeBet = async(e) => {
        if(this.props.state.fetch.fetching) {return}
        this.props.state.fetchActions.request();
        const data = await blockbetService.makeBet(this.props.id, this.state.option-1);
        if(data.status === "Success")
        {
            this.props.state.fetchActions.success();
            this.props.updateInformation();
        }
    }

    revealWinner = async(e) => {
        if(this.props.state.fetch.fetching) {return}
        this.props.state.fetchActions.request();
        const data = await blockbetService.revealWinner(this.props.id);
        if(data.status === "Success")
        {
            this.props.state.fetchActions.success();
            this.props.updateInformation();
        } else {
            this.props.state.fetchActions.error();
        }
    }

    copyText = (e) => {
        e.target.blur();
        navigator.clipboard.writeText(this.props.owner);
    }

    render() {
        const didBetPhrase = parseInt(this.props.status) === 0 ? "You already betted" : "This bet is finished";
        const status = parseInt(this.props.status) === 0 ? (
        <span className="w-full px-3 py-1 text-sm rounded-full text-white bg-green-500">
            ONGOING
        </span>) : (
        <span className="w-full px-3 py-1 text-sm rounded-full text-white bg-red-500">
            FINISHED
        </span>);

        let buttons = [];

        const pressedButton = "flex flex-col items-center justify-center shadow-md rounded-md w-full md:w-1/2 h-32 p-2 m-1 text-center bg-gray-300";
        const normalButton = "flex flex-col items-center justify-center shadow-md rounded-md w-full md:w-1/2 h-32 p-2 m-1 text-center bg-white hover:bg-gray-100 disabled:opacity-50 disabled:hover:br-gray-900";

        //const pressedButton = "flex flex-col p-2 break-all justify-center items-center w-full md:w-1/2 h-full m-2 bg-white rounded-md shadow-md";
        //const normalButton = "flex flex-col p-2 break-all justify-center items-center w-full md:w-1/2 h-full m-2 bg-white rounded-md shadow-md hover:bg-gray-100 disabled:opacity-50 disabled:hover:br-gray-900";

        for(let i=0; i < 2; i++) {
            let buttonClass;
            if(this.state.option === 0){
                buttonClass = normalButton;
            } else if(this.state.option === 1 && i === 0) {
                buttonClass = pressedButton;
            } else if(this.state.option === 2 && i === 1){
                buttonClass = pressedButton;
            } else {
                buttonClass = normalButton;
            }
            buttons.push(
            (<button disabled={!this.props.canBet || parseInt(this.props.status) === 1} key={i === 0 ? "optionOne" : "optionTwo"} className={buttonClass} onClick={() => this.selectButton(i)}>
                <span className="lg:text-2xl md:text-xl">{i === 0 ? this.props.optionOne : this.props.optionTwo}</span>
                <span className="text-sm">Bets: {i === 0 ? this.props.optionOneCount : this.props.optionTwoCount}</span>
            </button>
            )
            )
        }

        return(
            <div className="shadow-lg rounded-xl p-6 bg-gray-200 dark:bg-gray-800 overflow-hidden">
                <div className="flex md:flex-row items-center justify-between">
                    <div className="flex items-center justify-start w-full">
                        <div className="flex flex-col items-start">
                            <span className="dark:text-white text-gray-700 text-2xl">
                                Bet #{this.props.id}
                            </span>
                        </div>
                    </div>
                    <div className="flex-none ">
                        {status}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row w-full h-32 items-center justify-around mt-4 mb-2">
                    {buttons}
                </div>
                <div className="flex items-center rounded justify-between p-2 bg-blue-100 my-6">
                    <div className="flex items-center w-full justify-between">
                        <p className="flex w-full text-1xl text-gray-700 truncate mr-2">
                            <span>Owner:&nbsp;</span>
                            <span className="text-gray-400 font-light text-md w-2">
                               {this.props.owner}
                            </span>
                        </p>
                        <button onClick={this.copyText} className="px-3 py-1 flex-none text-sm rounded-full text-indigo-500 border border-indigo-500 hover:bg-indigo-200 focus:bg-indigo-400 transition ease-in duration-50">
                            Copy
                        </button>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                    {(this.props.canBet && parseInt(this.props.status) === 0) ?
                    (
                        <button disabled={(this.state.option === 0 || this.props.state.fetch.fetching) ? true : false} onClick={this.makeBet} type="button" className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg disabled:opacity-50">
                            Make a bet
                        </button>
                    ) : 
                    (
                        <div className="py-2 px-4  bg-gray-600 hover:bg-gray-700 text-white w-full text-center text-base font-semibold shadow-md rounded-lg ">
                            <span>{didBetPhrase}</span>
                        </div>
                    )
                    }
                    {(this.props.isOwner && parseInt(this.props.status) === 0) ?(
                        <button  disabled={this.props.state.fetch.fetching} onClick={this.revealWinner} type="button" className="mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg disabled:opacity-50 disabled:bg-red-200">
                            Reveal winner
                        </button>
                        ) : <></>
                    }
                    {parseInt(this.props.status) === 1 ? 
                    (
                        <span className="mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg disabled:opacity-50">
                            Winner is {parseInt(this.props.winner) === 0 ? this.props.optionOne : this.props.optionTwo}
                        </span>
                    ) : (<></>)}
                </div>
            </div>
        );
    }
}

export default BetCard;