async function checkToken() {
    let data;

    if (localStorage.getItem("token")) {
        data = {
            "token" : localStorage.getItem("token")
        }
    } else {
        data = {
            "token" : "emptystring"
        }
    }

    const res = await fetch(host + "server/check_token.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

