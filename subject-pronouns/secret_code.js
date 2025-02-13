$(document).ready(function () {
let gameAlreadyPlayed = false;
const pronouns = ['i', 'you', 'he', 'she', 'it', 'we', 'they'];
let number_of_images = {};
let dir = '';
let images;
let compiledPages;
let allNumbersArray;
let codeArray;
let countAllGames;
let countCorrectGames = 0;
let countdownInterval = null;
let countdown = false;
let gameStopped = false;


function imageFileNames(pronouns, number_of_images) {
    let fileNames = [];
    pronouns.forEach(element => {
        let array = [];
        for (let i = 1; i <= number_of_images[element]; i++) {
            array.push(`${element}_${i}.png`);
        }
        fileNames.push(shuffleArray(array));
    });
    return fileNames;
}    

function compilePages(codeLength, proposalCount) {
    let pages = [];
    const noOfPages = 10;

    while (pages.length < noOfPages) {
        images.forEach(element => {
            if (pages.length === noOfPages) {
                return;
            }
            if (element.length >= codeLength) {
                let imageElements = element.splice(0,codeLength);
                pages.push(imageElements);
            }
        });
        shuffleArray(images);
    }
   
    let combinedArray = shuffleArray([].concat(...images));

    pages.forEach(page => {
        let index = combinedArray.findIndex(element => element.split('_')[0] !== page[0].split('_')[0]);
        if (index !== -1) {
            page.push(combinedArray[index]);
            combinedArray.splice(index, 1);
        }
    });

    shuffleArray(pages);

    if (combinedArray.length !== 0) {
        combinedArray.forEach(element => {
            let index = pages.findIndex(page => page.length < proposalCount && page[0].split('_')[0] !== element.split('_')[0]);
            if (index !== -1) {
                pages[index].push(element);
            }
        });
    }
    return pages;
}

function checkLengths(arr, count) {
    let correct = true;
    arr.forEach(element => {
        if (element.length < count) {
            correct = false;
            return;
        }
    })
    return correct;
}

function pickAndRemoveRandomElement(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const removedElement = arr.splice(randomIndex, 1)[0];
    return removedElement;
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

function stopCounter() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    console.log(countdownInterval)
}

function handleClick(e) {
    if (localStorage.getItem('ageGroup') == '3' && !$('#countdown button').attr('disabled')) {
        return
    }
    $this = e.currentTarget;
    $(this).off('click', handleClick);
    let emptyInputs = $('.container-right input:text').filter(function() {
        return $(this).val().trim() === '';
    });
    if (emptyInputs.length !== 0 && $(this).data('selected') !== 'true') {
        $(emptyInputs[0]).val($(this).text());
        $(this).data('selected', 'true');
    }
    emptyInputs = $('.container-right input:text').filter(function() {
        return $(this).val().trim() === '';
    });
    
    if (emptyInputs.length === 0) {
        $('.proposed_part_of_code').off('click', handleClick);
        checkCode();
    }
}

function setCountdown() {
    countdown = true;
    if ($('#countdown').length === 0) {
        $('#proposed_answer').append(`<div id="countdown"><button class="btn-blue btn">start</button></div>`);
    } else {
        $('#countdown button').text('start');
        $('#countdown button').removeAttr('disabled');
    }
    
    const buttonWitdh = $('#countdown button').width();
    $('#countdown button').height(buttonWitdh);
        
    let i = 0;
       
    $('#countdown button').on('click', startTimer)
}

function startTimer() {
    $('#countdown button').attr('disabled', true);
    $('#countdown button').off('click', startTimer);
    i = 0;
    countdownInterval = setInterval(function() {
        const countdownFinalValue = 59;
        const timeRemaining = countdownFinalValue - i;
        if (timeRemaining < 0) {
            showMessage(true);
        } else {
            $('#countdown button').text(timeRemaining);
            i += 1;
        }
    }, 1000); 
}


function setNext() {
    $('.container-right input:text').removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
    $('.container-right input:text').val('');
    $('.proposed_part_of_code').removeData('selected');
    $('.secret-code-cards').empty();
    $('.secret-code').next().empty();
    allNumbersArray = [1,2,3,4,5,6,7,8,9];
    codeArray = [];
    render();
    $('.proposed_part_of_code').on('click', handleClick);
    $('.proposed_part_of_code').prev().on('click', function() {
        $(this).next().click();
    })
}

function checkCode() {
    $('.container-right input').each(function() {
        if (codeArray.includes(parseInt($(this).val()))) {
            $(this).addClass('correct');
        } else {
            $(this).addClass('incorrect');
        }
    });

    if ($('.incorrect').length === 0) {
        countCorrectGames += 1;
    }

    showMessage()
}

async function showMessage(timeout) {
    if (timeout) {
        stopCounter();
    }
    if (gameStopped) {
        return;
    }
console.log("asdasda");
    if (compiledPages.length > 0 && timeout !== true) {
        if (countdown && $('.incorrect').length !== 0) {
            setTimeout(() => {
                $('.container-right input:text').removeClass('correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX');
                $('.container-right input:text').val('');
                $('.proposed_part_of_code').removeData('selected');
                $('.proposed_part_of_code').on('click', handleClick);
                $('.proposed_part_of_code').prev().on('click', function() {
                    $(this).next().click();
                })
            }, 700);
        } else {
            setTimeout(() => {
                setNext()
            }, 700);
        }
    } else {
        gameStopped = true;
        if (countdown) {
            stopCounter();
        }
        const sublevelWon = await checkIfSublevelWon(Math.round((countCorrectGames/countAllGames)*100));
        if (!sublevelWon) {
            if ((countdown && countCorrectGames === countAllGames) || (!countdown && countCorrectGames/countAllGames >= 0.8)) {
                $('#message-modal .modal-body').html(`<p>${countCorrectGames} secret codes found.</p><p>Nice job!</p><p>Play another game if you want &#128522</i>.</p>`)
                $('#message-modal .modal-body').append(`<button id="restartButton" class="btn-blue btn">Play again</button>`);
                
            } else {
                if (gameAlreadyPlayed) {
                    $('#message-modal .modal-body').html('<p>Review the lesson and play it again later &#128522</i> !</p>')
                    $('#message-modal .modal-body').append(`<button id="reviewLessonButton" class="btn-blue btn">The lesson</button>`)
                } else {
                    $('#message-modal .modal-body').html(`<p>${countCorrectGames} secret codes found.</p><p>We are sure you can do better. &#128577;</i></p><p>Please try again.</p>`)
                    $('#message-modal .modal-body').append(`<button id="restartButton" class="btn-blue btn">Play again</button>`)
                    gameAlreadyPlayed = true;
                }
            }
            $('#message-modal').css('text-align', 'center');
            $('#message-modal').modal('show');
            $('#restartButton').on('click',function () {
            $('#message-modal').modal('hide'); 
            $('.secret-code-cards').empty()
            $('.secret-code').next().empty()
            startGame();
            });
            $('#reviewLessonButton').on('click',function () {
                window.location.href = "index.html"
            });
        }
    }
}


function render() {
    let randomElement = pickAndRemoveRandomElement(compiledPages);
    let correctAnswer = randomElement[0].split('_')[0];
    $('#proposed_answer .btn-379').text(correctAnswer);

   let shuffled = shuffleArray(shuffleArray(shuffleArray(randomElement)));
   shuffled.forEach(element => {
        let randomNumber = pickAndRemoveRandomElement(allNumbersArray);
        if (element.split('_')[0] === correctAnswer) {
            codeArray.push(randomNumber);
        }
      
        $('.secret-code-cards').append(`
        <div class="align-items-center d-flex flex-column p-0 m-1 m-md-2" style="width: fit-content;">
                <img src="./media/${dir}/${element}" alt="Image" class="secret-code-card {localStorage.getItem('ageGroup') == '2' ? "first-age-group" : ""}">
            <div class="btn-379 btn-white-red btn m-2 px-2 proposed_part_of_code">${randomNumber}</div>
        </div>`);
   });
   const codeLength = parseInt(localStorage.getItem('ageGroup'));
   for (let i = 1; i <= codeLength; i++) { 
    $('.secret-code').next().append(`
        <input type="text" class="btn-379 btn-white-green me-2 me-xl-3" disabled>
    `);
   };
}

function startGame() {
    if (localStorage.getItem('ageGroup') == '2') {
        number_of_images = {
            'i' : 2,
            'you' : 4,
            'he' : 4,
            'she' : 7,
            'it' : 5,
            'we' : 4,
            'they' : 4
        };
        dir = '2_3';
        $('.instruction-en').html($('.instruction-en').html().replace(' Attention! You have one minute to find the ten correct secret codes.', ''))
        $('.instruction-fr').html($('.instruction-fr').html().replace(' Attention ! Tu as une minute pour trouver les dix bons codes secrets.', ''))
    } else {
        number_of_images = {
            'i' : 3,
            'you' : 3,
            'he' : 7,
            'she' : 10,
            'it' : 12,
            'we' : 6,
            'they' : 6
        };
        dir = '3_1';
    }

    allNumbersArray = [1,2,3,4,5,6,7,8,9];
    codeArray = [];
    gameStopped = false;

    let correctLength = false;
    while (correctLength === false) {
        images = imageFileNames(pronouns, number_of_images);
        
        let arraysLength;
        let proposalCount;
        if (localStorage.getItem('ageGroup') === '2') {
            arraysLength = 3;
            proposalCount = 3;
        } else {
            arraysLength = 4;
            proposalCount = 4;
        }
        
        compiledPages = compilePages(parseInt(localStorage.getItem('ageGroup')), proposalCount);
        correctLength = checkLengths(compiledPages, arraysLength);
    }

    countAllGames = compiledPages.length;
    countCorrectGames = 0;
    render();
   
    if (localStorage.getItem('ageGroup') == '3') {
        setCountdown();
    }
    
    $('.proposed_part_of_code').on('click', handleClick);
    $('.proposed_part_of_code').prev().on('click', function() {
        $(this).next().click();
    })

    $('#proposed_answer .btn-379').css('text-transform', 'capitalize');
}

startGame();

});

