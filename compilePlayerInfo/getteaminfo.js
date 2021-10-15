var path = require('path');
var fs = require('fs');
const axios = require('axios');


const baseUrl = "https://www.fotmob.com";
const teamPath = "./teams.json"
const playerPath = "./players.json"

async function fetchTeams(teamId) {
  const teamurl = "https://www.fotmob.com//teams?id=" + teamId
  console.log('Requesting Team Id: ', teamId)
  return await axios.get(teamurl);
}

function teamObjectExists(teams, teamId) {
  return teams.findIndex(function(team) {
    return team.teamId === teamId;
  }); 
}


async function getTeamInfo() {
	fs.readFile(playerPath, 'utf-8', function(err, data) {
	  const arrayOfPlayers = JSON.parse(data);
    const players = arrayOfPlayers.players;

    let teamRequests = [];

    let teamsObject = new Object();
    teamsObject.teams = new Array();

    // Iterate on the list of players to create teams Objects
    players.forEach(player => {
      // For Each player create a 
      // Check if the Team Object Exists
      let teamIndex = teamObjectExists(teamsObject.teams, player.teamId);
      if (teamIndex !== -1) {
        // If the Team Object exists, then add player id to the players array of the 'team' object
        console.log('Team Exists Already: ', player.teamName)
        teamsObject.teams[teamIndex].players.push(player.playerId);
      } else {
        // If 'team' Object doesn't exist then create a new 'team' Object
        newTeam = new Object();
        newTeam.players = new Array();
        newTeam.fixtures = new Array();
        newTeam.teamId = player.teamId;
        newTeam.teamName = player.teamName;
        newTeam.players.push(player.playerId);
        teamsObject.teams.push(newTeam);
      }
    });

    // Make requests for each team


    // Write to file
    const content = JSON.stringify(teamsObject, null, 2);
    fs.writeFile(teamPath, content, 'utf8', function (err) {
        if (err) {
          return console.log(err);
        }

        console.log("The file was saved!");
    }); 

    // console.log('teams: ', content)
    // let playerDataArray = Promise.all(playerRequests).then(res => {
    //   let playerArray = res.map(playerData => {
    //     // console.log('Player Data: ', playerData.data)
    //     var player = new Object();
	// 	let playerPositions = new Array();
    //     player.name = playerData.data.name;
    //     player.playerId = playerData.data.id;
    //     player.teamId = playerData.data.origin.teamId;
    //     player.teamName = playerData.data.origin.teamName;
    //     const playerProps = Array.isArray(playerData.data.playerProps) ? playerData.data.playerProps : new Array(playerData.data.playerProps);
    //     const country = playerProps.find(obj => {
    //       return obj.title === "Country" 
    //     });
	// 	const age = playerProps.find(obj => {
    //       return obj.title === "Age" 
    //     });
	// 	playerData.data.origin.positionDesc.primaryPosition !== null ? playerPositions.push(playerData.data.origin.positionDesc.primaryPosition) : console.log('No position for: ', playerData.data.name);
    //     playerData.data.origin.positionDesc.nonPrimaryPositions !== null && typeof playerData.data.origin.positionDesc.nonPrimaryPositions == 'string' ? 
	// 		// console.log('yay!') : 
	// 		playerPositions.push.apply(playerPositions, playerData.data.origin.positionDesc.nonPrimaryPositions.split(', ')) : 
	// 		null;
	// 	player.playerPosition = playerPositions
	// 	player.country = country.value;
	// 	player.age = age.value;

    //     return player
    //   });


    // }).catch(error => {
    //   // handle error
    //   console.log('error: ', error);
    // });
  })
}

getTeamInfo();
