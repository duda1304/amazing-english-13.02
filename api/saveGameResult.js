async function saveGameResult(level, sublevels, age) {
    data = {
        "token" : localStorage.getItem("userToken"),
        "level" : level,
        "sublevels" : sublevels,
        "age" : age

    }
    const res = await fetch(host + "server/save_user_result.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

