async function createAccount(data) {
    const res = await fetch(host + "server/create_account.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();
   
    return response;
}

