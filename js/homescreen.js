$('#register-link').click(function(){
    $('#registration-modal').modal('show');
    $('#registration-form .add-to-form').hide();
   
});

$('#login-link').click(function(){
    if ($(this).text() === 'Connexion') {
        $('#login-modal').modal('show');
    } else {
        if (window.location.pathname.includes('games')) {
            window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + '/index.html';
        }
        localStorage.removeItem('token');
        localStorage.removeItem('userToken');
        $('#main').removeClass('homescreen-secondphase');
        $('#main').addClass('homescreen');
        $('#register-link').text('Créer un compte');
        $('#register-link').show();
        $('.avatars-div').remove();
        // $(this).text('Connexion');
        $(this).html('Connexion');
        $('#edit-account-link').addClass('d-none');
        $('#game-rules-link').addClass('d-none');
    }
});

$('#forgotten-password-link').click(function(){
    $('#forgotten-password-modal').modal('show');
    $('#forgotten-password-form .response').text('');
    $('#login-modal').modal('hide');
});

$('#edit-account-link').click(function(){
    $('#edit-account-form #account_users').empty();
    $('#edit-account-form').trigger("reset");
    checkToken()
    .then(response => {
        if (response.code === 200) {
            $('#edit-account-modal input[name=email]').val(response.email);
            $(`#edit-account-modal input[value=${response.type}]`).prop('checked', true);

            getUsers(response.id)
            .then(response => {
                if (response.code ===200) {
                    $.each(response.users, function() {
                        $('#edit-account-form #account_users').append(`<div class="single user-form mt-3" id=${this.token}>
                        <div class="mb-3 mt-3 textOnInput">
                            <label>Prénom de l’enfant</label>
                            <input type="text" class="form-control rounded-pill" name="name" placeholder="Prénom de l’enfant" value='${this.name}' required>
                        </div>
                        <div class="choose-avatar">
                            <div class="col-2">
                                <img class="w-100" src="./img/panda.png"></img>
                                <input type="radio" value="panda" name="avatar_${this.name}" ${this.avatar === 'panda' ? 'checked' : ''}></input>
                            </div>
                            <div class="col-2">
                                <img class="w-100" src="./img/monkey.png"></img>
                                <input type="radio" value="monkey" name="avatar_${this.name}" ${this.avatar === 'monkey' ? 'checked' : ''}></input>
                            </div>
                            <div class="col-2">
                                <img class="w-100" src="./img/lion.png"></img>
                                <input type="radio" value="lion" name="avatar_${this.name}" ${this.avatar === 'lion' ? 'checked' : ''}></input>
                            </div>
                        </div>
                    </div>`)
                    })
                    $('#edit-account-modal').modal('show');
                } else {
                    alert (response.message);
                }
            })
        } else {
            setTimeout(() => {
                location.reload();
            }, 500);
        }
    })
    
});

$('#game-rules-link').click(function(){
    $('#game-rules-modal').modal('show');
})

$('#delete-account-link').click(function() {
    $('#edit-account-modal').modal('hide');
    $('#confirmation-modal').modal('show');
    $('#confirmation-modal .modal-title').text('Êtes-vous sûr de vouloir supprimer votre compte?');
    $('#confirmation-modal #ok').unbind('click');
    $('#confirmation-modal #cancel').unbind('click');
    $('#confirmation-modal #cancel').on('click', function() {
        $('#confirmation-modal').modal('hide');
        $('#edit-account-modal').modal('show');
    })
    $('#confirmation-modal #ok').on('click', async function() {
        checkToken()
        .then(response => {
            if (response.code === 200) {
                deleteAccount(response.id)
                .then(response => {
                    $('#confirmation-modal .response').text(response.message);
                    if (response.code === 200) {
                        $('#confirmation-modal .response').css('color', 'green');
                        localStorage.removeItem('token');
                        setTimeout(() => {
                            location.reload();
                        }, 500);
                    } else {
                        $('#confirmation-modal .response').css('color', 'red');
                        setTimeout(() => {
                            $('#confirmation-modal .response').text('');
                            $('#confirmation-modal').modal('hide');
                        }, 500);
                    }
                })
            } else {
                setTimeout(() => {
                    location.reload();
                }, 500);
            }
        })
    });
})

