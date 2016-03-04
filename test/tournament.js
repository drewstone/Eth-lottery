contract('Tournament', function(accounts) {
	it("should print a tournament pot of 0", function(done) {
		var tour = Tournament.deployed();
		tour.tournamentPot().then(function(result) {
			console.log("TOURNAMENTPOT: " + result.toString());
		}).then(tour.playerCount().then(function(result) {
			console.log("PLAYERCOUNT: " + result.toString());
		})).then(done).catch(done);
	});

	it("should send excess coins back to player", function(done) {
		var tour = Tournament.deployed();

		var first = accounts[0];
		var second = accounts[1];

		var first_secret = "Testing";
		var second_secret = "Whoops";
		var first_commit = web3.sha3(first_secret);
		var second_commit = web3.sha3(second_secret);
		tour.addPlayer.sendTransaction(first_commit, {value: 10000, from: first, gas: 1000000});
		tour.addPlayer.sendTransaction(second_commit, {value: 10000, from: second, gas: 1000000});


		tour.playerCount.call().then(function(data) {
			console.log("THIS: " + data);
		}).then(done).catch(done);
	});
});