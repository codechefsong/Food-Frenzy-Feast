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
    bool isStarted;
  }
	
  constructor() {}

  function getMatches() public view returns (Match[] memory){
    return matchList;
  }

  function getMatcheByID(uint256 _matchId) public view returns (Match memory){
    return matchList[_matchId];
  }

  function getPlayersByID(uint256 _matchId) public view returns (address[] memory){
    return players[_matchId];
  }

  function createMatch() external {
    uint256 newMatchId = numberOfMatches.current();
    matchList.push(Match(newMatchId, 0, 0, false, false));
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
    matchList[_matchId].isStarted = true;
  }

  function takeFood(uint256 _matchId) external {
    uint256 position = getPlayerPosition(_matchId, msg.sender);
    playerBag[msg.sender].push(games[_matchId][position]);
    uint256 _randomNumber = uint(keccak256(abi.encode(block.timestamp, msg.sender))) % 8;
    games[_matchId][position] = _randomNumber;
  }

  function moveTableToRight(uint256 _matchId) external {
    uint256 num = games[_matchId][games[_matchId].length - 1];
    for (uint256 i =  games[_matchId].length - 1; i > 0; i--) {
      games[_matchId][i] =  games[_matchId][i - 1];
    }
    games[_matchId][0] = num;
  }

  function getPlayerPosition(uint256 _matchId, address _player) internal view returns (uint256) {
    for (uint i = 0; i < players[_matchId].length; i++) {
      if (players[_matchId][i] == _player) return i;
    }

    return 0;
  }

  function getGame(uint256 _matchId) external view returns (uint256[] memory) {
    return games[_matchId];
  }

  function getPlayerBag(address player) external view returns (uint256[] memory) {
    return playerBag[player];
  }
}