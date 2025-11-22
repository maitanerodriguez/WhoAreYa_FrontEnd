/**
 * stats.js
 * Milestone 4: initState (what, solutionId)
 */

export function initState(what, solutionId) {

    // 1. LocalStorage-tik saioa irakurri
    let jsonState = localStorage.getItem(what);
    let state;

    // 2. Dagoeneko badago objektua gordeta → hartu
    if (jsonState) {
        state = JSON.parse(jsonState);
    }

    // 3. Bestela, objektu berria sortu
    if (!state) {
        state = {
            guesses: [],        // hutsik
            solution: solutionId // M4: solutionId ere gorde
        };

        localStorage.setItem(what, JSON.stringify(state));
    }

    // 4. Funtzio anonimoa: guess gehitzen du
    function updateState(guess) {
        state.guesses.push(guess);               // saiakera gehitu
        localStorage.setItem(what, JSON.stringify(state)); // gordetu
    }

    // 5. Itzuli: [state, funtzioa]
    return [state, updateState];
}
