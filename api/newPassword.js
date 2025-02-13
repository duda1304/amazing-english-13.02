async function newPassword(form) {
    const data = {
        "password" : form.elements.password.value,
        "token" : localStorage.getItem("token")
    }
    
    const res = await fetch(host + "server/new_password.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();
   
    return response;
}

