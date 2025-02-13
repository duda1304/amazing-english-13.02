async function login(form) {
    const data = {
        "email" : form.elements.email.value,
        "password" : form.elements.password.value
    }
    
    const res = await fetch(host + "server/login.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    if (response.code === 200) {
        localStorage.setItem("token", response.jwt)
    }
    return response;
}

