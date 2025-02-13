$(document).ready(function () {
let gameAlreadyPlayed = false;

function startGame() {
    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
    const number_of_images = {
        'i' : 3,
        'you' : 6,
        'he' : 3,
        'she' : 3,
        'it' : 3,
        'we' : 3,
        'they' : 6
    };

    function imageFileNames(pronouns, number_of_images) {
        let fileNames = [];
        pronouns.forEach(element => {
            for (let i = 1; i <= number_of_images[element]; i++) {
                fileNames.push(`${element}_${i}.png`);
            }
        });
        return shuffleArray(fileNames);
    }    
   
    function pickAndRemoveRandomElement(arr) {
        const randomIndex = Math.floor(Math.random() * arr.length);
        const removedElement = arr.splice(randomIndex, 1)[0];
        return removedElement;
    };

    function createPossibleAnswers(arr, correctAnswer, answersCount) {
        let proposedAnswers = [correctAnswer];
        while (proposedAnswers.length < answersCount) {
            let randomIndex = Math.floor(Math.random() * arr.length);
            if (!proposedAnswers.includes(arr[randomIndex])) {
                proposedAnswers.push(arr[randomIndex]);
            }
        }
        return shuffleArray(proposedAnswers);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    function renderProposedAnswers(selector, allAnswers, correctAnswer) {
        const count = $(selector).length;
        const proposedAnswers = createPossibleAnswers(allAnswers, correctAnswer, count);
        $(selector).each(function(){
            $(this).text(proposedAnswers.shift());
        })
    }

    function render() {
        randomElement = pickAndRemoveRandomElement(images);
        correctAnswer = randomElement.split('_')[0];
        document.querySelector('.container-right img:not(.audio-icon)').src = `media/1_1/${randomElement}`;
        renderProposedAnswers('#proposed_answers>div', pronouns, correctAnswer);
    }

    function showMessage(message) {
        $('#message-modal .modal-body').text(message);
        $('#message-modal').modal('show');
    }

    function hideMessage() {
        $('#message-modal').modal('hide');
    }

    const images = imageFileNames(pronouns, number_of_images);
    const countAllAnswers = images.length;
    let tryCount = 0;
    let randomElement;
    let correctAnswer;

    render();
   
    let correctAnswersCount = 0;
    $('#proposed_answers>div').on('click', function(e) {
        checkAnswer(e);
    });

    async function checkAnswer(e) {
        $('#proposed_answers>div').off('click');
        console.log("asdasd")
        const element = e.currentTarget;
        tryCount += 1;
        if ($(element).text().toLowerCase() === correctAnswer) {
            correctAnswersCount += 1;
            $(element).addClass('correct animate__animated animate__bounce animate__slow');
            if (images.length > 0) {
                setTimeout(() => {
                    tryCount = 0;
                    $(element).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                    
                    render();
                    $('#proposed_answers>div').on('click', function(e) {
                        checkAnswer(e);
                    });
                }, 2000);
            } else {
                $(element).on('click', function(){return})
                const sublevelWon = await checkIfSublevelWon(Math.round((correctAnswersCount/countAllAnswers)*100));
                    if (!sublevelWon) {
                        if (correctAnswersCount/countAllAnswers >= 0.8) {
                            $('#message-modal .modal-body').html('<p>Nice job!</p><p>Play another game if you want &#128522</i>.</p>')
                            $('#message-modal .modal-body').append(`<button id="restartButton" class="btn-blue btn">Play again</button>`)
                            
                        } else {
                            if (gameAlreadyPlayed) {
                                $('#message-modal .modal-body').html('<p>Review the lesson and play it again later &#128522</i> !</p>')
                                $('#message-modal .modal-body').append(`<button id="reviewLessonButton" class="btn-blue btn">The lesson</button>`)
                            } else {
                                $('#message-modal .modal-body').html('<p>We are sure you can do better. &#128577;</i></p><p>Please try again.</p>')
                                $('#message-modal .modal-body').append(`<button id="restartButton" class="btn-blue btn">Play again</button>`)
                            }
                        }
                        $('#message-modal .modal-body').css('text-align', 'center');
                        $('#message-modal').modal('show');
                        $('#restartButton').on('click',function () {
                            if (correctAnswersCount/countAllAnswers < 0.8) {
                                gameAlreadyPlayed = true;
                            }
                            $('#message-modal').modal('hide'); 
                            $('#proposed_answers>div').removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                            startGame();
                        });
                        $('#reviewLessonButton').on('click',function () {
                        window.location.href = "index.html"
                        });
                    }
            }
        } else {
            if (tryCount < 2) {
                $(element).addClass('incorrect animate__animated animate__shakeX animate__slow');
                showMessage('Please try again');
                setTimeout(() => {
                    hideMessage();
                    $(element).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                    $('#proposed_answers>div').on('click', function(e) {
                        checkAnswer(e);
                    });
                }, 2000);
            } else {
                $(element).addClass('incorrect animate__animated animate__shakeX animate__slow');
                $("#proposed_answers>div").filter(function() {
                    return $(this).text().trim() === correctAnswer;
                }).addClass('correct');
                // $(`#proposed_answers>div:contains("${correctAnswer}")`).addClass('correct');
                if (images.length > 0) {
                    setTimeout(() => {
                        tryCount = 0;
                        $(`#proposed_answers>div`).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                        render();
                        $('#proposed_answers>div').on('click', function(e) {
                            checkAnswer(e);
                        });
                    }, 2000);
                } else {
                    $(element).on('click', function(){return})
                    const sublevelWon = await checkIfSublevelWon(Math.round((correctAnswersCount/countAllAnswers)*100));
                    if (!sublevelWon) {
                        if (correctAnswersCount/countAllAnswers >= 0.8) {
                            $('#message-modal .modal-body').html('<p>Nice job!</p><p>Play another game if you want &#128522</i>.</p>')
                            $('#message-modal .modal-body').append(`<button id="restartButton" class="btn-blue btn">Play again</button>`)
                            
                        } else {
                            if (gameAlreadyPlayed) {
                                $('#message-modal .modal-body').html('<p>Review the lesson and play it again later &#128522</i> !</p>')
                                $('#message-modal .modal-body').append(`<button id="reviewLessonButton" class="btn-blue btn">The lesson</button>`)
                            } else {
                                $('#message-modal .modal-body').html('<p>We are sure you can do better. &#128577;</i></p><p> Please try again.</p>')
                                $('#message-modal .modal-body').append(`<button id="restartButton" class="btn-blue btn">Play again</button>`)
                            }
                        }
                        $('#message-modal .modal-body').css('text-align', 'center');
                        $('#message-modal').modal('show');
                        $('#restartButton').on('click',function () {
                            if (correctAnswersCount/countAllAnswers < 0.8) {
                                gameAlreadyPlayed = true;
                            }
                            $('#message-modal').modal('hide'); 
                            $('#proposed_answers>div').removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
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
  
    // const sizes = {
    //     'it_1' : '50%',
    //     'it_2' : '40%',
    //     'it_3' : '50%'
    // }
    // $(".container-right img").on('load', function() {
    //     const width = this.naturalWidth;
    //     const height = this.naturalHeight;

    //     if (height/width >= 1.5) {
    //         this.style.height = "90%";
    //     } else if (height === width) {
    //         this.style.height = "40%";
    //     } else {
    //         if (width/height >= 1.5) {
    //             this.style.height = "40%";
    //         } 
    //         else {
    //             this.style.height = "80%";
    //         }
    //     }

    //     if (this.src.includes('it_')) {
    //         this.style.height = sizes[this.src.split('/')[this.src.split('/').length -1].split('.')[0]];
    //     }
    // });

}
startGame();

});

