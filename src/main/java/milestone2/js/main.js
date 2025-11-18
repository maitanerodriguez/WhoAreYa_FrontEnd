import { folder, leftArrow, fetchJSON } from "./fragments.js";
import { getPlayer } from "./rows.js";

function differenceInDays(date1) {
    // YOUR CODE HERE
    let gaur = new Date();

    const sartutakoData = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const gaurkoData = new Date(gaur.getFullYear(), gaur.getMonth(), gaur.getDate());

    let diferentzia = gaurkoData - sartutakoData;

    let egunak = Math.round(diferentzia / (1000 * 60 * 60 * 24));
    return egunak;
}

let difference_In_Days = differenceInDays(new Date("01-10-2025"));

window.onload = function () {
  document.getElementById("gamenumber").innerText = difference_In_Days.toString();
  document.getElementById("back-icon").innerHTML = folder + leftArrow;
};

let game = {
  guesses: [],
  solution: { },
  players: [],
  leagues: []
};

function getSolution(players, solutionArray, difference_In_Days) {
    // YOUR CODE HERE
    let index = (difference_In_Days - 1) % solutionArray.length;
    let gaurkoJokalariId = solutionArray[index];
    let jokalaria = players.find(p => p.id === gaurkoJokalariId);

    if (!jokalaria) {
        console.log("Ez da jokalaria aurkitu!");
        return null;
    } else {
        console.log("Gaurko jokalaria:", jokalaria);
        return jokalaria;
    }
}

Promise.all([fetchJSON("fullplayers25"), fetchJSON("solution25")]).then(
  (values) => {
    let solution;
    [game.players, solution] = values;
    game.solution = getSolution(game.players, solution, difference_In_Days);
    console.log(game.solution);
    document.getElementById("mistery").src = `https://playfootball.games/media/players/${game.solution.id % 32}/${game.solution.id}.png`;
  });

// YOUR CODE HERE
let addRow = setupRows(game);
// get myInput object...
document.getElementById("myInput").addEventListener("keydown", function(event) {
    // when the user types a number an press the Enter key:
    if (event.key === "Enter") {
        let JokalariarenID = parseInt(event.target.value);

        if (!isNaN(JokalariarenID)) { //isNaN balioa ez da parseatu
            addRow(JokalariarenID);
            let jokalaria = getPlayer(JokalariarenID);
            console.log(jokalaria);
        } else{
            console.log("Zenbakia behar da!");
        }
    }
});