$('#change-profile-link').click(function(){
    $('#change-profile-modal').modal('show');
    $('#change-profile-form .response').text('');
    $('#change-profile-form input[name=name]').val($('#change-profile-link').data('name'));
    // $('#change-profile-form input[name=age]').val($('#change-profile-link').data('age'));
    $.each($('.choose-avatar input') ,function() {
        if ($(this).val() === $('#change-profile-link').data('avatar')) {
            $(this).prop('checked', true);
        } else {
            $(this).prop('checked', false);
        }
    })
});

$('#switch-user-link').click(function() {
    localStorage.removeItem('userToken');
    window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + '/index.html';
});

$('#progression-link').click(function() {
    $('#progression-modal').modal('show');
});

$('#registration-form .multi').hide();

formCount = 1;

const single = `<div class="single user-form">
                    <div class="mb-3 mt-3 textOnInput">
                        <label>Prénom de l’enfant</label>
                        <input type="text" class="form-control rounded-pill" name="name" placeholder="Prénom de l’enfant" required>
                    </div>
                    <div class="mb-3 mt-3 textOnInput">
                        <label>Âge</label>
                        <input type="number" class="form-control rounded-pill" name="age" min=0 max=100 placeholder="Âge" required>
                    </div>
                    <div class="choose-avatar">
                        <div class="col-2">
                            <img class="w-100" src="./img/panda.png"></img>
                            <input type="radio" value="panda" name="avatar" checked></input>
                        </div>
                        <div class="col-2">
                            <img class="w-100" src="./img/monkey.png"></img>
                            <input type="radio" value="monkey" name="avatar"></input>
                        </div>
                        <div class="col-2">
                            <img class="w-100" src="./img/lion.png"></img>
                            <input type="radio" value="lion" name="avatar"></input>
                        </div>
                    </div>
                </div>`

const multi = `<div class="multi mb-3 mt-3 user-form">
                    <p class="mb-0">Enfant ${formCount}</p>
                    <div class="d-flex flex-row justify-content-between">
                        <div class="mb-3 mt-3 textOnInput">
                            <label>Prénom de l’enfant</label>
                            <input type="text" class="form-control rounded-pill" name="name" placeholder="Prénom de l’enfant" required>
                        </div>
                        <div class="mb-3 mt-3 textOnInput">
                            <label>Âge</label>
                            <input type="number" class="form-control rounded-pill" name="age" min=0 max=100 placeholder="Âge" required>
                        </div>
                    </div>
                    <div class="choose-avatar">
                        <div class="col-2">
                            <img class="w-100" src="./img/panda.png"></img>
                            <input type="radio" value="panda" name="avatar-${formCount}" checked></input>
                        </div>
                        <div class="col-2">
                            <img class="w-100" src="./img/monkey.png"></img>
                            <input type="radio" value="monkey" name="avatar-${formCount}"></input>
                        </div>
                        <div class="col-2">
                            <img class="w-100" src="./img/lion.png"></img>
                            <input type="radio" value="lion" name="avatar-${formCount}"></input>
                        </div>
                    </div>
                </div>`
                
const type = {
    "single" : single,
    "multi" : multi
}

