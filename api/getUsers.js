async function getUsers(id) {
    const data = {
        "id" : id
    }

    const res = await fetch(host + "server/get_users.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

