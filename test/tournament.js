contract('Tournament', function(accounts) {
	it("should hash a bunch of stuff", function(done) {
		var tour = Tournament.deployed();
		var player_one_commit = "0x" + web3.sha3("0x" + web3.sha3("secret_one"), {encoding: "hex"});
		var player_two_commit = "0x" + web3.sha3("0x" + web3.sha3("secret_two"), {encoding: "hex"});

		console.log("Sha P1: " + player_one_commit);
		console.log("Sha P2: " + player_two_commit);
		tour.compute_double_sha.sendTransaction("secret_one", {from: accounts[0]}).then(function(result, data) {
			console.log("Sha from tx: " + result);
			console.log("Test:" + data);
			tour.tempHash.call().then(function(result) {
				console.log("Sha from pub: " + result);
			});
		}).then(done).catch(done);
	});

	it("should complete a lottery between 2 players", function(done) {
		var tour = Tournament.deployed();
		var player_one = accounts[0];
		var player_two = accounts[1];
		var player_one_commit = "0x" + web3.sha3("0x" + web3.sha3("secret_one"), {encoding: "hex"});
		var player_two_commit = "0x" + web3.sha3("0x" + web3.sha3("secret_two"), {encoding: "hex"});
		tour.addPlayer.sendTransaction(player_one_commit, {value: 1000, from: player_one});
		tour.addPlayer.sendTransaction(player_two_commit, {value: 1000, from: player_two});

		tour.revealCount.call().then(function(count) {
			console.log(count.toNumber());
		});

		tour.playerCount.call().then(function(count) {
			assert(2, count.toNumber(), "Error: number of players is not 2");
		});

		tour.open.sendTransaction("secret_one", {from: player_one});
		tour.tempHash.call().then(function(result) {
			console.log("First commit: " + result);
		});

		tour.open.sendTransaction("secret_two", {from: player_two});
		tour.tempHash.call().then(function(result) {
			console.log("Second commit: " + result);
		});

		tour.revealCount.call().then(function(result) {
			assert.equal(2, result.toNumber(), "Two players haven't revealed yet");
		});




		tour.matchCount.call().then(function(count) {
			assert.equal(1, count.toNumber(), "Error: not a single match in the lottery");
		}).then(done).catch(done);
	});
});