var accounts;

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    lottery();
  });
}

function lottery() {
  tour = Tournament.deployed();
  var first = accounts[0];
  var second = accounts[1];

  var first_secret = "secret_one";
  var second_secret = "secret_two";
  var first_commit = web3.sha3(first_secret);
  var second_commit = web3.sha3(second_commit);

  addPlayer(first, first_commit);
  addPlayer(second, second_commit);
  buildMatchTree();
}

function addPlayer(address, commitment) {
  tour = Tournament.deployed();
  tour.addPlayer(commitment, {value:1000, from: address});
}

function buildMatchTree() {
  tour = Tournament.deployed();
  tour.createMatches({value: 0}).then(function(data) {
    console.log(data.toNumber());
  });
}
