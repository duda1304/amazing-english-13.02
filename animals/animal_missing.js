$(document).ready(function () {
  const categories = [
    {
      name: "farmAnimals",
      animals: [
        "cow",
        "sheep",
        "pig",
        "horse",
        "goose",
        "hen",
        "chicken",
        "duck"
      ],
    },
    {
      name: "wildAnimals",
      animals: [
        "lion",
        "tiger",
        "elephant",
        "giraffe",
        "zebra",
        "rhinoceros",
        "cheetah",
        "antelope"
      ],
    },
    {
      name: "pets",
      animals: [
        "dog",
        "cat",
        "hamster",
        "parrot",
        "goldfish",
        "turtle",
        "rabbit",
        "canary"
      ],
    }
  ];

  let animalQuestions = [];

  categories.forEach((category) => {
    category.animals.forEach((animal) => {
      animalQuestions.push({
        category: category.name,
        backgroundImage: `./media/animal_missing/${animal}_missing.png`,
        correct: animal,
        answers: category.animals.slice(),
      });
    });
  });

  shuffleQuestions();

  let currentIndex = 0;
  let tryCount = 0;
  let correctAnswersCount = 0;
  let gameAlreadyPlayed = false;
  let currentCategory = 'farmAnimals';


  function addCounter() {
    if (localStorage.getItem("ageGroup") == 2) {
      setCountdown()
    } 
  }

  let countdownInterval;

  function stopCounter() {
    clearInterval(countdownInterval);
  }

  function setCountdown() {
    stopCounter();
    $('#countdown').remove();
    $('main').append(`<div id="countdown" class="m-3 position-absolute top-0 end-0"><button class="btn-blue btn w-100" style="opacity: 1;">15</button></div>`);

    enableButtons()
    startTimer()
  }
  
  function startTimer() {
    $('#countdown button').attr('disabled', true);
    $('#countdown button').off('click', startTimer);
    i = 1;
    countdownInterval = setInterval(function() {
      const countdownFinalValue = 15;
      const timeRemaining = countdownFinalValue - i;
      if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        endGameMessage()
      } else {
        $('#countdown button').text(timeRemaining);
        i += 1;
      }
    }, 1000); 
  }

  function loadAnimal() {
    if (animalQuestions[currentIndex].category !== currentCategory) {
      $('.image-wrapper').removeClass(currentCategory)
      currentCategory = animalQuestions[currentIndex].category;
      $('.image-wrapper').addClass(currentCategory)
    }

    stopCounter()
    $('#countdown').remove();
    addCounter();

    resetButtonStyles();
    $("#animal-missing").css(
      "background-image",
      `url(${animalQuestions[currentIndex].backgroundImage})`
    );

    if (currentCategory !== 'farmAnimals') {
      $("#animal-missing").css(
        "background-position",
        "25% 80%"
      );
    } else {
      $("#animal-missing").css(
        "background-position",
        "25% 95%"
      );
    }


    const currentQuestion = animalQuestions[currentIndex];
    const shuffledAnswers = shuffleArray(currentQuestion.answers.slice());

    $(".animal-missing-btn").each(function (index) {
      const animal = shuffledAnswers[index];
      $(this).text(animal);
      $(this)
        .prev("img")
        .attr("src", `./media/animal_missing/${animal}_animal_missing.png`);
      $(this).prev("img").attr("alt", animal);
    });

    enableButtons()
   
  }

  function resetButtonStyles() {
    $(".animal-missing-btn").removeClass(
      "correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX animate__slow"
    );
  }

  function showFeedback(element, isCorrect) {
    $(element).addClass(
      isCorrect
        ? "correct animate__animated animate__bounce animate__slow"
        : "incorrect animate__animated animate__shakeX animate__slow"
    );
    if (isCorrect) {
      stopCounter()
    }
    setTimeout(() => {
      $(element).removeClass(
        "correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX animate__slow"
      );
    }, 2000);
  }

  function showNext() {
    currentIndex++;
    if (currentIndex < animalQuestions.length) {
      tryCount = 0;
      loadAnimal();
    } else {
      stopCounter();
      endGameMessage();
    }
  }

  function shuffleArray(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function shuffleQuestions() {
     const farmQuestions = animalQuestions.filter(q => q.category === "farmAnimals");
    const wildQuestions = animalQuestions.filter(q => q.category === "wildAnimals");
    const petQuestions  = animalQuestions.filter(q => q.category === "pets");

    shuffleArray(farmQuestions);
    shuffleArray(wildQuestions);
    shuffleArray(petQuestions);

    animalQuestions = [...farmQuestions, ...wildQuestions, ...petQuestions];

    animalQuestions.forEach((question) => {
      question.answers = shuffleArray(question.answers.slice());
    });
  }

  $(".animal-missing-img").on("click" ,function(){
    console.log('asdas')
    $(this).next().click()
  })

  let buttons_disabled = false;
  
  function enableButtons() {  
    $(".animal-missing-btn").on("click", function () {
      if (buttons_disabled === true) {
        return
      }
      buttons_disabled = true;
      const selectedAnswer = $(this).text();
      if (selectedAnswer === animalQuestions[currentIndex].correct) {
        correctAnswersCount++;
        showFeedback(this, true);
        setTimeout(() => {
          showNext();
          buttons_disabled = false;
        }, 2000);
      } else {
        tryCount++;
        if (tryCount < 2) {
          showFeedback(this, false);
          $("#message-modal .modal-body").text("Please try again");
          $("#message-modal").modal("show");
          setTimeout(() => {
            $("#message-modal").modal("hide");
            buttons_disabled = false
          }, 2000);
        } else {
          $(this).addClass(
            "incorrect animate__animated animate__shakeX animate__slow"
          );
          $(`.animal-missing-btn`)
            .filter(function () {
              return $(this).text() === animalQuestions[currentIndex].correct;
            })
            .addClass("correct");
          setTimeout(() => {
            showNext();
            buttons_disabled = false
          }, 2000);
        }
      }
    });
  }


  function endGameMessage() {
    const countAllAnswers = animalQuestions.length;
    const percentageCorrect = Math.round(
      (correctAnswersCount / countAllAnswers) * 100
    );

    $("#message-modal .modal-body").css("text-align", "center");

    if (percentageCorrect >= 80) {
      $("#message-modal .modal-body").html(
        "<p>Nice job!</p><p>Play another game if you want &#128522;</p>"
      );
    } else {
      $("#message-modal .modal-body").html(
        "<p>We are sure you can do better. &#128577;</p><p>Please try again.</p>"
      );
    }

    $("#message-modal .modal-body").append(
      `<button id="restartButton" class="btn-blue btn fs-bold">Play again</button>`
    );

    $("#message-modal").modal("show");

    $("#restartButton")
      .off("click")
      .on("click", function () {
        location.reload();
        // $("#message-modal").modal("hide");
        // gameAlreadyPlayed = true;
        // currentIndex = 0;
        // correctAnswersCount = 0;
        // tryCount = 0;
        // currentCategory = 'farmAnimals';

        // if (gameAlreadyPlayed) {
        //   shuffleQuestions();
        // }
        // loadAnimal();
      });
      
    $("#message-modal").on("hidden.bs.modal", function () {
      window.location.href = "activities.html";
    });
  }

  let directionsSet = false;
  function showInstructions() {
    $("#animal-missing").css(
      "background-image",
      `url(./media/animal_missing/${currentCategory}.png)`
    );
    
    if (!directionsSet) {
      if (localStorage.getItem("ageGroup") == 2) {
        $('#instructionModal .instruction-en').prepend(`Which animal is missing ?<br>You have 15 seconds to make your choice from the 8 proposals.`);
        $('#instructionModal .instruction-fr').html(`Quel est l'animal manquant ?<br>Attention tu as 15 secondes pour faire ton choix parmi les 8 propositions.`)
      } else {
        $('#instructionModal .instruction-en').prepend(`Which animal is missing?<br>Make your choice from the 8 proposals.`)
        $('#instructionModal .instruction-fr').html(`Quel est l'animal manquant ?<br>Fais ton choix parmi les 8 propositions.`)
      }
      directionsSet = true;
    }

    $('main *').not('#instructionModal, #instructionModal *').hide();
    $('#instructionModal').modal('show');

    $('#instructionModal').on('hide.bs.modal', function (e) {
      if ($("audio").length !== 0) {
        $("audio")[0].pause();
      }
      $('main *').show();
      loadAnimal()
    });
  }

  showInstructions();

});
