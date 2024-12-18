const API_URL = 'https://www.steamwebapi.com/steam/api/profile'; 
const API_KEY = '3L83DIFLBNCI8R4K'; 

async function fetchPlayerData(playerName) {
    if (!playerName) {
        alert('Please enter a valid player name.');
        return;
    }

    const url = `${API_URL}?key=${API_KEY}&id=${playerName}&state=detailed`; 

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        displayResults(data);
    } catch (error) {
        console.error('Failed to fetch player data:', error);
        alert('Error fetching data. Please try again later.');
    }
}

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 

    if (!data || !data.response || !data.response.player) {
        resultsContainer.innerHTML = '<p>No stats found for the player. Please refine your search.</p>';
        return;
    }

    const player = data.response.player;
    const statsHtml = `
        <h2>Player: ${player.personaname}</h2>
        <p>Profile URL: <a href="${player.profileurl}" target="_blank">View Profile</a></p>
        <p>Steam ID: ${player.steamid}</p>
        <p>Online Status: ${player.personastate}</p>
        <p>Trade Ban: ${player.tradeban ? 'Yes' : 'No'}</p>
        <p>VAC Ban: ${player.vacban ? 'Yes' : 'No'}</p>
        <p>Profile Level: ${player.level}</p>
        <img src="${player.avatarfull}" alt="${player.personaname}'s Avatar" />
    `;
    
    resultsContainer.innerHTML = statsHtml; 
}

document.getElementById('search-btn').addEventListener('click', function () {
    const playerName = document.getElementById('player-name').value.trim();
    fetchPlayerData(playerName);
});

document.getElementById('player-name').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const playerName = document.getElementById('player-name').value.trim();
        fetchPlayerData(playerName);
    }
});
