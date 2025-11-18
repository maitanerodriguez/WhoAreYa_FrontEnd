// YOUR CODE HERE :
// .... stringToHTML ....
// .... setupRows .....
import { folder, leftArrow, stringToHTML } from "./fragments.js";

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']


let setupRows = function (game) {

    function leagueToFlag(leagueId) {
        // YOUR CODE HERE
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
        // YOUR CODE HERE
        let gaur = new Date();
        let urtebetetzea = new Date(dateString);
        let adina = gaur.getFullYear() - urtebetetzea.getFullYear();

        let hilabeteak = gaur.getMonth() - urtebetetzea.getMonth();
        let egunak = gaur.getDay() - urtebetetzea.getDay();

        if (hilabeteak < 0 || (hilabeteak === 0 && egunak === 0) ) {
            adina--;
        }
        return adina;
    }

    let check = function (theKey, theValue) {
        // YOUR CODE HERE
        let jokalariMisteriotsua = game.solution; //game.solution erabiliz jokalaria lortu

        //theKey parametroaren barruan dagoen balioa adina bada aztertu
        if (theKey === "birthdate") {
            let jokalariMisteriotsuAdina = getAge(jokalariMisteriotsua.birthDate);
            let asmatutakoAdina = getAge(theValue);

            if (jokalariMisteriotsuAdina === asmatutakoAdina) {
                return "correct";
            } else if (asmatutakoAdina < jokalariMisteriotsuAdina) {
                return "lower";
            } else{
                return "higher";
            }
        }

        //theKey parametroaren barruan dagoen balioa adina  ez bada honekin nahiko
        if (jokalariMisteriotsua[theKey] === theValue) {
            return "correct";
        } else {
            return "incorrect";
        }
    }

    function setContent(guess) {
        return [
            `<img src="https://playfootball.games/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate)}`
        ]
    }

    function showContent(content, guess) {
        let fragments = '', s = '';
        for (let j = 0; j < content.length; j++) {
            s = "".concat(((j + 1) * delay).toString(), "ms")
            fragments += `<div class="w-1/5 shrink-0 flex justify-center ">
                            <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square rounded-full justify-center items-center bg-slate-400 text-white ${check(attribs[j], guess[attribs[j]]) == 'correct' ? 'bg-green-500' : ''} opacity-0 fadeInDown" style="max-width: 60px; animation-delay: ${s};">
                                ${content[j]}
                            </div>
                         </div>`
        }

        let child = `<div class="flex w-full flex-wrap text-l py-2">
                        <div class=" w-full grow text-center pb-2">
                            <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4 uppercase font-bold text-lg opacity-0 fadeInDown " style="animation-delay: 0ms;">
                                ${guess.name}
                            </div>
                        </div>
                        ${fragments}`

        let playersNode = document.getElementById('players')
        playersNode.prepend(stringToHTML(child))
    }

    let getPlayer = function (playerId) {
        // YOUR CODE HERE
        let jokalaria = game.players.find(j => j.ID === playerId);

        if (!jokalaria) {
            console.log("Ez da jokalaririk aurkitu zehaztutako ID-arekin!");
            return null;
        } else {
            console.log("Jokalaria aurkitu da!");
            return jokalaria;
        }
    }

    return /* addRow */ function (playerId) {

        let guess = getPlayer(playerId)
        console.log(guess)

        let content = setContent(guess)
        showContent(content, guess)
    }
}
