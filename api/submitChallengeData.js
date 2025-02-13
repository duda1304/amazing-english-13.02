async function submitChallengeData(parameter, sublevel, points) {
    const data = {
        "token" : localStorage.getItem("userToken"),
        "parameter" : parameter,
        "value" : sublevel,
        "points" : points
    }
    const res = await fetch(host + "server/submit_challenge.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

