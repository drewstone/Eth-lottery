contract('Tournament', function(accounts) {
	it("should print a tournament pot and player count of 0", function(done) {
		var tour = Tournament.deployed();
		tour.tournamentPot().then(function(result) {
			assert.equal(0, result.toNumber());
		}).then(tour.playerCount().then(function(result) {
			assert.equal(0, result.toNumber());
		})).then(done).catch(done);
	});

	it("should add two new players", function(done) {
		var tour = Tournament.deployed();

		var first = accounts[0];
		var second = accounts[1];
		var first_commit = web3.sha3("Account: " + 0);
		var second_commit = web3.sha3("Account: " + 1);

		tour.addPlayer.sendTransaction(first_commit, {value: 10000, from: first, gas: 1000000});
		tour.addPlayer.sendTransaction(second_commit, {value: 10000, from: second, gas: 1000000});

		tour.playerCount.call().then(function(data) {
			assert.equal(2, data.toNumber());
		}).then(tour.matchCount.call().then(function(data) {
			assert.equal(1, data.toNumber());
		})).then(done).catch(done);
	});

	it("should add many new players", function(done) {
		var tour = Tournament.deployed();

		for (var i = 0; i < accounts.length; i++) {
			tour.addPlayer.sendTransaction(web3.sha3("Account: " + i), {value: 1000, from: accounts[i], gas:1000000});
		}

		tour.playerCount.call().then(function(data) {
			assert.equal(10, data.toNumber());
		}).then(tour.matchCount.call().then(function(data) {
			assert.equal(5, data.toNumber());
		})).then(done).catch(done);
	});
});