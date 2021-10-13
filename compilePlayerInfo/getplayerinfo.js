var path = require('path');
var fs = require('fs');
const axios = require('axios');


const baseUrl = "https://www.fotmob.com";
const playerPath = "./players.json"

async function fetchPlayers(playerId) {
  const playerurl = "https://www.fotmob.com/playerData?id=" + playerId
  let player = new Object();
  let response = await axios.get(playerurl).then(res => {
    content = res.data
    // console.log('dattttt', content)
    player.name = content.name;
    player.playerId = content.id;
    player.teamId = content.origin.teamId;
    player.teamName = content.origin.teamName;
    const playerProps = Array.isArray(content.playerProps) ? content.playerProps : new Array(content.playerProps);
    const country = playerProps.find(obj => {
      return obj.title === "Country" 
    });
    player.country = country.value;
    return player;
    // console.log('ressss', res);
  });

  console.log('player:', player)

}


async function getPlayerInfo() {
	fs.readFile(playerPath, 'utf-8', function(err, data) {
		const arrayOfPlayers = JSON.parse(data);
    const players = arrayOfPlayers.players;
    let playerRequests = [];
    let playerDataArray = [];

    players.forEach(player => {
      playerRequests.push(fetchPlayers(player.playerId));
    });

    console.log('player requests:', playerRequests);

    let datum = Promise.all(playerRequests).then(res => {
      console.log('rezzzz', res)
    });

    console.log('datum', datum)

    // console.log('boomer stuff', boomerstuff)

    // console.log('players:', players);

    // Create request to pull the player teamName and teamId.
	  let datar = players;
    playerDataArray = [];
    players.forEach(player => {
      const url = "https://www.fotmob.com/playerData?id=" + player.playerId
      axios.get(url)
        .then(function (response) {
          var player = new Object();
          player.name = response.data.name;
          player.playerId = response.data.id;
          player.teamId = response.data.origin.teamId;
          player.teamName = response.data.origin.teamName;
          const playerProps = Array.isArray(response.data.playerProps) ? response.data.playerProps : new Array(response.data.playerProps);
          const country = playerProps.find(obj => {
            return obj.title === "Country" 
          });
          player.country = country.value;

          // console.log('boomer', playerProps, 'country', country)

          playerDataArray.push(player);
          // handle success
		      //   fs.writeFileSync(path, data,{flag:'a+'});
          // console.log('boo', response.data);
        })
        .catch(function (error) {
          // handle error
          console.log('error: ', error);
        })
        .then(function () {
          // always executed
        });
      
    })
  setTimeout(	() => console.log('new array: ', playerDataArray), 3000)
	console.log('new array: ', playerDataArray)
      // fs.writeFile('./json/items/' + folderIndex + '/'+ itemArea + '.json', JSON.stringify(arrayOfObjects), 'utf-8', function(err) {
      //   if (err) throw err
      //   console.log('JSON Sent!');
      //   sendJSON();
      // })
  })
}

getPlayerInfo();