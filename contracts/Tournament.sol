contract Tournament {

	address public owner;
	address[] public winners;

	uint public playerCount;
	uint public tournamentPot;
	uint public matchCount;
	uint public revealCount;
	uint public testValue;
	bytes32 public tempHash;

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
		Simple functions to ease hashing complications
	*/
	function single_sha(bytes input) returns (bytes32 result) {
		return sha3(input);
	}

	function double_sha(bytes input) returns (bytes32 result) {
		tempHash = sha3(sha3(input));
		return tempHash;
	}

	function multiple_sha(bytes input, bytes nonce) returns (bytes32 result) {
		return sha3(input, nonce);
	}

	/*
		Testing bytes to int functionality
	*/
	function bytes_to_int(bytes32 s) returns (uint result) {
		return uint(s);
	}


	/*
		Adds a new player into the tournament lottery and inserts them into the
		first open match as a left or right player depending on the status of a
		current match.
	*/
	function addPlayer(bytes32 commit) returns (bytes32 latest) {
		// Add new player to current match and send any excess Wei back to player
		if (msg.value >= 1000) {
			if (msg.value - 1000 > 0) {
				msg.sender.send(msg.value - 1000);
			}

			tournamentPot += 1000;
			players[msg.sender].account = msg.sender;
			players[msg.sender].commitment = commit;
			players[msg.sender].choice = "";
			players[msg.sender].hasRevealed = false;
			players[msg.sender].eliminated = false;
			populateMatch(msg.sender);
			return commit;
		} else {
			return bytes32(0x0);
		}
	}

	/*
		Utility function for populating the current unfilled match
	*/
	function populateMatch(address sender) {
		if (matches[matchCount].bit) {
			matches[matchCount++].rightPlayer = sender;
		} else {
			matches[matchCount].leftPlayer = sender;
			matches[matchCount].bit = true;
		}
		playerCount++;
		return;
	}

	/*
		Secret revealing stage of protocol for each round of matches
	*/
	function open(bytes choice) {
		if (!players[msg.sender].hasRevealed && !players[msg.sender].eliminated) {
			tempHash = sha3(sha3(choice));
			if (tempHash == players[msg.sender].commitment) {
				revealCount += 1;
				players[msg.sender].hasRevealed = true;
				players[msg.sender].choice = choice;
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
				bytes32 left = players[matches[i].leftPlayer].commitment;
				bytes32 right = players[matches[i].rightPlayer].commitment;
				uint value = 1;
				if (value == 1) {
					winners.push(matches[i].leftPlayer);
					players[matches[i].rightPlayer].eliminated = true;
				} else {
					winners.push(matches[i].rightPlayer);
					players[matches[i].rightPlayer].eliminated = true;
				}
				// Null out match entry
				matches[i] = Match(address(0x0), address(0x0), false);
				playerCount--;
			}
		}
		return;
	}

	/*
		Generate new commitments for players still in the lottery
	*/
	function resetCommitment(bytes32 commit) {
		if (players[msg.sender].eliminated) {
			return;
		} else {
			players[msg.sender].commitment = commit;
			players[msg.sender].hasRevealed = false;
			players[msg.sender].choice = "";
			populateMatch(msg.sender);
			return;
		}
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