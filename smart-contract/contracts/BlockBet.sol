// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
pragma abicoder v2;

contract BlockBet {
    enum Choice {
        FIRSTOPTION,
        SECONDOPTION
    }

    enum Status {
        ONGOING,
        FINISHED
    }

    enum Winner {
        FIRSTOPTION,
        SECONDOPTION
    }

    struct Bettor {
        uint256 id;
        address addr;
        Choice choice;
    }

    struct Bet {
        uint256 id;
        address owner;
        string optionOne;
        string optionTwo;
        uint256 optionOneCount;
        uint256 optionTwoCount;
        uint256 numBettors;
        Winner winner;
        Status status;
    }

    mapping(uint256 => mapping(uint256 => Bettor)) bettors;
    mapping(address => uint256) bettorBetsCount;
    mapping(uint256 => Bet) bets;
    uint256 numBets;
    uint256 randNonce;

    function getNumOfBets() public view returns (uint256) {
        return numBets;
    }

    function getBets() public view returns (Bet[] memory) {
        Bet[] memory res = new Bet[](numBets);
        for (uint256 i = 0; i < numBets; i++) {
            res[i] = bets[i];
        }
        return res;
    }

    function getBetUsers(uint256 _id) public view returns (Bettor[] memory) {
        Bettor[] memory res = new Bettor[](bets[_id].numBettors);
        for (uint256 i = 0; i < bets[_id].numBettors; i++) {
            res[i] = bettors[_id][i];
        }
        return res;
    }

    function getUserBets() public view returns (bool, uint256[] memory) {
        uint256[] memory res = new uint256[](bettorBetsCount[msg.sender]);
        uint256 arrayIndex = 0;
        for (uint256 i = 0; i < numBets; i++) {
            if (didAddressBet(i, msg.sender) == true) {
                res[arrayIndex] = i;
                arrayIndex++;
                continue;
            }
        }
        return arrayIndex == 0 ? (false, res) : (true, res);
    }

    function getBet(uint256 _id) public view returns (bool, Bet memory) {
        Bet memory res = bets[_id];
        return res.owner == address(0) ? (false, res) : (true, res);
    }

    function getUserById(uint256 _betId, uint256 _userId)
        public
        view
        returns (bool, Bettor memory)
    {
        Bettor memory res = bettors[_betId][_userId];

        return res.addr == address(0) ? (false, res) : (true, res);
    }

    function getUserByAddress(uint256 _betId, address _userAddress)
        public
        view
        returns (bool, Bettor memory)
    {
        Bettor memory res;

        for (uint256 i = 0; i < bets[_betId].numBettors; i++) {
            if (bettors[_betId][i].addr == _userAddress) {
                return (true, bettors[_betId][i]);
            }
        }

        return (false, res);
    }

    function createBet(string memory _optionOne, string memory _optionTwo)
        public
        returns (uint256 betId)
    {
        require(msg.sender != address(0), "Address must not be 0");
        betId = numBets++;
        Bet storage bet = bets[betId];
        bet.id = betId;
        bet.optionOne = _optionOne;
        bet.optionTwo = _optionTwo;
        bet.owner = msg.sender;

        emit BetCreated(msg.sender, _optionOne, _optionTwo);
        return betId;
    }

    function makeBet(uint256 _id, uint256 _option) public returns (bool) {
        Bet storage bet = bets[_id];
        require(
            _option == 0 || _option == 1,
            "There are only two options available"
        );
        require(
            bet.status == Status.ONGOING,
            "Can't make a bet to a Finished bet"
        );
        require(msg.sender != address(0), "Address must not be 0");
        require(
            didAddressBet(_id, msg.sender) == false,
            "Same address can only bet once"
        );
        require(bets[_id].owner != address(0), "This bet does not exists");

        //OPTION 0 => FIRSTOPTION
        //OPTION 1 => SECONDOPTION
        Bettor storage bettor = bettors[_id][bet.numBettors];
        bettor.addr = msg.sender;
        bettor.id = bet.numBettors;
        bet.numBettors += 1;
        bettorBetsCount[msg.sender] += 1;

        if (_option == 0) {
            bet.optionOneCount += 1;
            bettor.choice = Choice.FIRSTOPTION;
        } else if (_option == 1) {
            bet.optionTwoCount += 1;
            bettor.choice = Choice.SECONDOPTION;
        }

        emit BetMade(msg.sender, _id, bettor.choice);
        return true;
    }

    function revealWinner(uint256 _id, uint256 _modulus)
        public
        returns (Winner, string memory)
    {
        Bet storage bet = bets[_id];
        require(bets[_id].owner != address(0), "This bet does not exists");
        require(msg.sender == bet.owner, "Only owner can get the results");
        require(
            bet.status == Status.ONGOING,
            "This bet already has its winner"
        );

        uint256 randVal = randMod(_modulus) % 2;

        if (randVal == 0) {
            bet.winner = Winner.FIRSTOPTION;
        } else {
            bet.winner = Winner.SECONDOPTION;
        }
        bet.status = Status.FINISHED;

        emit BetFinished(bet.owner, bet.winner);
        return
            bet.winner == Winner.FIRSTOPTION
                ? (Winner.FIRSTOPTION, bet.optionOne)
                : (Winner.SECONDOPTION, bet.optionTwo);
    }

    function randMod(uint256 _modulus) internal returns (uint256) {
        // increase nonce
        randNonce++;
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.timestamp, msg.sender, randNonce)
                )
            ) % _modulus;
    }

    // <============================ TODOLIST EVENTS ===========================>

    event BetCreated(
        address indexed creator,
        string optionOne,
        string optionTwo
    );

    event BetMade(
        address indexed bettor,
        uint256 indexed id,
        Choice indexed choice
    );

    function didAddressBet(uint256 _betId, address _userAddress)
        internal
        view
        returns (bool)
    {
        for (uint256 i = 0; i < bets[_betId].numBettors; i++) {
            if (bettors[_betId][i].addr == _userAddress) {
                return true;
            }
        }

        return false;
    }

    event BetFinished(address indexed owner, Winner indexed winner);
}
