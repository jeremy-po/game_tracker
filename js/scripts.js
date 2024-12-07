import { loadComponent } from './utils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  //  load header and footer
    await loadComponent('#header-placeholder', 'partials/header.html');
    await loadComponent('#footer-placeholder', 'partials/footer.html');

  // Create the home page content
    setupHomePage();
});

function setupHomePage() {
const games = [
    {
        id: 'league-of-legends',
        name: 'League of Legends',
        description: 'Track player stats, leaderboards, and performance!',
    },
    {
        id: 'fortnite',
        name: 'Fortnite',
        description: 'Analyze player rankings, matches, and wins!',
    },
    {
        id: 'valorant',
        name: 'Valorant',
        description: 'Review player scores, kill ratios, and more!',
    },
];

    const gameCardsContainer = document.querySelector('#game-cards');
games.forEach((game) => {
    const card = document.createElement('div');
    card.classList.add('game-card');
    card.id = game.id;
    card.innerHTML = `
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <button onclick="viewGame('${game.id}')">View Stats</button>
    `;
    gameCardsContainer.appendChild(card);
    });
}
