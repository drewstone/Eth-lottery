contract Tournament {

	address public owner;
	uint public playerCount;
	uint public tournamentPot;
	Match current;
	Match[] matches;
	Player[] winners;
	uint blockNumber;

	struct Match {
		Player leftPlayer;
		Player rightPlayer;
		uint bit;
	}

	struct Player {
		address account;
		bytes32 commitment;
		bool hasRevealed;
		bytes32 choice;
	}

	mapping (bytes32 => bool) commitments;
	mapping (address => Player) players;

	/*
		Tournament constructor creates a new empty match and initializes starting values
	*/
	function Tournament() {
		resetMatch();
		owner = msg.sender;
		playerCount = 0;
		tournamentPot = 0;
	}

	/*
		Adds a new player into the tournament lottery and inserts them into the
		first open match as a left or right player depending on the status of a
		current match.
	*/
	function addPlayer(bytes32 commit) public returns (uint num) {
		// Player has already been added into the tournament
		if (players[msg.sender].account == msg.sender) {
			return;

		// Abort protocol, two players have selected the same secret/commitment
		} else if (commitments[commit]) {
			return;

		// Add new player to current match and send any excess Wei back to player
		} else if (msg.value >= 1000) {
			if (msg.value - 1000 > 0) {
				msg.sender.send(msg.value - 1000);
			}			
			populateMatch(msg.sender, commit);
			tournamentPot += msg.value;
			return playerCount;
		}
	}

	/*
		Utility function for populating the current unfilled match
	*/
	function populateMatch(address sender, bytes32 commit) {
		if (current.bit == 0) {
			current.leftPlayer = Player({
					account: sender,
					commitment: commit,
					hasRevealed: false,
					choice: bytes32(0x0)
			});
			current.bit = 1;
			commitments[commit] = true;
			players[msg.sender] = current.leftPlayer;
		} else {
			current.rightPlayer = Player({						
					account: sender,
					commitment: commit,
					hasRevealed: false,
					choice: bytes32(0x0)
			});
			players[sender] = current.rightPlayer;
			commitments[commit] = true;
			matches.push(current);
			resetMatch();
		}

		playerCount++;
	}

	/*
		Utility function for resetting the state of the current match for adding new
		players into the tournament.
	*/
	function resetMatch() {
		current = Match({
			leftPlayer: Player(address(0x0), bytes32(0x0), false, bytes32(0x0)), 
			rightPlayer: Player(address(0x0), bytes32(0x0), false, bytes32(0x0)), 
			bit: 0
		});
	}

	/*
		Secret revealing stage of protocol
	*/
	function open(bytes32 choice, uint nonce) {
		Player curr = players[msg.sender];
		if (!curr.hasRevealed && sha3(msg.sender, choice, nonce) == curr.commitment) {
			curr.hasRevealed = true;
			curr.choice = choice;
		} else {
			return;
		}
	}

	/*
		Utility function to check that all players have revealed their secret
		in the current round of matches.
	*/
	function haveRevealed() constant returns (bool success) {
		for (uint i = 0; i < matches.length; i++) {
			Match temp = matches[i];
			if (!temp.leftPlayer.hasRevealed || !temp.rightPlayer.hasRevealed) {
				return false;
			}
		}
		return true;
	}

	/*
		Evaluates the winners of each match in a given round. We compute the sum of
		each player's hashed commitment modulo 2, add 1, and determine the winner
		by selecting the left player if value = 1 and the right player if value = 2
	*/
	function checkRound() {
		if (haveRevealed()) {
			for (uint i = 0; i < matches.length; i++) {
				uint value = addmod(
					bytesToUInt(matches[i].leftPlayer.commitment), 
					bytesToUInt(matches[i].rightPlayer.commitment),
					2) + 1;
				if (value == 1) {
					winners.push(matches[i].leftPlayer);
				} else {
					winners.push(matches[i].rightPlayer);
				}
			}
		} else {
			return;
		}

	}

	function bytesToUInt(bytes32 v) constant returns (uint ret) {
        if (v == 0x0) {
            throw;
        }

        uint digit;

        for (uint i = 0; i < 32; i++) {
            digit = uint((uint(v) / (2 ** (8 * (31 - i)))) & 0xff);
            if (digit == 0) {
                break;
            }
            else if (digit < 48 || digit > 57) {
                throw;
            }
            ret *= 10;
            ret += (digit - 48);
        }
        return ret;
    }

	function kill() {
		if (msg.sender == owner) {
			suicide(owner);
		}
	}
}