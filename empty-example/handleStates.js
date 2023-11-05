let modes = {
    singleplayer: 0,
    multiplayer: 1,
    ffa: 2
};

let gamemode = modes.singleplayer;

//Declaration of all buttons for changing gamemodes
const singleplayerButton = document.getElementById('singleplayer-btn');
const multiplayerButton = document.getElementById('multiplayer-btn');
const ffaButton = document.getElementById('ffa-btn');


const changeGamemode = (mode) => {
    reset();
    gamemode = mode;
    setup();
}

singleplayerButton.addEventListener('click', () => {
    changeGamemode(modes.singleplayer);
});

multiplayerButton.addEventListener('click', () => {
    changeGamemode(modes.multiplayer); 
});

ffaButton.addEventListener('click', () => {
    changeGamemode(modes.ffa);
});