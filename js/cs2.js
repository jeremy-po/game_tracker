const API_URL = 'https://public-api.tracker.gg/v2/csgo/standard/profile';
const API_KEY = '47178763-25c4-42f1-9d74-cad4de4a154f';

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-btn');
    searchButton.addEventListener('click', searchPlayer);

    const searchInput = document.getElementById('player-name');
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            searchPlayer();
        }
    });
});

async function searchPlayer() {
    const playerName = document.getElementById('player-name').value.trim();

    if (!playerName) {
        alert('Please enter a player name.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/steam/${playerName}`, {
            headers: {
                'TRN-Api-Key': API_KEY
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        displayResults(data.data);
    } catch (error) {
        console.error('Failed to fetch player data:', error);
        alert('Could not fetch player stats. Please try again later.');
    }
}

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 

    if (!data || !data.segments || !data.segments.length) {
        resultsContainer.innerHTML = '<p>No stats found for the player. Please refine your search.</p>';
        return;
    }

    const stats = data.segments[0].stats;

    const statsHtml = `
        <h2>Player: ${data.platformInfo.platformUserHandle}</h2>
        <p>Platform: Steam</p>
        <p>Kills: ${stats.kills?.displayValue || 'N/A'}</p>
        <p>Deaths: ${stats.deaths?.displayValue || 'N/A'}</p>
        <p>K/D Ratio: ${stats.kd?.displayValue || 'N/A'}</p>
        <p>Matches Played: ${stats.matchesPlayed?.displayValue || 'N/A'}</p>
        <p>Headshots: ${stats.headshots?.displayValue || 'N/A'}</p>
    `;

    resultsContainer.innerHTML = statsHtml;
}
