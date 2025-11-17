//arik1.js

let URL = 'http://api.football-data.org/v4/competitions' ;

fetch(URL).then(
    r => r.json()).then(
    data => {
        let emaitza = data.competitions.filter(txapelketa => txapelketa.id === 2014);
        console.log("ID=2014 duen txapelketa:");
        console.log(emaitza[0]);
    }).catch(err => console.error("ERROREA", err));
