var path = require('path');
var fs = require('fs');
const axios = require('axios');


const baseUrl = "https://www.fotmob.com";
const playerPath = "./players.json"

async function fetchPlayers(playerId) {
  const playerurl = "https://www.fotmob.com/playerData?id=" + playerId
  return await axios.get(playerurl);
}


async function getPlayerInfo() {
	fs.readFile(playerPath, 'utf-8', function(err, data) {
		const arrayOfPlayers = JSON.parse(data);
    const players = arrayOfPlayers.players;
    let playerRequests = [];

    players.forEach(player => {
      playerRequests.push(fetchPlayers(player.playerId));
    });

    let playerDataArray = Promise.all(playerRequests).then(res => {
      let playerArray = res.map(playerData => {
        // console.log('Player Data: ', playerData.data)
        var player = new Object();
        player.name = playerData.data.name;
        player.playerId = playerData.data.id;
        player.teamId = playerData.data.origin.teamId;
        player.teamName = playerData.data.origin.teamName;
        const playerProps = Array.isArray(playerData.data.playerProps) ? playerData.data.playerProps : new Array(playerData.data.playerProps);
        const country = playerProps.find(obj => {
          return obj.title === "Country" 
        });
        player.country = country.value;

        return player
      });

      let playerObject = new Object();
      playerObject.players = playerArray;
      const content = JSON.stringify(playerObject, null, 2);
      // console.log('content?', content)

      fs.writeFile(playerPath, content, 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file was saved!");
      }); 

      console.log('console', playerArray);

    }).catch(error => {
      // handle error
      console.log('error: ', error);
    });
  })
}

getPlayerInfo();
