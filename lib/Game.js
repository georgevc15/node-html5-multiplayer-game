module.exports = {
  
   addNewPlayer: function(playerId) {
    
    var players = {};
    players[playerId] = {
			x: 300,
			y: 300,
      direction: "base",
      rotate: 0
		};

    return players;
  },

  removePlayer: function(playerId, players) {
 	delete players[playerId];
  }
       
};