//arik5.js

let URL = 'http://api.football-data.org/v4/competitions' ;


fetch(URL).then(
    r => r.json()).then(
    data => {
        let Big4 = data.competitions.filter(liga => liga.plan === "TIER_ONE" & (
                liga.area.code === "ESP" ||
                liga.area.code === "ENG" ||
                liga.area.code === "ITA" ||
                liga.area.code === "FRA"
            )
        ).filter(emaitza => emaitza.name !== "Championship")
            .map(liga => liga.id);
        console.log("Big4 txapelketen IDak:");
        console.log(Big4);
        console.log("Guztira:", Big4.length, "liga");
    }).catch(err => console.error("ERROREA", err));
