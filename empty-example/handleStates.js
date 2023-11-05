let modes = {
  singleplayer: 0,
  multiplayer: 1,
  ffa: 2,
};

let gamemode;
let gamemodeSelected = false;

//Declaration of all buttons for changing gamemodes
const singleplayerButton = document.getElementById("singleplayer-btn");
const multiplayerButton = document.getElementById("multiplayer-btn");
const ffaButton = document.getElementById("ffa-btn");

const healthBars = document.getElementById("health-bars");
const score = document.getElementById("score");

const buttons = [singleplayerButton, multiplayerButton, ffaButton]; // Array of buttons

const changeGamemode = (mode) => {
  reset();
  gamemode = mode;
  gamemodeSelected = true;
  setup();

  // Remove active class from all buttons
  buttons.forEach((button) => {
    button.classList.remove("active-game-mode");
  });

  // Add active class to the clicked button
  const activeButton = buttons.find(
    (button) => parseInt(button.value) === mode
  );
  if (activeButton) {
    activeButton.classList.add("active-game-mode");
  }
};

// Event listeners for buttons
singleplayerButton.addEventListener("click", () => {
  changeGamemode(modes.singleplayer);
  singleplayerButton.classList.add("active-game-mode");
  healthBars.classList.add("hidden");
});

multiplayerButton.addEventListener("click", () => {
  changeGamemode(modes.multiplayer);
  multiplayerButton.classList.add("active-game-mode");
  healthBars.classList.remove("hidden");
});

ffaButton.addEventListener("click", () => {
  changeGamemode(modes.ffa);
  ffaButton.classList.add("active-game-mode");
  healthBars.classList.add("hidden");
});

//changeGamemode(modes.singleplayer);
