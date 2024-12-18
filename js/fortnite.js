const FortniteAPI = require('fortnite-api-io');


const client = new FortniteAPI('c5df17f3-1e909a70-a9a8a09f-d44007ef', {
    defaultLanguage: 'en', 
    ignoreWarnings: false  
});


async function fetchGlobalFortniteStats(accountId) {
    try {

        const stats = await client.getGlobalPlayerStats(accountId);
        

        displayGlobalStats(stats);
    } catch (error) {
        console.error('Error fetching stats:', error);
        displayError('Unable to fetch player stats. Please try again.');
    }
}

function displayGlobalStats(data) {
    const statsContainer = document.querySelector('.results-container');

    statsContainer.innerHTML = '';

    if (!data || !data.global_stats) {
        statsContainer.innerHTML = '<p>No data found for this account.</p>';
        return;
    }

    const globalStats = data.global_stats;

    const playerStats = `
        <h2>Global Stats for Player</h2>
        <p>Wins: ${globalStats.wins || 'N/A'}</p>
        <p>Kills: ${globalStats.kills || 'N/A'}</p>
        <p>Matches Played: ${globalStats.matches || 'N/A'}</p>
        <p>Win Rate: ${globalStats.win_rate || 'N/A'}%</p>
        <p>Platform Breakdown:</p>
        <ul>
            <li>Mouse & Keyboard: ${globalStats.mouse_and_keyboard?.kills || 'N/A'} kills</li>
            <li>Gamepad: ${globalStats.gamepad?.kills || 'N/A'} kills</li>
            <li>Touch: ${globalStats.touch?.kills || 'N/A'} kills</li>
        </ul>
    `;

    statsContainer.innerHTML = playerStats;
}

function displayError(message) {
    const statsContainer = document.querySelector('.results-container');
    statsContainer.innerHTML = `<p class="error">${message}</p>`;
}

document.querySelector('.search-container button').addEventListener('click', function () {
    const accountId = document.querySelector('.search-container input[type="text"]').value.trim();

    if (accountId) {
        fetchGlobalFortniteStats(accountId);
    } else {
        alert('Please enter an account ID.');
    }
});

document.querySelector('.search-container input[type="text"]').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const accountId = document.querySelector('.search-container input[type="text"]').value.trim();

        if (accountId) {
            fetchGlobalFortniteStats(accountId);
        } else {
            alert('Please enter an account ID.');
        }
    }
});
