async function getOverallSubjectPronounsStatus() {
    data = {
        "token" : localStorage.getItem("userToken")
    }
    
    const res = await fetch(host + "server/get_overall_subject_pronouns_result.php", {
        method: 'POST', 
        body: JSON.stringify(data) 
    })

    const response = await res.json();

    return response;
}