$('#registration-form input[name=type]').on('change', function() {
    const id = $(this).attr('id');
    $('#registration-form input[type=checkbox]').not(this).prop('checked', false);
    $(this).prop('checked', true);

    if (id !== 'multi') {
        $(`#registration-form .user-form:not(.${id})`).remove();
        $(type[id]).insertBefore($('#registration-form .add-to-form'));
        $('#registration-form .add-to-form').hide();
    } else {
        $(`#registration-form .user-form:not(.${id})`).remove();
        $(type[id]).insertBefore($('#registration-form .add-to-form'));
        $('#registration-form .add-to-form').show();
        $( "#addMultiForm").unbind( "click" );
        $('#addMultiForm').on('click', function() {
            if (formCount < 4) {
                formCount = formCount + 1;
                const template =  `<div class="multi mb-3 mt-3 user-form">
                                        <p class="mb-0">Enfant ${formCount}</p>
                                        <div class="d-flex flex-row justify-content-between">
                                            <div class="mb-3 mt-3 textOnInput">
                                                <label>Prénom de l’enfant</label>
                                                <input type="text" class="form-control rounded-pill" name="name" placeholder="Prénom de l’enfant" required>
                                            </div>
                                            <div class="mb-3 mt-3 textOnInput">
                                                <label>Âge</label>
                                                <input type="number" class="form-control rounded-pill" name="age" min=0 max=100 placeholder="Âge" required>
                                            </div>
                                        </div>
                                        <div class="choose-avatar">
                                            <div class="col-2">
                                                <img class="w-100" src="./img/panda.png"></img>
                                                <input type="radio" value="panda" name="avatar-${formCount}" checked></input>
                                            </div>
                                            <div class="col-2">
                                                <img class="w-100" src="./img/monkey.png"></img>
                                                <input type="radio" value="monkey" name="avatar-${formCount}"></input>
                                            </div>
                                            <div class="col-2">
                                                <img class="w-100" src="./img/lion.png"></img>
                                                <input type="radio" value="lion" name="avatar-${formCount}"></input>
                                            </div>
                                        </div>
                                    </div>`;
                $(template).insertBefore($('#registration-form .add-to-form'));
            }
        });
        $('#removeMultiForm').unbind( "click" );
        $('#removeMultiForm').on('click', function() {
            if (formCount > 1) {
                $(this).parent().prev().remove();
                formCount = formCount - 1;
            }
        });
    }
});


$('#registration-form').on('submit', async function(e) {
    e.preventDefault();
    const form = $( this ); 
   
    data = {};

    data['type'] = form.find('input[name=type]:checked').val();
    data['email'] = form.find('input[name=email]').val();
    data['password'] = form.find('input[name=password]').val();
    data['users'] = [];

    userData = {};

    const accountType = form.find('input[name=type]:checked').val();

    form.find(`.${accountType}`).each(function() {
        $(this).find('input').each(function() {
            if ($(this).attr('type') !== 'radio') {
                userData[$(this).attr('name')] =  $(this).val();
            } else {
                if ($(this).is(':checked')) {
                    userData[$(this).attr('name').split('-')[0]] =  $(this).val();
                }
            }
        });
        data['users'].push(userData);
        userData = {};
    });

    createAccount(data)
        .then(response => {
            if (response.code === 200) {
                $('#registration-form').trigger("reset");
                $('#registration-form .add-to-form').hide();
                $('#registration-form .multi').remove();
                $('#registration-form .single').remove();
                $(single).insertBefore($('#registration-form .add-to-form'));
                $('#registration-modal .response').text('Votre compte a bien été crée');
                $(this).find('.response').css({'color': 'green'});
                setTimeout(() => {
                    $('#registration-modal .response').text('');
                    $('#registration-modal').modal('hide');
                    $('#login-modal').modal('show');
                }, 1500);
            } else {
                $(this).find('.response').text(response.message);
                $(this).find('.response').css({'color': 'red'});
            }
        })
    
});

$('#change-profile-form').on('submit', async function(e) {
    e.preventDefault();
    let data = {
        "name" : $('#change-profile-form input[name=name]').val(),
        // "age" : $('#change-profile-form input[name=age]').val(),
        "avatar" : $('#change-profile-form input[name=avatar]:checked').val()
    }
    changeUserProfile(data)
    .then(response => {
        if (response.code === 200) {
            setTimeout(() => {
                $('#change-profile-form').trigger("reset");
                $('#change-profile-modal').modal('hide');
                const count = $('#count').text();
                // $('#welcome-message').html(`Welcome ${response.name} <span class="position-relative"><img src="./img/${response.avatar}-icon.svg"></img><span id='count'>${count}</span></span>`);
                $('#welcome-message').html(`<p class="me-2">Welcome ${response.name}</p> <p class="position-relative"><img src="./img/${response.avatar}-icon.svg"></img><span id='count'>${count}</span></p>`);
                $('#change-profile-link').data('name', response.name);
                // $('#change-profile-link').data('age', response.age);
                $('#change-profile-link').data('avatar', response.avatar);                
            }, 1000);
        } else {
            $('#change-profile-form .response').text(response.message);
            $('#change-profile-form .response').css({'color' : 'red'});
        }
    })

})

