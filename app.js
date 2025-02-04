const token = document.querySelector('#balance');
const usd = document.querySelector('#usd');
const som = document.querySelector('#som');
const clicker = document.querySelector('#clicker');
const level = document.querySelector('#lvl');
const upgrade = document.querySelector('#upgrade');

let displayToken = localStorage.getItem('tokens') ? parseFloat(localStorage.getItem('tokens')) : 0;
let displayUsd = displayToken * 0.1;
let displaySom = displayUsd * 89;
let currentLevel = localStorage.getItem('level') ? parseInt(localStorage.getItem('level')) : 1;
let profitMultiplier = 1 + (currentLevel - 1) * 0.1;
let upgradeCost = 100 * currentLevel;

level.textContent = currentLevel;
token.textContent = displayToken.toFixed(4);
usd.textContent = displayUsd.toFixed(2);
som.textContent = displaySom.toFixed(2);
upgrade.textContent = `Улучшить уровень (${upgradeCost} токенов)`;

clicker.addEventListener('click', () => {
    let gain = 0.001 * profitMultiplier;
    displayToken += gain;
    displayUsd = displayToken * 0.1;
    displaySom = displayUsd * 89;

    token.textContent = displayToken.toFixed(4);
    usd.textContent = displayUsd.toFixed(2);
    som.textContent = displaySom.toFixed(2);
    localStorage.setItem('tokens', displayToken);
});

upgrade.addEventListener('click', () => {
    if (displayToken >= upgradeCost && currentLevel < 25) {
        displayToken -= upgradeCost;
        currentLevel++;
        localStorage.setItem('level', currentLevel);
        localStorage.setItem('tokens', displayToken);
        profitMultiplier = 1 + (currentLevel - 1) * 0.1;
        upgradeCost = 100 * currentLevel;
        level.textContent = currentLevel;
        upgrade.textContent = `Улучшить уровень (${upgradeCost} токенов)`;

        token.textContent = displayToken.toFixed(4);
        usd.textContent = displayUsd.toFixed(2);
        som.textContent = displaySom.toFixed(2);
    }
});
