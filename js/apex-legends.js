const API_URL = 'https://public-api.tracker.gg/v2/apex/standard/search';
const API_KEY = '47178763-25c4-42f1-9d74-cad4de4a154f';

document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-btn');
    searchButton.addEventListener('click', searchPlayer);
});

async function searchPlayer() {
    const platform = 'origin';
    const playerName = document.getElementById('player-name').value.trim();

    if (!playerName) {
        alert('Please enter an Origin player name.');
        return;
    }

    try {
        const response = await fetch(`${API_URL}?platform=${platform}&query=${playerName}`, {
            headers: {
                '47178763-25c4-42f1-9d74-cad4de4a154f': API_KEY
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

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (!results || results.length === 0) {
        resultsContainer.innerHTML = '<p>No players found. Please refine your search.</p>';
        return;
    }

    results.forEach((player) => {
        const playerCard = document.createElement('div');
        playerCard.classList.add('player-card');
        playerCard.innerHTML = `
            <h3>${player.platformUserHandle}</h3>
            <p>Platform: ${player.platformSlug}</p>
        `;
        resultsContainer.appendChild(playerCard);
    });
}
