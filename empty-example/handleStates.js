let gamemode = 1;


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
    changeGamemode(1);
});

multiplayerButton.addEventListener('click', () => {
    changeGamemode(2); 
});

ffaButton.addEventListener('click', () => {
    changeGamemode(3);
});



