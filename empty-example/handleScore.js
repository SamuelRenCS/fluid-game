const redScore = document.getElementById('red-score');
const blueScore = document.getElementById('blue-score');
const scoreElement = document.getElementById('score');

const updateScore = (score, color) => {
    if (color === 'red') {
        redScore.innerText = score;

    } else if (color === 'blue') {
        blueScore.innerText = score;
    }
    // Remove the 'hidden' class to show the scoreElement
    scoreElement.classList.remove('hidden');

    // Use setTimeout to wait for 1000 milliseconds (1 second), then add the 'hidden' class back
    setTimeout(() => {
        scoreElement.classList.add('hidden');
    }, 2000); // 1000 milliseconds = 1 second
}


// const score = document.getElementById('score');