let modes = {
    singleplayer: 0,
    multiplayer: 1,
    ffa: 2
};

let gamemode;

//Declaration of all buttons for changing gamemodes
const singleplayerButton = document.getElementById('singleplayer-btn');
const multiplayerButton = document.getElementById('multiplayer-btn');
const ffaButton = document.getElementById('ffa-btn');

const buttons = [singleplayerButton, multiplayerButton, ffaButton]; // Array of buttons

const changeGamemode = (mode) => {
    reset();
    gamemode = mode;
    setup();

    // Remove active class from all buttons
    buttons.forEach(button => {
        button.classList.remove('active-game-mode');
    });

    // Add active class to the clicked button
    const activeButton = buttons.find(button => parseInt(button.value) === mode);
    if (activeButton) {
        activeButton.classList.add('active-game-mode');
    }
}

// Event listeners for buttons
singleplayerButton.addEventListener('click', () => {
    changeGamemode(modes.singleplayer);
    singleplayerButton.classList.add('active-game-mode');
});

multiplayerButton.addEventListener('click', () => {
    changeGamemode(modes.multiplayer);
    multiplayerButton.classList.add('active-game-mode');
});

ffaButton.addEventListener('click', () => {
    changeGamemode(modes.ffa);
    ffaButton.classList.add('active-game-mode');
});

changeGamemode(modes.singleplayer);