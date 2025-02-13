async function changeUserProfile(data) {
    const res = await fetch(host + "server/change_user_profile.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

