import { folder, leftArrow, stringToHTML } from "./fragments.js";

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate'];

export function getPlayer(game, playerId) {
    let jokalaria = game.players.find(j => j.id === playerId);

    if (!jokalaria) {
        console.log("Ez da jokalaririk aurkitu zehaztutako ID-arekin!");
        return null;
    }else{
    console.log("Jokalaria aurkitu da!");
    return jokalaria;
    }
}

export function setupRows(game) {

    function leagueToFlag(leagueId) {
        let map = {
            564: "es1",
            8:   "en1",
            82:  "de1",
            384: "it1",
            301: "fr1"
        };
        return map[leagueId] || "Ez da ezagutzen liga.";
    }

    function getAge(dateString) {
        let gaur = new Date();
        let urtebetetzea = new Date(dateString);
        let adina = gaur.getFullYear() - urtebetetzea.getFullYear();

        let hilabeteak = gaur.getMonth() - urtebetetzea.getMonth();
        let egunak = gaur.getDate() - urtebetetzea.getDate();

        if (hilabeteak < 0 || (hilabeteak === 0 && egunak < 0)) {
            adina--;
        }
        return adina;
    }

    function check(theKey, theValue) {
        let jokalariMisteriotsua = game.solution;

        if (theKey === "birthdate") {
            let misterAge = getAge(jokalariMisteriotsua.birthDate);
            let guessAge = getAge(theValue);

            if (misterAge === guessAge) return "correct";
            if (guessAge < misterAge) return "lower";
            return "higher";
        }

        return (jokalariMisteriotsua[theKey] === theValue) ? "correct" : "incorrect";
    }

    function setContent(guess) {
        return [
            `<img src="https://playfootball.games/media/nations/${guess.nationality.toLowerCase()}.svg" style="width: 60%;">`,
            `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate)}`
        ];
    }

    function showContent(content, guess) {
        let fragments = "";

        for (let j = 0; j < content.length; j++) {
            const delayMs = `${(j + 1) * delay}ms`;

            fragments += `
                <div class="w-1/5 shrink-0 flex justify-center ">
                    <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square 
                                rounded-full justify-center items-center bg-slate-400 text-white
                                ${check(attribs[j], guess[attribs[j]]) === 'correct' ? 'bg-green-500' : ''}
                                opacity-0 fadeInDown"
                         style="max-width: 60px; animation-delay: ${delayMs};">
                        ${content[j]}
                    </div>
                </div>`;
        }

        const child = `
            <div class="flex w-full flex-wrap text-l py-2">
                <div class="w-full grow text-center pb-2">
                    <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4
                                uppercase font-bold text-lg opacity-0 fadeInDown"
                         style="animation-delay: 0ms;">
                        ${guess.name}
                    </div>
                </div>
                ${fragments}
            </div>`;

        document.getElementById('players').prepend(stringToHTML(child));
    }

    // Itzuliko den funtzioa (main.js-ko addRow)
    return function addRow(playerId) {
        let guess = getPlayer(game, playerId);
        if (!guess) return;

        let content = setContent(guess);
        showContent(content, guess);
    };
}
