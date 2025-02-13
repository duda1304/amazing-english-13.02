async function getGames(age, level) {
    const data = {
        "age" : age,
        "level" : level
    }

    const res = await fetch(host + "server/get_user_games.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

