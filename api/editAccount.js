async function editAccount(data) {
    const res = await fetch(host + "server/edit_account.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();
   
    return response;
}

