async function sendEmail(email) {
    const data = {
        "email" : email
    }
    
    const res = await fetch(host + "server/sendEmail.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

