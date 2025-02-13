async function deleteAccount(id) {
    const data = {
        'token' : localStorage.getItem('token'),
        'id' : id
    }

    const res = await fetch(host + "server/delete_account.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();
   
    return response;
}

