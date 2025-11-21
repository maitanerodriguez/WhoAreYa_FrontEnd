//arik6.js

//2.3
const fs = require('fs');
let URL = 'https://api.football-data.org/v4/competitions/2021/teams';
let TOKEN = '1031d6503b434d379d0e5745bd360246';

fetch(URL, {
    headers: {
        "X-Auth-Token": TOKEN }
})
    .then(res => res.json())
    .then(data => {
        fs.writeFile("premiere.json", JSON.stringify(data, null, 2), "utf-8", (err) => {
            if (err) {
                console.log("Ezin da sortu: ERROREA!");
            } else {
                console.log("premiere.json sortua!");
            }
        })
    });

//Erazagupenak
let premierTaldeak = fs.readFileSync("./premiere.json", "utf8");
let data = JSON.parse(premierTaldeak);

let ligaID = data.competition.id;

let jokalariak = [];

//2.3.1
data.teams.forEach(team => {
    team.squad.forEach(jokalaria => {
        jokalaria.teamId = team.id; //taldeko id-a gehitzeko atributu berri bat sortu eta bertan taldeko id-a zehaztu
        jokalaria.leagueId = ligaID; //ligako id-a gehitzeko atributu berri bat sortu eta bertan ligako id-a zehaztu
        jokalariak.push(jokalaria); //update
    });
});

//2.3.2
data.teams.forEach(team => {
    team.squad.forEach(jokalaria => {
        if (jokalaria.dateOfBirth) {
            jokalaria.birthDate = jokalaria.dateOfBirth; //atributu berria sortu
            delete jokalaria.dateOfBirth;             //jatorrizkoa ezabatu
        }
        jokalariak.push(jokalaria); //update
    });
});

//2.3.3
data.teams.forEach(team => {
    team.squad.forEach(jokalaria => {
        if (jokalaria.position === "Goalkeeper") {
            jokalaria.position = "GK";
        } else if (jokalaria.position === "Defence" | "Centre-Back" | "Right-Back" | "Left-Back") {
            jokalaria.position = "DF";
        } else if (jokalaria.position ===  "Midfield" | "Central Midfield" | "Defensive Midfield" | "Attacking Midfield" | "Left Midfield") {
            jokalaria.position = "MF";
        } else if (jokalaria.position === "Offence" | "Centre-Forward" | "Right Winger" | "Left Winger") {
            jokalaria.position = "FW";
        }
    });
});

//update .json
fs.writeFile("./premiere.json", JSON.stringify(data, null, 2), "utf-8", (err) => {
    if (err) {
        console.log("Ezin da sortu: ERROREA!");
    } else {
        console.log("premiere.json sortua!");
    }
});