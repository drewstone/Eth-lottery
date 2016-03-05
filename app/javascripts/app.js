var accounts;
window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    } else if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }
    accounts = accs;
    lottery();
  });
}

function lottery() {
  var tour = Tournament.deployed()
  addPlayers();
}

function addPlayers() {
  var tour = Tournament.deployed();
  for (var i = 0; i < accounts.length; i++) {
    var hash = web3.sha3(accounts[i] + i);
    tour.addPlayer.sendTransaction(hash, {value: 1000, from: accounts[i], gas:1000000});
    $("<tr><td class='text-left'>" + accounts[i] + "</td>" + 
      "<td class='text-left'>" + hash + "</td>" + 
      "<td class='text-left'>" + "Not Revealed" + "</td></tr>").appendTo('#players');
  }
}
