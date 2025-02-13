$(document).ready(function () {
let gameAlreadyPlayed = false;
let countAllGames = 27;
let countCorrectGames = 0;
let countTry = 0;
let imageCombinations = [ 
    ['she', 'they', 'i', 'we'],
    ['we', 'they', 'he', 'you'],
    ['it', 'they', 'she', 'you'],
    ['i', 'they', 'she', 'it'],
    ['it', 'you', 'he', 'they'],
    ['i', 'they', 'he', 'you'],
    ['it', 'we', 'she', 'they'],
    ['it', 'you', 'she', 'they'],
    ['we', 'you', 'he', 'they'],
    ['she', 'it', 'i', 'we'],
    ['he', 'you', 'we', 'they'],
    ['it', 'we', 'she', 'you'],
    ['i', 'it', 'she', 'we'],
    ['he', 'you', 'i', 'it'],
    ['i', 'you', 'he', 'it'],
    ['she', 'we', 'it', 'he'],
    ['she', 'you', 'it', 'we'],
    ['it', 'you', 'he', 'we'],
    ['she', 'we', 'i', 'it'],
    ['he', 'you', 'we', 'it'],
    ['it', 'we', 'she', 'you'],
    ['i', 'it', 'she', 'we'],
    ['it', 'you', 'he', 'she'],
    ['she', 'it', 'he', 'you'],
    ['it', 'he', 'she', 'we'],
    ['she', 'we', 'it', 'you'],
    ['she', 'we', 'he', 'it']
];
let countObject = {};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function render() {
    let count = 0;
    let answers = [];

    const firstElement = imageCombinations.shift();
    const firstElementShuffeled = shuffleArray(firstElement);
   
    while (count <= 3) {
        let index = countObject[firstElementShuffeled[count]].shift();
        document.querySelectorAll('.container-right img:not(.audio-icon)')[count].src = `media/1_4/${firstElementShuffeled[count]}_${index}.png`;
        answers.push(firstElementShuffeled[count]);
        count += 1;
    }

    let proposedAnswers = shuffleArray(answers);

    count = 0;
    while (count <= 3) {
        document.querySelectorAll('#proposed_answers div')[count].textContent = proposedAnswers[count];
        count += 1;
    }
}

function startGame() {
    countCorrectGames = 0;
    countTry = 0;
    countObject = {};

    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
    const number_of_images = {
        'i' : 9,
        'you' : 17,
        'he' : 14,
        'she' : 18,
        'it' : 22,
        'we' : 18,
        'they' : 10
    };
    
    imageCombinations = [ 
        ['she', 'they', 'i', 'we'],
        ['we', 'they', 'he', 'you'],
        ['it', 'they', 'she', 'you'],
        ['i', 'they', 'she', 'it'],
        ['it', 'you', 'he', 'they'],
        ['i', 'they', 'he', 'you'],
        ['it', 'we', 'she', 'they'],
        ['it', 'you', 'she', 'they'],
        ['we', 'you', 'he', 'they'],
        ['she', 'it', 'i', 'we'],
        ['he', 'you', 'we', 'they'],
        ['it', 'we', 'she', 'you'],
        ['i', 'it', 'she', 'we'],
        ['he', 'you', 'i', 'it'],
        ['i', 'you', 'he', 'it'],
        ['she', 'we', 'it', 'he'],
        ['she', 'you', 'it', 'we'],
        ['it', 'you', 'he', 'we'],
        ['she', 'we', 'i', 'it'],
        ['he', 'you', 'we', 'it'],
        ['it', 'we', 'she', 'you'],
        ['i', 'it', 'she', 'we'],
        ['it', 'you', 'he', 'she'],
        ['she', 'it', 'he', 'you'],
        ['it', 'he', 'she', 'we'],
        ['she', 'we', 'it', 'you'],
        ['she', 'we', 'he', 'it']
    ];

    for (let pronoun in number_of_images) {
        let tempArray = [];
        for (let i = 1; i < number_of_images[pronoun] + 1; i++) {
            tempArray.push(i);
        }
        const shuffeled = shuffleArray(tempArray);
        countObject[pronoun] = shuffeled;
    }

    render();
   
    $('.container-right .drop_box').on('dragover', function(event) {
        event.preventDefault();
    });
    
    $('#proposed_answers div').attr('draggable', 'true');

    let text = '';
    let identifier = '';

    $('#proposed_answers div').on('dragstart', function(event) {
        event.originalEvent.dataTransfer.setData("text", $(this).text()); 
        text = $(this).text();
        const randomString = generateRandomString(10);
        $(this).attr('id', randomString);
        identifier = randomString;
    });
    
    $('.container-right .drop_box').on('drop', function(event) {
        event.preventDefault();
        if ($(event.currentTarget).find('input').val() === '') {
            const data = event.originalEvent.dataTransfer.getData("text");
            $(event.currentTarget).find('input').val(data);

            $(`#${identifier}`).css('opacity', '0.1');
            $(`#${identifier}`).attr('draggable', 'false');
            $(event.currentTarget).find('input').data('answer_id', identifier);
    
           
            if ($('.container-right input').filter(function() {
                return $(this).val() === '';
            }).length === 0) {
                checkResponses();
            }
        } else {
            const data = event.originalEvent.dataTransfer.getData("text");
            $(event.currentTarget).find('input').val(data);
          
            $(`#${$(event.currentTarget).find('input').data('answer_id')}`).css('opacity', '1');
            $(`#${$(event.currentTarget).find('input').data('answer_id')}`).attr('draggable', 'true');

            $(event.currentTarget).find('input').data('answer_id', identifier);
            $(`#${identifier}`).css('opacity', '0.1');
            $(`#${identifier}`).attr('draggable', 'false');
        }
    });

}

async function checkResponses() {
    // SHOW ANIMATIONS AND add correct played if all answers are correct
    $('.match-game-column').each(function() {
        const file_name_parts = $(this).find('img').attr('src').split('/');
        if (file_name_parts[file_name_parts.length - 1].split('_')[0] === $(this).find('input').val().toLowerCase()) {
            $(this).find('input').addClass('correct animate__animated animate__bounce animate__slow');
        } else {
            $(this).find('input').addClass('incorrect animate__animated animate__shakeX animate__slow');
        }
    });

    // CHECK IF ALL CORRECT
    let all_correct = false;
    if ($('.match-game-column .correct').length === $('.match-game-column').length) {
        all_correct = true;
        countCorrectGames += 1;
    } else {
        countTry += 1;
    }
    
    if (all_correct) {
        if (imageCombinations.length > 0) {
            setTimeout(() => {
                $('.match-game-column input').each(function() {
                    $(this).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX')
                });
                $('#proposed_answers div').css('opacity', '1');
                $('#proposed_answers div').attr('draggable', 'true');
                $('.match-game-column input').val('');
                render();
            }, 2000);
        } else {
            const sublevelWon = await checkIfSublevelWon(Math.round((countCorrectGames/countAllGames)*100));
            if (!sublevelWon) {
                if (countCorrectGames/countAllGames >= 0.8) {
                    $('#message-modal .modal-body').html('<p>Nice job!</p><p>Play another game if you want &#128522</i>.</p>')
                    $('#message-modal .modal-body').append(`<button id="restartButton" class="btn-blue btn">Play again</button>`)
                } else {
                    if (gameAlreadyPlayed) {
                        $('#message-modal .modal-body').html('<p>Review the lesson and play it again later &#128522</i> !</p>')
                        $('#message-modal .modal-body').append(`<button id="reviewLessonButton" class="btn-blue btn">The lesson</button>`)
                    } else {
                        $('#message-modal .modal-body').html('<p>We are sure you can do better. &#128577;</i></p><p>Please try again.</p>')
                        $('#message-modal .modal-body').append(`<button id="restartButton" class="btn-blue btn">Play again</button>`)
                        gameAlreadyPlayed = true;
                    }
                }

                $('#message-modal .modal-body').css('text-align', 'center');
                $('#message-modal').modal('show');

                $('#restartButton').on('click',function () {
                    $('#message-modal').modal('hide'); 
                    $('.match-game-column input').removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                    $('#proposed_answers div').css('opacity', '1');
                    $('#proposed_answers div').attr('draggable', 'true');
                    $('.match-game-column input').val('');
                    startGame();
                });
                $('#reviewLessonButton').on('click',function () {
                window.location.href = "index.html"
                });
            }
        }
    } else {
        if (countTry < 2) {
            $('#message-modal .modal-body').text('Please try again');
            $('#message-modal').modal('show');
            setTimeout(() => {
                $('#message-modal').modal('hide');
                $('.match-game-column input').each(function() {
                    if ($(this).hasClass('incorrect')) {
                        $(this).val('');
                        $(`#${$(this).data('answer_id')}`).css('opacity', '1');
                        $(`#${$(this).data('answer_id')}`).attr('draggable', 'true');
                    }
                })
                $('.match-game-column input').each(function() {
                    $(this).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX')
                });
            }, 2000);
        } else {
            countTry = 0;
            if (imageCombinations.length > 0) {
                setTimeout(() => {
                    $('.match-game-column input').each(function() {
                        $(this).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX')
                    });
                    $('#proposed_answers div').css('opacity', '1');
                    $('#proposed_answers div').attr('draggable', 'true');
                    $('.match-game-column input').val('');
                    render();
                }, 2000);
            } else {
                const sublevelWon = await checkIfSublevelWon(Math.round((countCorrectGames/countAllGames)*100));
                if (!sublevelWon) {
                    if (countCorrectGames/countAllGames >= 0.8) {
                        $('#message-modal .modal-body').html('<p>Nice job!</p><p>Play another game if you want &#128522</i>.</p>')
                        $('#message-modal .modal-body').append(`<button id="restartButton" class="btn-blue btn">Play again</button>`)
                    } else {
                        if (gameAlreadyPlayed) {
                            $('#message-modal .modal-body').html('<p>Review the lesson and play it again later &#128522</i> !</p>')
                            $('#message-modal .modal-body').append(`<button id="reviewLessonButton" class="btn-blue btn">The lesson</button>`)
                        } else {
                            $('#message-modal .modal-body').html('<p>We are sure you can do better. &#128577;</i></p><p>Please try again.</p>')
                            $('#message-modal .modal-body').append(`<button id="restartButton" class="btn-blue btn">Play again</button>`)
                            gameAlreadyPlayed = true;
                        }
                    }
                    $('#message-modal .modal-body').css('text-align', 'center');
                    $('#message-modal').modal('show');
                    $('#restartButton').on('click',function () {
                        $('#message-modal').modal('hide'); 
                        $('.match-game-column input').removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                        $('#proposed_answers div').css('opacity', '1');
                        $('#proposed_answers div').attr('draggable', 'true');
                        $('.match-game-column input').val('');
                        startGame();
                    });
                    $('#reviewLessonButton').on('click',function () {
                    window.location.href = "index.html"
                    });
                }
            }
        }
    }
}

startGame();
});

