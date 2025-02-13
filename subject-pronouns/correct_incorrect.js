$(document).ready(function () {
let gameAlreadyPlayed = false;
function startGame() {
    const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
    let number_of_images;
    let folder;

    if (localStorage.getItem('ageGroup') == '1') {
        number_of_images = {
            'i' : 3,
            'you' : 4,
            'he' : 5,
            'she' : 7,
            'it' : 9,
            'we' : 4,
            'they' : 4
        }
        folder = '1_3';
    } else {
        number_of_images = {
            'i' : 2,
            'you' : 5,
            'he' : 5,
            'she' : 5,
            'it' : 10,
            'we' : 6,
            'they' : 3
        }
        folder = '2_1';
    }

    const possibleAnswersBoolean = ['correct', 'incorrect'];

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

    let correct_incorrect = '';
    function createPossibleAnswer(arr, correctAnswer) {
        let proposedAnswer;
        let randomIndex = Math.floor(Math.random() * possibleAnswersBoolean.length);

        correct_incorrect = possibleAnswersBoolean[randomIndex];
        console.log(correct_incorrect);
        if (correct_incorrect === 'correct') {
            proposedAnswer = correctAnswer;
        } else {
            let temp_array = [...arr];
            let indexOfCorrect = temp_array.indexOf(correctAnswer);
            if (indexOfCorrect !== -1) {
                temp_array.splice(indexOfCorrect, 1);
            }
            let randomIndex = Math.floor(Math.random() * temp_array.length);
            proposedAnswer = temp_array[randomIndex];
        }
        return proposedAnswer;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    function renderProposedAnswers(selector, allAnswers, correctAnswer) {
        const proposedAnswer = createPossibleAnswer(allAnswers, correctAnswer);
        $(selector).text(proposedAnswer);
    }
    
    function render() {
        randomElement = pickAndRemoveRandomElement(images);
        correctAnswer = randomElement.split('_')[0];
        document.querySelector('.container-right img:not(.audio-icon)').src = `media/${folder}/${randomElement}`;
        if (folder === '1_3' && randomElement === 'he_4.png') {
            $('.white-circle').css('left', '');
            $('.white-circle').css('right', '5%');
        } else {
            $('.white-circle').css('right', '');
            $('.white-circle').css('left', '5%');
        }
        renderProposedAnswers('.white-circle', pronouns, correctAnswer);
    }

    let images = imageFileNames(pronouns, number_of_images);
    let countAllAnswers = images.length;
    let randomElement;
    let correctAnswer;

    render();
   
    let correctAnswersCount = 0
    async function checkAnswer(event) {
        $this = event.currentTarget;
        $('div[data-answer="correct"], div[data-answer="incorrect"]').off('click', checkAnswer);
        
        if ($(this).data('answer') === correct_incorrect) {
            $(this).addClass('correct animate__animated animate__bounce animate__slow');
        } else {
            $(this).addClass('incorrect animate__animated animate__shakeX animate__slow');
        }
        if ($('.correct').length !== 0) {
            correctAnswersCount += 1;
        }
        if (images.length > 0) {
            setTimeout(() => {
                correct_incorrect = '';
                $(this).removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                render();
                $('div[data-answer="correct"], div[data-answer="incorrect"]').on('click', checkAnswer);
            }, 2000);
        } else {
            $('div[data-answer="correct"], div[data-answer="incorrect"]').off('click', checkAnswer);
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
                    $('[data-answer]').removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                    startGame();
                });
                $('#reviewLessonButton').on('click',function () {
                window.location.href = "index.html"
                });
            }
        }
    }

    $('div[data-answer="correct"], div[data-answer="incorrect"]').on('click', checkAnswer);


}
startGame()
});


