async function unmarkChallengeStarted() {
    const data = {
        "token" : localStorage.getItem("userToken")
    }
    const res = await fetch(host + "server/stop_challenge.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

