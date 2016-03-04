contract Tournament {

	address public owner;
	uint public playerCount;
	uint public matchCount;
	uint public tournamentPot;
	Match current;

	struct Match {
		Player leftPlayer;
		Player rightPlayer;
		address winner;
		uint bit;
	}

	struct Player {
		address account;
		bytes32 commitment;
		bool hasCommited;
		uint bet;
	}

	mapping (uint => Match) matches; 

	function Tournament() {
		current = Match({
			leftPlayer: Player(address(0x0), bytes32(0x0), false, 0x0), 
			rightPlayer: Player(address(0x0), bytes32(0x0), false, 0x0), 
			winner: address(0x0),
			bit: 0});
		owner = msg.sender;
		matchCount = 0;
		playerCount = 0;
		tournamentPot = 0;
	}

	function addPlayer(bytes32 commit) public returns (uint num) {
		if (msg.value >= 1000) {
			var over = msg.value - 1000;
			if (over > 0) {
				msg.sender.send(over);
			}

			if (current.bit == 0) {
				current.leftPlayer = Player({
						account: msg.sender,
						commitment: commit,
						hasCommited: false,
						bet: msg.value
				});
				current.bit = 1;
			} else if (current.bit == 1) {
				current.rightPlayer = Player({						
						account: msg.sender,
						commitment: commit,
						hasCommited: false,
						bet: msg.value
				});
			} else {
				matches[matchCount++] = current;
				current = Match({
					leftPlayer: Player({
						account: msg.sender,
						commitment: commit,
						hasCommited: false,
						bet: msg.value}), 
					rightPlayer: Player(address(0x0), bytes32(0x0), false, 0x0), 
					winner: address(0x0),
					bit: 1});
			}

			playerCount = playerCount + 1;
			tournamentPot = tournamentPot + msg.value;
			return playerCount;
		}
	}

	function kill() {
		if (msg.sender == owner) {
			suicide(owner);
		}
	}
}