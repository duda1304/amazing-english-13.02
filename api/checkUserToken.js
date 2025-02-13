async function checkUserToken() {
    let data;

    if (localStorage.getItem("userToken")) {
        data = {
            "token" : localStorage.getItem("userToken")
        }
    } else {
        data = {
            "token" : "emptystring"
        }
    }

    const res = await fetch(host + "server/check_user_token.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