$('#login-form').on('submit', async function(e) {
    e.preventDefault();
    login(e.target)
    .then(response => {
        if (response.code === 200) {
            $('#login-form').trigger("reset");
            $('#login-modal').modal('hide');
            // $('#login-link').text('Déconnexion');
            $('#login-link').html('<img src="./img/deconnection.svg" style="width: 20px;"></img>');
            $('#edit-account-link').removeClass('d-none');
            $('#game-rules-link').removeClass('d-none');
            if (response.tempPassword == 1) {
                $('#change-temp-password-modal').modal('show');
            } else {
                getUsers(response.id)
                .then(response => {
                    if (response.code === 200) {
                        setUsers(response.users);
                        $('#main').removeClass('homescreen');
                        $('#main').addClass('homescreen-secondphase');
                        $('#register-link').hide();
                    } else {
                        alert (response.message);
                    }
                })
            }
        } else {
            $(this).find('.response').text(response.message);
            $(this).find('.response').css({'color': 'red'});
        }
    })
});

$('#forgotten-password-form').on('submit', function(e) {
    e.preventDefault();
    sendEmail($('#forgotten-password-form input').val())
    .then(response => {
        $('#forgotten-password-form .response').text(response.message);
        if (response.code === 200) {
            $('#forgotten-password-form button').prop('disabled', true);
            $('#forgotten-password-form .response').css({'color': 'green'});
        } else {
            $('#forgotten-password-form .response').css({'color': 'red'});
        }
    })
})

function togglePassword(e) {
    if ( $(e.currentTarget).prev().attr('type') === 'password') {
        $(e.currentTarget).prev().attr('type', 'text');
        $(e.currentTarget).find('.show').removeClass('d-none');
        $(e.currentTarget).find('.hide').addClass('d-none');
    } else {
        $(e.currentTarget).prev().attr('type', 'password');
        $(e.currentTarget).find('.show').addClass('d-none');
        $(e.currentTarget).find('.hide').removeClass('d-none');
    }
}

async function checkData() {
    checkToken()
    .then(response => {
        if (response.code === 200) {
            if(response.tempPassword === 1) {
                $('#main').removeClass('homescreen-secondphase');
                $('#main').addClass('homescreen');
                $('#change-temp-password-modal').modal('show');
            } else {
                // $('#login-link').text('Déconnexion');
                $('#login-link').html('<img src="./img/deconnection.svg" style="width: 20px;"></img>');
                $('#edit-account-link').removeClass('d-none');
                $('#game-rules-link').removeClass('d-none');
                getUsers(response.id)
                .then(response => {
                    if (response.code === 200) {
                        setUsers(response.users);
                        $('#main').removeClass('homescreen');
                        $('#main').addClass('homescreen-secondphase');
                        $('#register-link').hide();
                    } else {
                        $('#main').removeClass('homescreen-secondphase');
                        $('#main').addClass('homescreen');
                        alert (response.message);
                    }
                })
            }
        } else {
            $('#main').removeClass('homescreen-secondphase');
            $('#main').addClass('homescreen');
            // $('#login-modal').modal('show');
         }
    })
}

