# Lottery
Lottery protocol implemented using smart contracts written in Solidity for the Ethereum blockchain. Includes simple webserver for analyzing commitment scheme from the tools provided in the Truffle development framework. The lottery is built with a tournament tree topology where each player plays against exactly one other player, forming brackets. Winners of each match are successively placed into new matches until there exists only one player left, the winner of the lottery.

The protocol is adapted from the paper: https://eprint.iacr.org/2013/784.pdf
I have included some modifications since this is based off a smart contract system instead of a bitcoin transaction based scheme. Instead of using random lengthed strings as the player's commitment, each player will choose a secret and a commitment = sha3(address, secret, nonce). The winner will be decided by summing the integer representation of two players' commitments and adding 1 to decide the respective winner.
