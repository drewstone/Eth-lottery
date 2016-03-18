contract Tournament {

	address public owner;
	uint public playerCount;
	uint public tournamentPot;
	uint public matchCount;
	uint public revealCount;

	event Won(address winner, uint payout);

	struct Match {
		address leftPlayer;
		address rightPlayer;
		bool bit;
	}

	struct Player {
		address account;
		bytes32 commitment;
		bytes choice;
		bool hasRevealed;
		bool eliminated;
	}

	mapping (uint => Match) public matches;
	mapping (address => Player) public players;

	/*
		Tournament constructor creates a new empty match and initializes starting values
	*/
	function Tournament() {
		owner = msg.sender;
		playerCount = 0;
		tournamentPot = 0;
		matchCount = 0;
		revealCount = 0;
	}

	/*
		Testing bytes to int functionality
	*/
	function bytes_to_int(bytes s) private returns (uint result) {
		uint temp;
		for (uint i = 0; i < bytes(s).length; i++) {
			temp += uint(s[i])*8;
		}
		return temp;
	}

	/*
		Adds a new player into the tournament lottery and inserts them into the
		first open match as a left or right player depending on the status of a
		current match.
	*/
	function addPlayer(bytes32 commit) {
		if (msg.value >= 1000) {
			if (msg.value - 1000 > 0) {
				msg.sender.send(msg.value - 1000);
			}
			tournamentPot += 1000;
			players[msg.sender].account = msg.sender;
			players[msg.sender].commitment = commit;
			players[msg.sender].hasRevealed = false;
			players[msg.sender].eliminated = false;
			populateMatch(msg.sender);
			playerCount++;
			if (playerCount % 2 == 0) {
				matchCount++;
			}
		}
		return;
	}

	/*
		Utility function for populating the current unfilled match
	*/
	function populateMatch(address sender) private {
		if (matches[matchCount].bit) {
			matches[matchCount].rightPlayer = sender;
			matches[matchCount].bit = false;
		} else {
			matches[matchCount].leftPlayer = sender;
			matches[matchCount].bit = true;
		}
		return;
	}

	/*
		Secret revealing stage of protocol for each round of matches
	*/
	function open(bytes choice) {
		if (!players[msg.sender].hasRevealed && !players[msg.sender].eliminated) {
			bytes32 temp = sha3(sha3(choice));
			if (temp == players[msg.sender].commitment) {
				players[msg.sender].hasRevealed = true;
				players[msg.sender].choice = choice;
				revealCount++;
			}
		}
		return;
	}

	/*
		Evaluates the winners of each match in a given round. We compute the sum of
		each player's hashed commitment modulo 2, add 1, and determine the winner
		by selecting the left player if value = 1 and the right player if value = 2
	*/
	function checkRound() {
		if (revealCount == playerCount) {
			for (uint i = 0; i < matchCount; i++) {
				uint value = 1 + addmod(
					bytes_to_int(players[matches[i].leftPlayer].choice),
					bytes_to_int(players[matches[i].rightPlayer].choice),
					2);
				if (value == 1) {
					players[matches[i].rightPlayer].eliminated = true;
				} else {
					players[matches[i].rightPlayer].eliminated = true;
				}
				playerCount--;
				if (playerCount == 1) {
					if (value == 1) {
						Won(matches[i].leftPlayer, tournamentPot);
					} else {
						Won(matches[i].rightPlayer, tournamentPot);
					}
				}
			}
			matchCount = 0;
		}
		return;
	}

	/*
		Generate new commitments for players still in the lottery
	*/
	function resetCommitment(bytes32 commit) {
		if (!players[msg.sender].eliminated) {
			players[msg.sender].commitment = commit;
			players[msg.sender].hasRevealed = false;
			players[msg.sender].choice = "";
			populateMatch(msg.sender);
		}
		return;
	}

  /*
		Suicide function
  */
	function kill() {
		if (msg.sender == owner) {
			suicide(owner);
		}
	}
}
