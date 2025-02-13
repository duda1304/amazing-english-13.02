async function saveCurrentSublevelProgress(value) {
    data = {
        "token" : localStorage.getItem("userToken"),
        "current_sublevel_progress" : value
    }
    
    const res = await fetch(host + "server/save_current_sublevel_progress.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

