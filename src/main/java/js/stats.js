/**
 * stats.js
 * Milestone 4: Saiakerak eta Game Over
 */

let initState = function(what, solutionId) {

    // 1. LocalStorage-tik datuak berreskuratu
    let jsonState = localStorage.getItem(what);
    let state;

    // 2. Ea daturik dagoen gordeta
    if (jsonState) {
        state = JSON.parse(jsonState);

        // 3. Konprobatu ea gordetako partida gaurko jokalariarena den (solutionId)
        if (state.solution !== solutionId) {
            // Ez bada gaurkoa, reset egin behar da (jokalari berria delako)
            state = null;
        }
    }

    // 4. Egoera hutsa bada (ez dagoelako edo zaharra delako), berria sortu
    if (!state) {
        state = {
            guesses: [],       // Saiakeren array hutsa [cite: 476]
            solution: solutionId // Jokalari misteriotsuaren ID-a [cite: 477]
        };
        // Hasierako egoera gorde
        localStorage.setItem(what, JSON.stringify(state));
    }

    // 5. updateState funtzioa definitu [cite: 489]
    // Funtzio honek saiakera berri bat gehitzen du eta localStorage eguneratzen du
    let updateState = function(guess) {
        state.guesses.push(guess); // Array-ra gehitu
        localStorage.setItem(what, JSON.stringify(state)); // Diskoan gorde [cite: 490]
    };

    // 6. Array bat itzuli: [egoera_objektua, eguneratzeko_funtzioa]
    return [state, updateState];
}

export {initState};