$('#edit-account-form').on('submit', async function(e) {
    e.preventDefault();
    let data = {
        "token" : localStorage.getItem('token'),
        "email" : $('#edit-account-form input[name=email]').val(),
        "password" : $('#edit-account-form input[name=password]').val(),
    }
    editAccount(data)
    .then(response => {
        if (response.code === 200) {
            let count = 0;
            $('#edit-account-form .single').each(async function() {
                let data = {
                    "token" : $(this).attr('id'),
                    "name" : $(this).find('input[name=name]').val(),
                    "avatar" : $(this).find('input[type=radio]:checked').val()
                }
                changeUserProfile(data)
                .then(response =>  {
                    if (response.code === 200) {
                        count = count + 1;
                    } else {
                        $('#edit-account-form .response').text(response.message);
                        $('#edit-account-form .response').css('color', 'red');
                    }
                    if (count === $('#edit-account-form .single').length) {
                        $('#edit-account-form .response').text(response.message);
                        $('#edit-account-form .response').css('color', 'green');
                        setTimeout(() => {
                            location.reload();
                        }, 500);
                    }
                })
            })
        } else {
            $('#edit-account-form .response').text(response.message);
            $('#edit-account-form .response').css('color', 'red');
        }
    })
})

$('#new-password-form').on('submit', async function(e) {
    e.preventDefault();
    if ($(this).find('input[name=password]').val() !== $(this).find('input[name=password-again]').val()) {
        $(this).find('.response').text("Les mots de passe ne correspondent pas");
        $(this).find('.response').css({'color': 'red'});
    } else {
        newPassword(e.target)
        .then(response => {
            $(this).find('.response').text(response.message);
            if (response.code === 200) {
                $(this).find('.response').css({'color': 'green'});
                setTimeout(() => {
                    $('#new-password-modal .response').text('');
                    $('#new-password-modal').modal('hide');
                }, 1500);
            } else {
                $(this).find('.response').css({'color': 'red'});
            }
        })
    }
});

$('#change-temp-password-form').on('submit', async function(e) {
    e.preventDefault();
    if ($(this).find('input[name=password]').val() !== $(this).find('input[name=password-again]').val()) {
        $(this).find('.response').text("Les mots de passe ne correspondent pas");
        $(this).find('.response').css({'color': 'red'});
    } else {
        newPassword(e.target)
        .then(response => {
            $(this).find('.response').text(response.message);
            if (response.code === 200) {
                $(this).find('.response').css({'color': 'green'});
                setTimeout(() => {
                    $('#change-temp-password-modal .response').text('');
                    $('#change-temp-password-modal').modal('hide');
                    $('#register-link').hide();
                }, 1500);
                getUsers(response.id)
                .then(response => {
                    if (response.code === 200) {
                        setUsers(response.users);
                        $('#main').removeClass('homescreen');
                        $('#main').addClass('homescreen-secondphase');
                        $('#register-link').hide();
                    } else {
                        alert (response.message);
                    }
                })
            } else {
                $(this).find('.response').css({'color': 'red'});
            }
        })
    }
})

function setUsers(users) {
    $('#content').append('<div class="avatars-div"><div class="row w-100"></div></div>');
    $.each(users, function() {
        $('.avatars-div .row').append(`<div class="col-3 profile" data-token="${this.token}">
                                    <img src="./img/${this.avatar}.png" class="w-100 mb-3"></img>
                                    <div class="user-name  rounded">${this.name}</div>
                                    </div>`)
    });
    $('.profile').on('click', async function() {
        localStorage.setItem('userToken', $(this).data('token'));
        window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + '/games.html';
    })
}

let points = 0;

async function checkUserGames() {
    checkToken()
    .then(response => {
        if (response.code === 200) {
            checkUserToken()
            .then(response => {
                if (response.code === 200) {
                    deleteState();
                    getGames(response.age, response.level)
                    .then(data => {
                        setGames(data.levels, response.sublevels, response.points_sublevels, response.points_sublevels_attempts, response.age, response.challenge_started);
                        setMedals(response.level, data.levels, response.sublevels, response.avatar);

                        const level_name = data.levels.find(element => element.id === response.level)['name'];
                        $('#progression-modal #level').html(level_name);
                    })
                    points = response.points;
                    // $('#welcome-message').html(`Welcome ${response.name} <span class="position-relative"><img src="./img/${response.avatar}-icon.svg"></img><span id='count'></span></span>`);
                    $('#welcome-message').html(`<p class="me-2">Welcome ${response.name}</p> <p class="position-relative"><img src="./img/${response.avatar}-icon.svg"></img><span id='count'></span></p>`);
                    $('#change-profile-link').data('name', response.name);
                    $('#change-profile-link').data('age', response.age);
                    $('#change-profile-link').data('avatar', response.avatar);
                    $('#progression-modal #avatar').attr('src', `./img/${response.avatar}.png`)
                    $('#progression-modal #points').html(response.points);
                    // CHANGES
                    localStorage.setItem('age', response.age);
                    if (response.age < 7) {
                        localStorage.setItem('ageGroup', 1);
                    } else if (response.age > 6 && response.age < 10) {
                        localStorage.setItem('ageGroup', 2);
                    } else {
                        localStorage.setItem('ageGroup', 3);
                    }
                    localStorage.setItem('avatar', response.avatar);

                } else {
                    alert(response.message);
                }
            })
        } else {
            window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + '/index.html';
        }
    })
}

