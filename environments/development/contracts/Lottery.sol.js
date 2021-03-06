// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

var contract_data = {
  abi: [{"inputs":[],"type":"constructor"}],
  binary: "606060405260068060106000396000f3606060405200",
  unlinked_binary: "606060405260068060106000396000f3606060405200",
  address: "0x5df7b13960afb3b46f06caf6c0d0dcd757958931",
  generated_with: "2.0.4",
  contract_name: "Lottery"
};

function Contract() {
  if (Contract.Pudding == null) {
    throw new Error("Lottery error: Please call load() first before creating new instance of this contract.");
  }

  Contract.Pudding.apply(this, arguments);
};

Contract.load = function(Pudding) {
  Contract.Pudding = Pudding;

  Pudding.whisk(contract_data, Contract);

  // Return itself for backwards compatibility.
  return Contract;
}

Contract.new = function() {
  if (Contract.Pudding == null) {
    throw new Error("Lottery error: Please call load() first before calling new().");
  }

  return Contract.Pudding.new.apply(Contract, arguments);
};

Contract.at = function() {
  if (Contract.Pudding == null) {
    throw new Error("Lottery error: lease call load() first before calling at().");
  }

  return Contract.Pudding.at.apply(Contract, arguments);
};

Contract.deployed = function() {
  if (Contract.Pudding == null) {
    throw new Error("Lottery error: Please call load() first before calling deployed().");
  }

  return Contract.Pudding.deployed.apply(Contract, arguments);
};

if (typeof module != "undefined" && typeof module.exports != "undefined") {
  module.exports = Contract;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.Lottery = Contract;
}
