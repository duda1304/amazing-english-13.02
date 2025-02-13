async function deleteState() {
    const data = {
        "id" : localStorage.getItem("userToken")
    }

    const res = await fetch(host + "server/delete_state.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

