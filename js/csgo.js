import { loadComponent } from './utils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
await loadComponent('#header-placeholder', 'partials/header.html');
await loadComponent('#footer-placeholder', 'partials/footer.html');

document.getElementById('search-btn').addEventListener('click', async () => {
    const playerName = document.getElementById('player-name').value.trim();
    if (!playerName) {
        alert('Please enter a player name.');
        return;
    }

    const stats = await fetchPlayerStats(playerName);
    displayStats(stats);
    });
});

async function fetchPlayerStats(playerName) {
const API_URL = `https://public-api.tracker.gg/v2/apex/standard/profile/{platform}/{platformUserIdentifier}`;
const API_KEY = '47178763-25c4-42f1-9d74-cad4de4a154f';

    try {
    const response = await fetch(API_URL, {
        headers: { 'TRN-Api-Key': API_KEY },
    });
    if (!response.ok) throw new Error('Failed to fetch player stats.');
    return await response.json();
    } catch (error) {
    console.error('Error fetching player stats:', error);
    return null;
    }
}

function displayStats(stats) {
const resultsContainer = document.getElementById('results');
resultsContainer.innerHTML = ''; // Clear previous results

    if (!stats) {
    resultsContainer.textContent = 'Player not found or data unavailable.';
    return;
    }

    const statsHtml = `
    <div class="stat-item"><strong>Win %:</strong> ${stats.lifeTimeStats[0]?.value || 'N/A'}</div>
    <div class="stat-item"><strong>Wins:</strong> ${stats.lifeTimeStats[1]?.value || 'N/A'}</div>
    <div class="stat-item"><strong>K/D:</strong> ${stats.lifeTimeStats[2]?.value || 'N/A'}</div>
    <div class="stat-item"><strong>Kills:</strong> ${stats.lifeTimeStats[3]?.value || 'N/A'}</div>
    `;
    resultsContainer.innerHTML = statsHtml;
}
