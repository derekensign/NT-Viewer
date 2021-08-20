var path = require('path');
var fs = require('fs');
const axios = require('axios');


const baseUrl = "https://www.fotmob.com";


function getPlayerInfo() {
	console.log('calling this');
	fs.readFile('./players.json', 'utf-8', function(err, data) {
		const arrayOfPlayers = JSON.parse(data);
    const players = arrayOfPlayers.players;
    console.log('players:', players);
    const playerRequests = [];

    // Create request to pull the player teamName and teamId.
    players.forEach(player => {
      const url = "https://www.fotmob.com/playerData?id=" + player.playerId
      axios.get(url)
        .then(function (response) {
          // handle success
          console.log(response.data);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      
    })
      // fs.writeFile('./json/items/' + folderIndex + '/'+ itemArea + '.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
      //   if (err) throw err
      //   console.log('JSON Sent!');
      //   sendJSON();
      // })
  })
}

getPlayerInfo();