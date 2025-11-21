import { folder, leftArrow, fetchJSON } from "./fragments.js";
import { setupRows, getPlayer } from "./rows.js";
import { autocomplete } from "./autocomplete.js";

function differenceInDays(date1) {
    const gaur = new Date();
    const sartutakoData = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const gaurkoData = new Date(gaur.getFullYear(), gaur.getMonth(), gaur.getDate());
    return Math.round((gaurkoData - sartutakoData) / (1000 * 60 * 60 * 24));
}

let difference_In_Days = differenceInDays(new Date("2025-10-01"));

window.onload = function () {
    document.getElementById("gamenumber").innerText = difference_In_Days.toString();
    document.getElementById("back-icon").innerHTML = folder + leftArrow;
};

let game = {
    guesses: [],
    solution: null,
    players: [],
    leagues: []
};

function getSolution(players, solutionArray, difference_In_Days) {
    const index = (difference_In_Days - 1) % solutionArray.length;
    const gaurkoJokalariId = solutionArray[index];
    const jokalaria = players.find(p => Number(p.id) === Number(gaurkoJokalariId));
    if (!jokalaria) {
        console.warn("Ez da jokalaria aurkitu!");
        return null;
    }
    console.log("Gaurko jokalaria:", jokalaria);
    return jokalaria;
}

// JSON-ak kargatu eta jokalaria ezarri
Promise.all([
    fetchJSON("json/fullplayers25.json"),
    fetchJSON("json/solution25.json")
]).then(([players, solutionArray]) => {
    game.players = players;
    game.solution = getSolution(players, solutionArray, difference_In_Days);

    if (game.solution) {
        document.getElementById("mistery").src =
            `https://playfootball.games/media/players/${game.solution.id % 32}/${game.solution.id}.png`;

        // addRow funtzioa sortu bakarrik jokalaria existitzen bada
        window.addRow = setupRows(game);
        const input = document.getElementById("myInput");
        autocomplete(input, game);
    }
});

// input event
document.getElementById("myInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const JokalariarenID = parseInt(event.target.value);
        if (!isNaN(JokalariarenID) && window.addRow) {
            window.addRow(JokalariarenID);
            const jokalaria = getPlayer(game, JokalariarenID);
            console.log(jokalaria);
        } else {
            console.log("Zenbakia behar da edo jokalaria ez dago prest!");
        }
    }
});
