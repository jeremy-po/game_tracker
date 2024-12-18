const API_URL = 'https://www.steamwebapi.com/explore/api/profile';
const API_KEY = '3L83DIFLBNCI8R4K';

async function fetchPlayerData(playerName) {
    const url = `${API_URL}/steam/${playerName}`;
    try {
        const response = await fetch(url, {
            headers: {
                'TRN-Api-Key': API_KEY,
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        displayResults(data.data);
    } catch (error) {
        console.error('Failed to fetch player data:', error);
        alert('Error fetching data. Please try again later.');
    }
}

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 

    if (!data) {
        resultsContainer.innerHTML = '<p>No stats found for the player. Please refine your search.</p>';
        return;
    }

    const playerStats = `
        <h2>Player Profile: ${data.platformInfo.platformUserHandle}</h2>
        <img src="${data.platformInfo.avatarfull}" alt="Player Avatar" />
        <p><strong>Steam ID:</strong> ${data.platformInfo.steamid}</p>
        <p><strong>Account Name:</strong> ${data.platformInfo.accountname}</p>
        <p><strong>Steam Profile:</strong> <a href="${data.platformInfo.profileurl}" target="_blank">Visit Profile</a></p>

        <h3>Statistics:</h3>
        <p><strong>Kills:</strong> ${data.segments[0].stats.kills.displayValue}</p>
        <p><strong>Deaths:</strong> ${data.segments[0].stats.deaths.displayValue}</p>
        <p><strong>K/D Ratio:</strong> ${data.segments[0].stats.kd.displayValue}</p>
        <p><strong>Matches Played:</strong> ${data.segments[0].stats.matchesPlayed.displayValue}</p>
    `;

    resultsContainer.innerHTML = playerStats;
}

document.getElementById('search-btn').addEventListener('click', () => {
    const playerName = document.getElementById('player-name').value.trim();
    if (playerName) {
        fetchPlayerData(playerName);
    } else {
        alert('Please enter a player name.');
    }
});