function setMedals(currentLevel, levels, sublevelsWon, avatar) {
    levels.forEach(level => {
        const commonValues = level['sublevels'].filter(function(value) {
            return sublevelsWon.indexOf(value) != -1;
        });

        if (commonValues.length === level.sublevels.length) {
            $(`.medals img[id=${level.name}]`).attr('src', `./img/${level.name}_finished.png`);
        } else {
            $(`.medals img[id=${level.name}]`).attr('src', `./img/${level.name}_pending.png`);
        } 

        if (level.id === currentLevel) {
            level['sublevels'].forEach(element => {
                $('#progression-modal #progress').append(`<img src="./img/${avatar}-icon.svg"></img>`);
            });
            $(`#progression-modal #progress img:lt(${commonValues.length})`).css('opacity', 1);
            $('#welcome-message #count').text(commonValues.length);
        }
    });

    $('.medals img:not([src])').each(function() {
        $(this).attr('src', `./img/${$(this).attr('id')}_pending.png`);
    })
   
}

async function setGames(levels, sublevelsPlayed, sublevelsPointsEarned, sublevelsChallengeAttempts, age, challenge_started) {
    let j = 0;

    async function addRow() {
        let level = levels[j];
        $('#content #games-list').append(`<div data-game=${level.id} class="d-flex flex-row w-100 justify-content-around game-cards mb-3"></div>`);

        let i = 0;
        
        async function generateGameCard() {
            let sublevel = level.sublevels[i];
            fetch(`game cards/${sublevel}.html`)
            .then(response => response.text())
            .then(data => {
                $(`.game-cards[data-game=${level.id}]`).append(`<div class='d-flex flex-column align-items-center'>${data}</div>`);
                if (challenge_started !== 0) {
                    $(`div[data-game="${level.id}"]`).find(`div[data-game-id="${sublevel}"]`).on('click', function() {
                        $('#warning-modal').modal('show');
                    });
                    $(`div[data-game="${level.id}"]`).find(`div[data-game-id]:not([data-game-id="${challenge_started}"])`).next().attr('disabled', 'disabled')
                    
                } else {
                    if (sublevel === 1) {
                        $(`div[data-game="${level.id}"]`).find(`div[data-game-id="${sublevel}"]`).on('click', function() {
                            window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + `/${$(this).data('game')}_game1.html`;
                        });
                    } else if (sublevel === 2) {
                        if (sublevelsPlayed.includes(1)) {
                            $(`div[data-game="${level.id}"]`).find(`div[data-game-id="${sublevel}"] #padlock`).addClass('d-none')
                            $(`div[data-game="${level.id}"]`).find(`div[data-game-id="${sublevel}"]`).on('click', function() {
                                window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + `/subject-pronouns/index.html`;
                            });
                        } else {
                            $(`div[data-game="${level.id}"]`).find(`div[data-game-id="${sublevel}"] #padlock`).removeClass('d-none')
                            $(`div[data-game="${level.id}"]`).find(`div[data-game-id="${sublevel}"]`).on('click', function() {
                               $('#finish-previous-games-modal').modal('show')
                            });
                        }
                    }  else if (sublevel === 3) {
                        // $(`div[data-game="${level.id}"]`).find(`div[data-game-id="${sublevel}"]`).on('click', function() {
                        //     $('#finish-previous-games-modal').modal('show')
                        //  });
                        if (sublevelsPlayed.includes(2)) {
                            $(`div[data-game="${level.id}"]`).find(`div[data-game-id="${sublevel}"] #padlock`).addClass('d-none')
                            $(`div[data-game="${level.id}"]`).find(`div[data-game-id="${sublevel}"]`).on('click', function() {
                                window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + `/animals/activities.html`;
                            });
                        } else {
                            $(`div[data-game="${level.id}"]`).find(`div[data-game-id="${sublevel}"] #padlock`).removeClass('d-none')
                            $(`div[data-game="${level.id}"]`).find(`div[data-game-id="${sublevel}"]`).on('click', function() {
                               $('#finish-previous-games-modal').modal('show')
                            });
                        }
                    }
                }
             
                const attempts = sublevelsChallengeAttempts.filter(element => element == sublevel).length;
                if (sublevelsPlayed.includes(sublevel) && !sublevelsPointsEarned.includes(sublevel) && attempts < 2) {
                    $(`.game-card[data-game-id=${sublevel}]`).parent().append(`<button class='btn text-white p-1 p-md-2 p-xl-3 mt-3'>Earn points</button>`);
                    $(`.game-card[data-game-id=${sublevel}]`).next().on('click', function() {
                        startChallenge(age, sublevel, sublevelsPointsEarned, sublevelsChallengeAttempts);
                    })
                } 
            })
            .then(async () => {
                i = i + 1;
                if (i < level.sublevels.length) {
                    await generateGameCard()
                }
            })
            .catch(error => console.log(error))
        }

        await generateGameCard();

        j = j + 1;
        if (j < levels.length) {
            await addRow();
        }
    }

    await addRow()
   
    if (localStorage.getItem("showCongratsMessage") === 'true') {
        $('#congrats-modal').modal('show');
        localStorage.setItem('showCongratsMessage', 'false');
    }
}



