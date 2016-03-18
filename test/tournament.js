contract('Tournament', function(accounts) {
	it("should complete a lottery between 2 players", function(done) {
		var tour = Tournament.deployed();
		var player_one = accounts[0];
		var player_two = accounts[1];
		var player_one_commit = "0x" + web3.sha3("0x" + web3.sha3("secret_one"), {encoding: "hex"});
		var player_two_commit = "0x" + web3.sha3("0x" + web3.sha3("secret_two"), {encoding: "hex"});
		console.log("Player one commit: " + player_one_commit);
		console.log("Player two commit: " + player_two_commit);
		tour.addPlayer.sendTransaction(player_one_commit, {value: 1000, from: player_one});
		tour.addPlayer.sendTransaction(player_two_commit, {value: 1000, from: player_two});

		tour.playerCount.call().then(function(result) {
			assert(2, result.toNumber(), "Error: number of players is not 2");
		});

		tour.open.sendTransaction("secret_one", {from: player_one});
		tour.open.sendTransaction("secret_two", {from: player_two}).then(
			tour.revealCount.call().then(function(result) {
				console.log("Number of players revealed: " + result.toNumber());
				assert.equal(2, result.toNumber(), "Both players haven't revealed yet");
			})
		).then(tour.matchCount.call().then(function(result) {
				console.log("Number of matches: " + result.toNumber());
				assert.equal(1, result.toNumber(), "Error in number of matches");
			})
		);

		tour.checkRound.sendTransaction({}, {from: player_one}).then(
			tour.playerCount.call().then(function(result) {
				assert.equal(1, result.toNumber(), "Loser has not been properly disqualified");
			})
		);

		tour.matchCount.call().then(function(result) {
			assert.equal(0, result.toNumber(), "There shouldn't be any open matches")
		}).then(done).catch(done);
	});
});
