import { loadComponent } from './utils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    await loadComponent('#header-placeholder', '/public/partials/header.html');
    await loadComponent('#footer-placeholder', '/public/partials/footer.html');

    setupHomePage();
});

function setupHomePage() {
    const games = [
        {
            id: 'apex-legends',
            name: 'Apex Legends',
            description: 'Track player stats, leaderboards, and performance!',
        },
        {
            id: 'csgo',
            name: 'CS:GO',
            description: 'Analyze player rankings, matches, and wins!',
        },
        {
            id: 'the-division-2',
            name: 'The Division 2',
            description: 'Review player scores, kill ratios, and more!',
        },
    ];

    const gameCardsContainer = document.querySelector('#game-cards');
    games.forEach((game) => {
        const card = document.createElement('div');
        card.classList.add('game-card');
        card.id = game.id;

        const button = document.createElement('button');
        button.textContent = 'View Stats';
        button.onclick = () => viewGame(game.id);

        card.innerHTML = `
            <h2>${game.name}</h2>
            <p>${game.description}</p>
        `;
        card.appendChild(button);
        gameCardsContainer.appendChild(card);
    });
}

function viewGame(gameId) {
    const gamePages = {
        'apex-legends': 'apex-legends.html',
        'csgo': 'csgo.html',
        'the-division-2': 'the-division-2.html',
    };

    if (gamePages[gameId]) {
        window.location.href = gamePages[gameId];
    } else {
        console.error('Page for the selected game is not available.');
    }
}
