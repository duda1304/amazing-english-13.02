async function checkData() {
    checkToken()
    .then(response => {
        if (response.code === 200) {
            if(response.tempPassword === 1) {
                $('#new-password-modal').modal('show');
            } else {
                alert('go to game page')
            }
        } else {
            $('#login-modal').modal('show');
         }
    })
}

async function admin(e) {
    document.getElementById("openLoginModal").click();
}


async function userLogin(e) {
    e.preventDefault();
    login(e.target)
    .then(response => {
        if (response.code === 200) {
            document.getElementById("closeLoginModal").click();
            if (response.tempPassword == 1) {
                document.getElementById("openNewPasswordModal").click();
            } else {
                checkDate(response.id);
            }
        } else {
            document.getElementById("loginResponse").innerHTML = response.message;
        }
    })
}

async function createNewAccount(e) {
    e.preventDefault();
    if (e.target.elements.password.value !== e.target.elements.passwordAgain.value) {
        document.getElementById("createAccountResponse").innerHTML = "Les mots de passe ne correspondent pas";
    } else {
        createAccount(e.target)
        .then(response => {
            if (response.code === 200) {
                document.getElementById("closeCreateAccountModal").click();
                document.getElementById("openLoginModal").click();
            } else {
                document.getElementById("createAccountResponse").innerHTML = response.message;
            }
        })
    }
}

async function sendRecoveryEmail(e) {
    e.preventDefault();
    sendEmail(e.target.elements.email.value)
    .then(response => {
        document.getElementById("forgottenPasswordResponse").innerHTML = response.message;
        if (response.code === 200) {
            document.getElementById("sendEmailButton").disabled = true;
        }
    })
}

async function saveNewPassword(e) {
    e.preventDefault();
    if (e.target.elements.password.value !== e.target.elements.passwordAgain.value) {
        document.getElementById("newPasswordResponse").innerHTML = "Les mots de passe ne correspondent pas";
    } else {
        newPassword(e.target)
        .then(response => {
            if (response.code === 200) {
                document.getElementById("newPasswordResponse").innerHTML = response.message;
                setTimeout(() => {
                    document.getElementById("closeNewPasswordModal").click();
                }, 1500);
            } else {
                document.getElementById("newPasswordResponse").innerHTML = response.message;
            }
        })
    }
}
