//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract FoodFrenzyFeast {
  using Counters for Counters.Counter;
  Counters.Counter public numberOfMatches;

  Match[] public matchList;
  mapping(uint256 => uint256[]) public games;
  mapping(uint256 => address[]) public players;
  mapping(address => uint256[]) public playerBag;

  struct Match {
    uint256 id;
    uint256 numberOfPlayers;
    uint256 prizePool;
    bool isFinish;
  }
	
  constructor() {}

  function getMatches() public view returns (Match[] memory){
    return matchList;
  }

  function createMatch() external {
    uint256 newMatchId = numberOfMatches.current();
    matchList.push(Match(newMatchId, 0, 0, false));
    numberOfMatches.increment();
  }

  function joinMatch(uint256 _matchId) external {
    matchList[_matchId].numberOfPlayers += 1;
    players[_matchId].push(msg.sender);
  }

  function startGame(uint256 _matchId) external {
    for(uint i = 0; i < 8; i++){
      uint256 _randomNumber = uint(keccak256(abi.encode(block.timestamp, msg.sender, i))) % 8;
      games[_matchId].push(_randomNumber);
    }
  }

  function takeFood(uint256 _matchId) external {
    uint256 position = getPlayerPosition(_matchId, msg.sender);
    playerBag[msg.sender].push(games[_matchId][position]);
    uint256 _randomNumber = uint(keccak256(abi.encode(block.timestamp, msg.sender))) % 8;
    games[_matchId][position] = _randomNumber;
  }

  function getPlayerPosition(uint256 _matchId, address _player) internal view returns (uint256) {
    for (uint i = 0; i < players[_matchId].length; i++) {
      if (players[_matchId][i] == _player) return i;
    }

    return 0;
  }
}