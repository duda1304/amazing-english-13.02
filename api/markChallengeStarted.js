async function markChallengeStarted(sublevel) {
    const data = {
        "token" : localStorage.getItem("userToken"),
        "sublevel" : sublevel
    }
    const res = await fetch(host + "server/start_challenge.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