function startChallenge(age, sublevel, all_points_sublevels, all_points_sublevels_attempts) {
   
    $('#challenge-form')[0].reset();
    markChallengeStarted(sublevel)
    .then(response => {
        if (response.code === 200) {
            $('#challenge-modal').modal('show');
            $('.game-card').on('click', function() {
                $('#warning-modal').modal('show');
            });
            // $(".game-card[data-game-id='1']").unbind('click');
            // $(".game-card[data-game-id='1']").on('click', function() {
            //     $('#warning-modal').modal('show');
            // });
            if (sublevel === 1) {
                $('#challenge_additional_text').text('Can you name 3 words you have spelt out in the game?')
            }
            if (sublevel === 2) {
                if (parseInt(localStorage.getItem('age')) > 6) {
                    $('#challenge_additional_text').text('Find the correct subject pronouns to replace the following noun groups.');
                    $('#challenge-form label').width('50%') 
                } else {
                    $('#challenge_additional_text').text('Give the English translations of the following subject pronouns.');
                    $('#challenge-form label').width('10%')
                }
                let questions;
                let answers;
                if (localStorage.getItem('ageGroup') == 1) {
                    questions = ['Nous', 'Je', 'Elle'];
                    answers = ['we', 'i', 'she'];
                } else if (localStorage.getItem('ageGroup') == 2) {
                    questions = ['Ryan and Thomas', 'The telephone', 'Meghan and you'];
                    answers = ['they', 'it', 'you'];
                } else {
                    questions = ['Kelly and William', 'Victoria', 'The horse'];
                    answers = ['they', 'she', 'it'];
                }
                $('#question-one label').html(questions[0]);
                $('#question-two label').html(questions[1]);
                $('#question-three label').html(questions[2]);
                $('#question-one input').data('answer', answers[0]);
                $('#question-two input').data('answer', answers[1]);
                $('#question-three input').data('answer', answers[2]);
            }

            $('#challenge-form').on('submit', function(e) {
                e.preventDefault();
                $.getScript("js/games.js", function() {
                    const data = userGames.find(element => age >= element.age[0] && age <= element.age[1]);

                    let count = 0;

                    if (sublevel === 1) {
                        let possible_answers = [];
                        $.each(data.games, function(key, value) {
                            content[value].forEach(element => {
                                possible_answers.push(element.en)
                            })
                        });
                        $.each($('#challenge-form input'), function() {
                            if (possible_answers.includes($(this).val().toLowerCase().trim())) {
                                count = count + 1;
                                $(this).next().html('&#x2713;');
                                $(this).next().css('color', 'green');
                            } else {
                                $(this).next().html('X');
                                $(this).next().css('color', 'red');
                            }
                        });    
                    } else if (sublevel === 2) {
                        
                        $.each($('#challenge-form input'), function() {
                            if ($(this).val().toLowerCase().trim() === $(this).data('answer')) {
                                count = count + 1;
                                $(this).next().html('&#x2713;');
                                $(this).next().css('color', 'green');
                            } else {
                                $(this).next().html('X');
                                $(this).next().css('color', 'red');
                            }
                        });    

                    }
            
                   
                    points = points + count*10;
        
                    if (count > 0) {
                        all_points_sublevels.push(sublevel);
                        submitChallengeData('points_sublevels', all_points_sublevels, points)
                        .then(response => {
                            // $('#challenge-form #cancel_challenge').hide();
                            $('#challenge-form #submit_challenge').hide();
                            $('#challenge-form #close_challenge').removeClass('d-none');
                            $('#challenge-form #close_challenge').on('click', function() {
                                setTimeout(() => {
                                    $('#challenge-form')[0].reset();
                                    location.reload();
                                }, 300);
                            });

                            // Get the Bootstrap modal element
                            const modal = document.getElementById('challenge-modal');

                            // Add an event listener to the modal
                            modal.addEventListener('hidden.bs.modal', function () {
                            // Execute your code here when the modal is being closed
                            console.log('Modal is being closed');
                            setTimeout(() => {
                                $('#challenge-form')[0].reset();
                                location.reload();
                            }, 300);
                            });
                           
                        })
                        .catch(error => {
                            setTimeout(() => {
                                $('#challenge-form')[0].reset();
                                location.reload();
                            }, 300);
                        })
                    } else {
                        all_points_sublevels_attempts.push(sublevel);
                        submitChallengeData('points_sublevels_attempts', all_points_sublevels_attempts, points)
                        .then(response => {
                            // $('#challenge-form #cancel_challenge').hide();
                            $('#challenge-form #submit_challenge').hide();
                            $('#challenge-form #close_challenge').removeClass('d-none');
                            $('#challenge-form #close_challenge').on('click', function() {
                                setTimeout(() => {
                                    // $('#challenge-form')[0].reset();
                                    location.reload();
                                }, 300);
                            });
                               // Get the Bootstrap modal element
                               const modal = document.getElementById('challenge-modal');

                               // Add an event listener to the modal
                               modal.addEventListener('hidden.bs.modal', function () {
                               // Execute your code here when the modal is being closed
                               console.log('Modal is being closed');
                               setTimeout(() => {
                                   $('#challenge-form')[0].reset();
                                   location.reload();
                               }, 300);
                               });
                        })
                        .catch(error => {
                            setTimeout(() => {
                                // $('#challenge-form')[0].reset();
                                location.reload();
                            }, 300);
                        })
                    }
                  });
            })
        } else {
            alert (response.message);
        }
    })
    .catch(error => {
        alert("Quelque chose s’est mal passé. Réessayez s'il vous plaît."); 
        console.log(error);
    });
}

// $('#challenge-modal #cancel_challenge').on('click', function() {
//     unmarkChallengeStarted()
//     .then(response => {
//         if (response.code === 200) {
//             $('#challenge-form')[0].reset();
//             $('#challenge-modal').modal('hide');
//             setTimeout(() => {
//                 location.reload();
//             }, 300);
//         } else {
//             alert(response.message);
//         }
//     })
//     .catch(error => {
//         setTimeout(() => {
//             $('#challenge-form')[0].reset();
//             location.reload();
//         }, 300);
//     })
// })
