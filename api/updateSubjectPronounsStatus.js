async function updateSubjectPronounsStatus(game, result) {
    data = {
        "token" : localStorage.getItem("userToken"),
        "game" : game,
        "result" : result
    }
    
    const res = await fetch(host + "server/update_subject_pronouns_status.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

