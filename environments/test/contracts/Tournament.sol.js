// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

var contract_data = {
  abi: [{"constant":true,"inputs":[],"name":"playerCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"choice","type":"bytes32"},{"name":"nonce","type":"uint256"}],"name":"open","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"haveRevealed","outputs":[{"name":"success","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"checkRound","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"v","type":"bytes32"}],"name":"bytesToUInt","outputs":[{"name":"ret","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"tournamentPot","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"},{"name":"commit","type":"bytes32"}],"name":"populateMatch","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"commit","type":"bytes32"}],"name":"addPlayer","outputs":[{"name":"num","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[],"name":"resetMatch","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}],
  binary: "600060c081815260e08290526101008290526101208290526060526101c06040526101408181526101608290526101808290526101a082905260805260a081905260038054600160a060020a031990811690915560048290556005805460ff199081169091556006839055600780549092169091556008829055600980549091169055600a819055600b5560008054600160a060020a031916331781556001819055600255610a37806100b26000396000f36060604052361561008d5760e060020a6000350463302bcc57811461008f57806341c0e1b51461009857806357d1f3b8146100c157806360a1f1791461015257806369bbe5c7146101c857806381a33a6f146101d75780638da5cb5b146101ef57806394db0d1c14610201578063b7ce53bf1461020a578063e48e0b0b146102df578063ecd5289b1461030e575b005b6103ca60015481565b61008d600054600160a060020a039081163390911614156103c857600054600160a060020a0316ff5b61008d60043560243533600160a060020a03166000908152601060205260409020600281015460ff1615801561013157506001810154604080516c0100000000000000000000000033600160a060020a031602815260148101869052603481018590529051908190036054019020145b1561014d5760028101805460ff19166001179055600381018390555b505050565b6103ca5b600080805b600c5482101561067757600c805483908110156100025760009182526009027fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c7019050600281015490915060ff1615806101ba5750600681015460ff16155b15610681576000925061067c565b61008d6000600061068d610156565b6103ca6004355b60008080838114156109d957610002565b6103dc600054600160a060020a031681565b6103ca60025481565b61008d6004356024355b600b546000141561046d57604080516080810182528381526020818101849052600082840181905260609290920182905260038054600160a060020a03199081168717825560048681556005805460ff19908116825560068781556001600b8190558a8952600f88528989208054841682179055600160a060020a033381168a526010909852865499909820805490951698909616979097178355905494820194909455925460028401805490951660ff9190911617909355549101555b60018054810190555b5050565b6103ca60043533600160a060020a0390811660008181526010602052604081205490921614156103f957610468565b61008d5b6040805160e08101825260006060828101828152608084810184905260a0850184905260c085018490529084528451908101855282815260208181018481528287018581528385018681528784018590528789018790529651805160038054600160a060020a0319908116909217905593810151600455978801516005805460ff19908116909217905597909401516006559151600780549092161790555160085551600980549094161790925551600a55600b555b565b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b6000828152600f602052604090205460ff161561041557610468565b6103e834106104685760006103e8340311156104515760405133600160a060020a0316906000906103e71934019082818181858883f150505050505b61045b3383610214565b5060028054340190556001545b919050565b604080516080810182528381526020818101849052600082840181905260609290920182905260078054600160a060020a031990811687179182905560088681556009805460ff199081168255600a878155600160a060020a038b81168952601088528989208054909616961695909517845591546001848101919091559054600284018054841660ff92909216919091179055925460039290920191909155858452600f90925292909120805490911682179055600c805491820180825590919082818380158290116105c2576009028160090283600052602060002091820191016105c291905b80821115610673578054600160a060020a0319908116825560006001830181815560028401805460ff1990811690915560038501839055600485018054909416909355600584018290556006840180549093169092556007830181905560089290920191909155610556565b50505091909060005260206000209060090201600050600380548254600160a060020a0319908116600160a060020a039283161784556004805460018601556005805460028701805460ff1990811660ff9384161790915560068054978901979097556007805494890180549096169490961693909317909355600880549187019190915560095494860180549092169490921693909317909255600a5490830155600b54910155506102d2610312565b5090565b600192505b505090565b6001919091019061015b565b156106e657600091505b600c548210156106e65760026106eb600c600050848154811015610002576000919091526009027fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8cc01546101de565b6102db565b61072d600c6000508581548110156100025750600052600985027fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c801546101de565b08600101905080600114156107a557600d80546001810180835582818380158290116107db576004028160040283600052602060002091820191016107db91905b80821115610673578054600160a060020a031916815560006001820181815560028301805460ff191690556003929092015561076e565b600d80546001810180835582818380158290116108d6576004028160040283600052602060002091820191016108d6919061076e565b505050919090600052602060002090600402016000600c80548690811015610002575090528054600985027fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c7810154600160a060020a0316600160a060020a0319929092169190911782557fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c881015460018301556002820180547fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c983015460ff1660ff19919091161790557fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8ca015460039190910155506109cd565b505050919090600052602060002090600402016000600c8054869081101561000257509052600984027fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8cb8101548254600160a060020a031916600160a060020a03919091161782557fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8cc81015460018301557fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8cd81015460028301805460ff191660ff929092169190911790557fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8ce015460039190910155505b60019190910190610697565b5060005b6020811015610a0257601f81900360080260020a840460ff1691506000821415610a09575b5050919050565b6030821080610a185750603982115b15610a2257610002565b600a929092028101602f1901916001016109dd56",
  unlinked_binary: "600060c081815260e08290526101008290526101208290526060526101c06040526101408181526101608290526101808290526101a082905260805260a081905260038054600160a060020a031990811690915560048290556005805460ff199081169091556006839055600780549092169091556008829055600980549091169055600a819055600b5560008054600160a060020a031916331781556001819055600255610a37806100b26000396000f36060604052361561008d5760e060020a6000350463302bcc57811461008f57806341c0e1b51461009857806357d1f3b8146100c157806360a1f1791461015257806369bbe5c7146101c857806381a33a6f146101d75780638da5cb5b146101ef57806394db0d1c14610201578063b7ce53bf1461020a578063e48e0b0b146102df578063ecd5289b1461030e575b005b6103ca60015481565b61008d600054600160a060020a039081163390911614156103c857600054600160a060020a0316ff5b61008d60043560243533600160a060020a03166000908152601060205260409020600281015460ff1615801561013157506001810154604080516c0100000000000000000000000033600160a060020a031602815260148101869052603481018590529051908190036054019020145b1561014d5760028101805460ff19166001179055600381018390555b505050565b6103ca5b600080805b600c5482101561067757600c805483908110156100025760009182526009027fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c7019050600281015490915060ff1615806101ba5750600681015460ff16155b15610681576000925061067c565b61008d6000600061068d610156565b6103ca6004355b60008080838114156109d957610002565b6103dc600054600160a060020a031681565b6103ca60025481565b61008d6004356024355b600b546000141561046d57604080516080810182528381526020818101849052600082840181905260609290920182905260038054600160a060020a03199081168717825560048681556005805460ff19908116825560068781556001600b8190558a8952600f88528989208054841682179055600160a060020a033381168a526010909852865499909820805490951698909616979097178355905494820194909455925460028401805490951660ff9190911617909355549101555b60018054810190555b5050565b6103ca60043533600160a060020a0390811660008181526010602052604081205490921614156103f957610468565b61008d5b6040805160e08101825260006060828101828152608084810184905260a0850184905260c085018490529084528451908101855282815260208181018481528287018581528385018681528784018590528789018790529651805160038054600160a060020a0319908116909217905593810151600455978801516005805460ff19908116909217905597909401516006559151600780549092161790555160085551600980549094161790925551600a55600b555b565b60408051918252519081900360200190f35b60408051600160a060020a03929092168252519081900360200190f35b6000828152600f602052604090205460ff161561041557610468565b6103e834106104685760006103e8340311156104515760405133600160a060020a0316906000906103e71934019082818181858883f150505050505b61045b3383610214565b5060028054340190556001545b919050565b604080516080810182528381526020818101849052600082840181905260609290920182905260078054600160a060020a031990811687179182905560088681556009805460ff199081168255600a878155600160a060020a038b81168952601088528989208054909616961695909517845591546001848101919091559054600284018054841660ff92909216919091179055925460039290920191909155858452600f90925292909120805490911682179055600c805491820180825590919082818380158290116105c2576009028160090283600052602060002091820191016105c291905b80821115610673578054600160a060020a0319908116825560006001830181815560028401805460ff1990811690915560038501839055600485018054909416909355600584018290556006840180549093169092556007830181905560089290920191909155610556565b50505091909060005260206000209060090201600050600380548254600160a060020a0319908116600160a060020a039283161784556004805460018601556005805460028701805460ff1990811660ff9384161790915560068054978901979097556007805494890180549096169490961693909317909355600880549187019190915560095494860180549092169490921693909317909255600a5490830155600b54910155506102d2610312565b5090565b600192505b505090565b6001919091019061015b565b156106e657600091505b600c548210156106e65760026106eb600c600050848154811015610002576000919091526009027fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8cc01546101de565b6102db565b61072d600c6000508581548110156100025750600052600985027fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c801546101de565b08600101905080600114156107a557600d80546001810180835582818380158290116107db576004028160040283600052602060002091820191016107db91905b80821115610673578054600160a060020a031916815560006001820181815560028301805460ff191690556003929092015561076e565b600d80546001810180835582818380158290116108d6576004028160040283600052602060002091820191016108d6919061076e565b505050919090600052602060002090600402016000600c80548690811015610002575090528054600985027fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c7810154600160a060020a0316600160a060020a0319929092169190911782557fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c881015460018301556002820180547fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8c983015460ff1660ff19919091161790557fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8ca015460039190910155506109cd565b505050919090600052602060002090600402016000600c8054869081101561000257509052600984027fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8cb8101548254600160a060020a031916600160a060020a03919091161782557fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8cc81015460018301557fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8cd81015460028301805460ff191660ff929092169190911790557fdf6966c971051c3d54ec59162606531493a51404a002842f56009d7e5cf4a8ce015460039190910155505b60019190910190610697565b5060005b6020811015610a0257601f81900360080260020a840460ff1691506000821415610a09575b5050919050565b6030821080610a185750603982115b15610a2257610002565b600a929092028101602f1901916001016109dd56",
  address: "0x9c29dfc08d51af74dbfd0c2459487a8f3764a76d",
  generated_with: "2.0.4",
  contract_name: "Tournament"
};

function Contract() {
  if (Contract.Pudding == null) {
    throw new Error("Tournament error: Please call load() first before creating new instance of this contract.");
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
    throw new Error("Tournament error: Please call load() first before calling new().");
  }

  return Contract.Pudding.new.apply(Contract, arguments);
};

Contract.at = function() {
  if (Contract.Pudding == null) {
    throw new Error("Tournament error: lease call load() first before calling at().");
  }

  return Contract.Pudding.at.apply(Contract, arguments);
};

Contract.deployed = function() {
  if (Contract.Pudding == null) {
    throw new Error("Tournament error: Please call load() first before calling deployed().");
  }

  return Contract.Pudding.deployed.apply(Contract, arguments);
};

if (typeof module != "undefined" && typeof module.exports != "undefined") {
  module.exports = Contract;
} else {
  // There will only be one version of Pudding in the browser,
  // and we can use that.
  window.Tournament = Contract;
}