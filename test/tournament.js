contract('Tournament', function(accounts) {
	it("should play a single round of the lottery with 2 players", function(done) {
		var tour = Tournament.deployed();
		var h_one = web3.sha3("secret_one");
		var h_two = web3.sha3(web3.sha3("secret_one"), {encoding: 'hex'});
		console.log(h_two);
		tour.doubleSha.call("secret_one").then(function(result) {
			console.log(result);
		}).then(done).catch(done);
	});
});