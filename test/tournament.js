contract('Tournament', function(accounts) {
	// it("should play a single round of the lottery with 2 players", function(done) {
	// 	var tour = Tournament.deployed();
	// 	var hash = "0x" + web3.sha3("secret_one");
	// 	var hash_of_hash = "0x" + web3.sha3(hash, {encoding: "hex"})
	// 	console.log("Double-Hash: " + hash_of_hash);
	// 	tour.compute_double_sha.call("secret_one").then(function(result) {
	// 		console.log("Double-Sha: " + result);
	// 	})
	// });

	it("should complete a lottery between 2 players", function(done) {
		var tour = Tournament.deployed();
		var player_one = accounts[0];
		var player_two = accounts[1];
		var player_one_commit = "0x" + web3.sha3("0x" + web3.sha3("secret_one"), {encoding: "hex"});
		var player_two_commit = "0x" + web3.sha3("0x" + web3.sha3("secret_two"), {encoding: "hex"});
		tour.addPlayer.sendTransaction(player_one_commit, {value: 1000, from: player_one});
		tour.addPlayer.sendTransaction(player_two_commit, {value: 1000, from: player_two});
		tour.playerCount.call().then(function(count) {
			assert(2, count.toNumber(), "Error: number of players is not 2");
		}).then(function() {
			tour.open.sendTransaction("secret_one", {from: player_one});
			tour.open.sendTransaction("secret_two", {from: player_two});
		});

		tour.getMatchCount.call().then(function(count) {
			assert.equal(1, count.toNumber(), "Error: not a single match in the lottery");
		}).then(done).catch(done);
	});
});