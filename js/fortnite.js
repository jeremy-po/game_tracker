async function fetchGlobalFortniteStats(accountId) {
    const API_URL = `https://fortniteapi.io/v1/stats?account=${accountId}`;
    const API_KEY = "c5df17f3-1e909a70-a9a8a09f-d44007ef"; 

    try {
        const response = await fetch(API_URL, {
            headers: {
                "Authorization": API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        displayGlobalStats(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        displayError("Unable to fetch global statistics. Please try again.");
    }
}

function displayGlobalStats(data) {
    const statsContainer = document.querySelector(".results-container");

    statsContainer.innerHTML = "";

    if (!data || !data.global_stats) {
        statsContainer.innerHTML = "<p>No data found for this account.</p>";
        return;
    }

    const globalStats = data.global_stats;

    const playerStats = `
        <h2>Global Stats for Player</h2>
        <p>Wins: ${globalStats.wins || "N/A"}</p>
        <p>Kills: ${globalStats.kills || "N/A"}</p>
        <p>Matches Played: ${globalStats.matches || "N/A"}</p>
        <p>Win Rate: ${globalStats.win_rate || "N/A"}%</p>
        <p>Platform Breakdown:</p>
        <ul>
            <li>Mouse & Keyboard: ${globalStats.mouse_and_keyboard?.kills || "N/A"} kills</li>
            <li>Gamepad: ${globalStats.gamepad?.kills || "N/A"} kills</li>
            <li>Touch: ${globalStats.touch?.kills || "N/A"} kills</li>
        </ul>
    `;

    statsContainer.innerHTML = playerStats;
}

function displayError(message) {
    const statsContainer = document.querySelector(".results-container");
    statsContainer.innerHTML = `<p class="error">${message}</p>`;
}

document.querySelector(".search-container button").addEventListener("click", function () {
    const accountId = document.querySelector(".search-container input[type='text']").value.trim();

    if (accountId) {
        fetchGlobalFortniteStats(accountId);
    } else {
        alert("Please enter an account ID.");
    }
});

document.querySelector(".search-container input[type='text']").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const accountId = document.querySelector(".search-container input[type='text']").value.trim();

        if (accountId) {
            fetchGlobalFortniteStats(accountId);
        } else {
            alert("Please enter an account ID.");
        }
    }
});
