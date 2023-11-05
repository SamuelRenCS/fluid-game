const redHealth = document.getElementById('red-health');
const blueHealth = document.getElementById('blue-health');

const updateHealth = (health, color) => {
    if (color === 'red') {
        redHealth.innerText = health.toFixed(2);
    } else if (color === 'blue') {
        blueHealth.innerText = health.toFixed(2);
    }
}