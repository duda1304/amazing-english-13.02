async function editState(content) {
    const data = {
        "id" : localStorage.getItem("userToken"),
        "content" : content
    }

    const res = await fetch(host + "server/edit_state.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

