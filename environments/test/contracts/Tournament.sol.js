// Factory "morphs" into a Pudding class.
// The reasoning is that calling load in each context
// is cumbersome.

var contract_data = {
  abi: [{"constant":false,"inputs":[{"name":"input","type":"bytes"}],"name":"single_sha","outputs":[{"name":"result","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"playerCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"choice","type":"bytes"}],"name":"open","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"matches","outputs":[{"name":"leftPlayer","type":"address"},{"name":"rightPlayer","type":"address"},{"name":"bit","type":"bool"}],"type":"function"},{"constant":false,"inputs":[],"name":"checkRound","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"input","type":"bytes"}],"name":"double_sha","outputs":[{"name":"result","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"matchCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"testValue","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"tournamentPot","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"winners","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"tempHash","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"revealCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"input","type":"bytes"},{"name":"nonce","type":"bytes"}],"name":"multiple_sha","outputs":[{"name":"result","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[],"name":"tempWinner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"players","outputs":[{"name":"account","type":"address"},{"name":"commitment","type":"bytes32"},{"name":"choice","type":"bytes"},{"name":"hasRevealed","type":"bool"},{"name":"eliminated","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"commit","type":"bytes32"}],"name":"addPlayer","outputs":[{"name":"latest","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"s","type":"bytes"}],"name":"bytes_to_int","outputs":[{"name":"result","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"sender","type":"address"}],"name":"populateMatch","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"commit","type":"bytes32"}],"name":"resetCommitment","outputs":[],"type":"function"},{"inputs":[],"type":"constructor"}],
  binary: "606060405260008054600160a060020a03191633178155600381905560048190556005819055600655610e3b806100366000396000f3606060405236156100fb5760e060020a60003504632a46bd0381146100fd578063302bcc571461017c578063382f431b1461018557806341c0e1b5146102e65780634768d4ef1461031057806369bbe5c714610348578063728d64261461040857806379c4264b146104995780638af5de72146104a25780638da5cb5b146104ab57806394db0d1c146104bd578063a2fb1175146104c6578063a8e90ff81461050c578063aed5be3514610515578063bab66c131461051e578063d8e8d9cb146105ff578063e2eb41ff14610611578063e48e0b0b1461064e578063e5752cfe14610747578063f63d0633146107c6578063fb570bc814610840575b005b6040805160206004803580820135601f8101849004840285018401909552848452610875949193602493909291840191908190840183828082843750949650505050505050600081604051808280519060200190808383829060006004602084601f0104600f02600301f150909101829003909120925050505b919050565b61087560035481565b6040805160206004803580820135601f81018490048402850184019095528484526100fb949193602493909291840191908190840183828082843750949650505050505050600160a060020a0333166000908152600a602052604090206003015460ff161580156102045750604060002060030154610100900460ff16155b15610a575780604051808280519060200190808383829060006004602084601f0104600f02600301f1509091018290038220825250604080519182900360209081019092206008819055600160a060020a0333166000908152600a90935291206001015414159050610a57576040600090812060068054600190810190915560038201805460ff19168217905583516002928301805481865260209586902091959381161561010002600019011693909304601f9081018390048401939192860190839010610a5c57805160ff19168380011785555b50610a54929150610733565b6100fb600054600160a060020a0390811633919091161415610e3957600054600160a060020a0316ff5b610887600435600960205260009081526040902060018101549054600160a060020a03908116919081169060a060020a900460ff1683565b6100fb60006000600060006003600050546006600050541415610a8c575b600554841015610a8c5760008481526009602090815260408083208054600160a060020a039081168552600a845282852060019283015490911685529382902060029081018054845193811615610100026000190116829004601f81018690048602840186019094528383529481019750939550610a929290918691830182828015610b1c5780601f10610af157610100808354040283529160200191610b1c565b6040805160206004803580820135601f8101849004840285018401909552848452610875949193602493909291840191908190840183828082843750949650505050505050600081604051808280519060200190808383829060006004602084601f0104600f02600301f1509091018290038220825250604051908190036020019020600881905591506101779050565b61087560055481565b61087560075481565b6108b1600054600160a060020a031681565b61087560045481565b6108b160043560028054829081101561000257506000527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace0154600160a060020a031681565b61087560085481565b61087560065481565b6040805160206004803580820135601f8101849004840285018401909552848452610875949193602493909291840191908190840183828082843750506040805160208835808b0135601f810183900483028401830190945283835297999860449892975091909101945090925082915084018382808284375094965050505050505060008282604051808380519060200190808383829060006004602084601f0104600f02600301f1509050018280519060200190808383829060006004602084601f0104600f02600301f1509091018290039091209695505050505050565b6108b1600154600160a060020a031681565b6108ce600435600a602052600090815260409020600181015460038201548254600160a060020a0316926002019060ff8181169161010090041685565b61087560043560006103e834106109865760006103e83403111561069157604051600160a060020a0333169082906103e71934019082818181858883f150505050505b600480546103e801905533600160a060020a0381166000818152600a602081815260408084208054600160a060020a0319169096178655600180870189905581518084019283905285815295855292825293516002958601805481865294839020909693851615610100026000190190941692909204601f908101919091048301939192919083901061098e57805160ff19168380011785555b506109be9291505b808211156109ee5760008155600101610733565b6040805160206004803580820135601f81018490048402850184019095528484526108759491936024939092918401919081908401838280828437509496505050505050505b600080805b835181101561097f578381815181101561000257016020015160f860020a9081900481020460080290910190600101610792565b6100fb6004355b60055460009081526009602052604090206001015460a060020a900460ff16156109f957806009600050600060056000818150548092919060010191905055815260200190815260200160002060005060010160006101000a815481600160a060020a0302191690830217905550610a47565b6100fb600435600160a060020a0333166000908152600a602052604090206003015460ff6101009091041615610d6b57610a51565b60408051918252519081900360200190f35b60408051600160a060020a0394851681529290931660208301528183015290519081900360600190f35b60408051600160a060020a03929092168252519081900360200190f35b60408051600160a060020a038716815260208101869052606081018490526080810183905260a0918101828152855460026001821615610100026000190190911604928201839052909160c08301908690801561096c5780601f106109415761010080835404028352916020019161096c565b820191906000526020600020905b81548152906001019060200180831161094f57829003601f168201915b5050965050505050505060405180910390f35b5092915050565b506000610177565b8280016001018555821561072b579182015b8281111561072b5782518260005055916020019190600101906109a0565b505033600160a060020a0381166000908152600a60205260409020600301805461ffff191690556109f2906107cd565b5090565b5080610177565b600580546000908152600960205260408082208054600160a060020a031916851790559154815220600101805474ff0000000000000000000000000000000000000000191660a060020a1790555b6003805460010190555b50565b50505b610a51565b828001600101855582156102da579182015b828111156102da578251826000505591602001919060010190610a6e565b50505050565b845460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152610b269290918891830182828015610b1c5780601f10610af157610100808354040283529160200191610b1c565b820191906000526020600020905b815481529060010190602001808311610aff57829003601f168201915b505050505061078d565b08600190810160078190559150811415610bb75760008481526009602052604090205460018054600160a060020a031916600160a060020a0392909216919091178155600280549182018082559091908281838015829011610c1b576000839052610c1b907f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace908101908301610733565b60008481526009602052604090206001805491810154600160a060020a0316600160a060020a031992909216919091178155600280549182018082559091908281838015829011610c8a57818360005260206000209182019101610c8a9190610733565b50505091909060005260206000209001600060008781526009602090815283546040808420805461010096870a600160a060020a039182168102908202199094169390931790965560019590950154168252600a905291909120600301805461ff001916909117905550610ce3565b50505060009283525060208083208784526009825260408085206001018054929094018054600160a060020a031916600160a060020a039384161790559254168352600a90529020600301805461ff0019166101001790555b604080516060810182526000808252602082810182815283850183815289845260099092529251939091208054600160a060020a03199081169094178155915190516001928301805490941690911774ff0000000000000000000000000000000000000000191660a060020a9190910217909155600380546000190190559390930192610366565b600160a060020a0333166000818152600a60208181526040808420600181810188905560038201805460ff1916905582518085019384905286815296865293835294516002958601805481875295849020909694861615610100026000190190951693909304601f9081019290920484019391839010610dfe57805160ff19168380011785555b50610e2e929150610733565b82800160010185558215610df2579182015b82811115610df2578251826000505591602001919060010190610e10565b5050610a57336107cd565b56",
  unlinked_binary: "606060405260008054600160a060020a03191633178155600381905560048190556005819055600655610e3b806100366000396000f3606060405236156100fb5760e060020a60003504632a46bd0381146100fd578063302bcc571461017c578063382f431b1461018557806341c0e1b5146102e65780634768d4ef1461031057806369bbe5c714610348578063728d64261461040857806379c4264b146104995780638af5de72146104a25780638da5cb5b146104ab57806394db0d1c146104bd578063a2fb1175146104c6578063a8e90ff81461050c578063aed5be3514610515578063bab66c131461051e578063d8e8d9cb146105ff578063e2eb41ff14610611578063e48e0b0b1461064e578063e5752cfe14610747578063f63d0633146107c6578063fb570bc814610840575b005b6040805160206004803580820135601f8101849004840285018401909552848452610875949193602493909291840191908190840183828082843750949650505050505050600081604051808280519060200190808383829060006004602084601f0104600f02600301f150909101829003909120925050505b919050565b61087560035481565b6040805160206004803580820135601f81018490048402850184019095528484526100fb949193602493909291840191908190840183828082843750949650505050505050600160a060020a0333166000908152600a602052604090206003015460ff161580156102045750604060002060030154610100900460ff16155b15610a575780604051808280519060200190808383829060006004602084601f0104600f02600301f1509091018290038220825250604080519182900360209081019092206008819055600160a060020a0333166000908152600a90935291206001015414159050610a57576040600090812060068054600190810190915560038201805460ff19168217905583516002928301805481865260209586902091959381161561010002600019011693909304601f9081018390048401939192860190839010610a5c57805160ff19168380011785555b50610a54929150610733565b6100fb600054600160a060020a0390811633919091161415610e3957600054600160a060020a0316ff5b610887600435600960205260009081526040902060018101549054600160a060020a03908116919081169060a060020a900460ff1683565b6100fb60006000600060006003600050546006600050541415610a8c575b600554841015610a8c5760008481526009602090815260408083208054600160a060020a039081168552600a845282852060019283015490911685529382902060029081018054845193811615610100026000190116829004601f81018690048602840186019094528383529481019750939550610a929290918691830182828015610b1c5780601f10610af157610100808354040283529160200191610b1c565b6040805160206004803580820135601f8101849004840285018401909552848452610875949193602493909291840191908190840183828082843750949650505050505050600081604051808280519060200190808383829060006004602084601f0104600f02600301f1509091018290038220825250604051908190036020019020600881905591506101779050565b61087560055481565b61087560075481565b6108b1600054600160a060020a031681565b61087560045481565b6108b160043560028054829081101561000257506000527f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace0154600160a060020a031681565b61087560085481565b61087560065481565b6040805160206004803580820135601f8101849004840285018401909552848452610875949193602493909291840191908190840183828082843750506040805160208835808b0135601f810183900483028401830190945283835297999860449892975091909101945090925082915084018382808284375094965050505050505060008282604051808380519060200190808383829060006004602084601f0104600f02600301f1509050018280519060200190808383829060006004602084601f0104600f02600301f1509091018290039091209695505050505050565b6108b1600154600160a060020a031681565b6108ce600435600a602052600090815260409020600181015460038201548254600160a060020a0316926002019060ff8181169161010090041685565b61087560043560006103e834106109865760006103e83403111561069157604051600160a060020a0333169082906103e71934019082818181858883f150505050505b600480546103e801905533600160a060020a0381166000818152600a602081815260408084208054600160a060020a0319169096178655600180870189905581518084019283905285815295855292825293516002958601805481865294839020909693851615610100026000190190941692909204601f908101919091048301939192919083901061098e57805160ff19168380011785555b506109be9291505b808211156109ee5760008155600101610733565b6040805160206004803580820135601f81018490048402850184019095528484526108759491936024939092918401919081908401838280828437509496505050505050505b600080805b835181101561097f578381815181101561000257016020015160f860020a9081900481020460080290910190600101610792565b6100fb6004355b60055460009081526009602052604090206001015460a060020a900460ff16156109f957806009600050600060056000818150548092919060010191905055815260200190815260200160002060005060010160006101000a815481600160a060020a0302191690830217905550610a47565b6100fb600435600160a060020a0333166000908152600a602052604090206003015460ff6101009091041615610d6b57610a51565b60408051918252519081900360200190f35b60408051600160a060020a0394851681529290931660208301528183015290519081900360600190f35b60408051600160a060020a03929092168252519081900360200190f35b60408051600160a060020a038716815260208101869052606081018490526080810183905260a0918101828152855460026001821615610100026000190190911604928201839052909160c08301908690801561096c5780601f106109415761010080835404028352916020019161096c565b820191906000526020600020905b81548152906001019060200180831161094f57829003601f168201915b5050965050505050505060405180910390f35b5092915050565b506000610177565b8280016001018555821561072b579182015b8281111561072b5782518260005055916020019190600101906109a0565b505033600160a060020a0381166000908152600a60205260409020600301805461ffff191690556109f2906107cd565b5090565b5080610177565b600580546000908152600960205260408082208054600160a060020a031916851790559154815220600101805474ff0000000000000000000000000000000000000000191660a060020a1790555b6003805460010190555b50565b50505b610a51565b828001600101855582156102da579182015b828111156102da578251826000505591602001919060010190610a6e565b50505050565b845460408051602060026001851615610100026000190190941693909304601f8101849004840282018401909252818152610b269290918891830182828015610b1c5780601f10610af157610100808354040283529160200191610b1c565b820191906000526020600020905b815481529060010190602001808311610aff57829003601f168201915b505050505061078d565b08600190810160078190559150811415610bb75760008481526009602052604090205460018054600160a060020a031916600160a060020a0392909216919091178155600280549182018082559091908281838015829011610c1b576000839052610c1b907f405787fa12a823e0f2b7631cc41b3ba8828b3321ca811111fa75cd3aa3bb5ace908101908301610733565b60008481526009602052604090206001805491810154600160a060020a0316600160a060020a031992909216919091178155600280549182018082559091908281838015829011610c8a57818360005260206000209182019101610c8a9190610733565b50505091909060005260206000209001600060008781526009602090815283546040808420805461010096870a600160a060020a039182168102908202199094169390931790965560019590950154168252600a905291909120600301805461ff001916909117905550610ce3565b50505060009283525060208083208784526009825260408085206001018054929094018054600160a060020a031916600160a060020a039384161790559254168352600a90529020600301805461ff0019166101001790555b604080516060810182526000808252602082810182815283850183815289845260099092529251939091208054600160a060020a03199081169094178155915190516001928301805490941690911774ff0000000000000000000000000000000000000000191660a060020a9190910217909155600380546000190190559390930192610366565b600160a060020a0333166000818152600a60208181526040808420600181810188905560038201805460ff1916905582518085019384905286815296865293835294516002958601805481875295849020909694861615610100026000190190951693909304601f9081019290920484019391839010610dfe57805160ff19168380011785555b50610e2e929150610733565b82800160010185558215610df2579182015b82811115610df2578251826000505591602001919060010190610e10565b5050610a57336107cd565b56",
  address: "0x8b7ddd879198c05e1b5a1423527f1a51e96570ec",
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
