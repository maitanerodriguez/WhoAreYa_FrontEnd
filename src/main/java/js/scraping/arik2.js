//arik2.js

let URL = 'http://api.football-data.org/v4/competitions' ;

//fetch(URL).then(
//            r => r.json()).then(
//                data => {
//                    let Big4 = data.competitions.filter(liga => liga.plan === "TIER_ONE");
//                    console.log("Big4 txapelketak:");
//                    console.log(Big4);
//                    console.log("Guztira:", Big4.length, "liga");
//                }).catch(err => console.error("ERROREA", err));

fetch(URL).then(
    r => r.json()).then(
    data => {
        let laliga = data.competitions.filter(liga=>
            liga.area.name==="Spain" &
            liga.area.code==="ESP" &
            liga.name==="Primera Division" &
            liga.code==="PD");
        console.log("Espainiako liga:");
        console.log(laliga[0]);

    }).catch(err => console.error("ERROREA", err));
