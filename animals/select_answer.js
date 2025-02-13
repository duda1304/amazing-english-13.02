$(document).ready(function () {
  const animals = [
    {
      image: "./media/animal_cards/cow.png",
      correct: "cow",
      answers: ["cow", "sheep", "horse"],
    },
    {
      image: "./media/animal_cards/sheep.png",
      correct: "sheep",
      answers: ["sheep", "goose", "duck"],
    },
    {
      image: "./media/animal_cards/pig.png",
      correct: "pig",
      answers: ["pig", "horse", "goose"],
    },
    {
      image: "./media/animal_cards/horse.png",
      correct: "horse",
      answers: ["cow", "horse", "hen"],
    },
    {
      image: "./media/animal_cards/goose.png",
      correct: "goose",
      answers: ["goose", "hen", "chicken"],
    },
    {
      image: "./media/animal_cards/hen.png",
      correct: "hen",
      answers: ["hen", "cow", "duck"],
    },
    {
      image: "./media/animal_cards/chicken.png",
      correct: "chicken",
      answers: ["horse", "cow", "chicken"],
    },
    {
      image: "./media/animal_cards/duck.png",
      correct: "duck",
      answers: ["pig", "sheep", "duck"],
    },
    {
      image: "./media/animal_cards/rhinoceros.png",
      correct: "rhinoceros",
      answers: ["giraffe", "rhinoceros", "antelope"],
    },
    {
      image: "./media/animal_cards/tiger.png",
      correct: "tiger",
      answers: ["tiger", "cheetah", "zebra"],
    },
    {
      image: "./media/animal_cards/lion.png",
      correct: "lion",
      answers: ["rhinoceros", "lion", "tiger"],
    },
    {
      image: "./media/animal_cards/giraffe.png",
      correct: "giraffe",
      answers: ["cheetah", "giraffe", "elephant"],
    },
    {
      image: "./media/animal_cards/antelope.png",
      correct: "antelope",
      answers: ["lion", "antelope", "zebra"],
    },
    {
      image: "./media/animal_cards/cheetah.png",
      correct: "cheetah",
      answers: ["cheetah", "tiger", "rhinoceros"],
    },
    {
      image: "./media/animal_cards/zebra.png",
      correct: "zebra",
      answers: ["giraffe", "zebra", "tiger"],
    },
    {
      image: "./media/animal_cards/dog.png",
      correct: "dog",
      answers: ["goldfish", "dog", "cat"],
    },
    {
      image: "./media/animal_cards/cat.png",
      correct: "cat",
      answers: ["cat", "hamster", "parrot"],
    },
    {
      image: "./media/animal_cards/turtle.png",
      correct: "turtle",
      answers: ["turtle", "rabbit", "hamster"],
    },
    {
      image: "./media/animal_cards/parrot.png",
      correct: "parrot",
      answers: ["canary", "cat", "parrot"],
    },
    {
      image: "./media/animal_cards/hamster.png",
      correct: "hamster",
      answers: ["rabbit", "hamster", "canary"],
    },
    {
      image: "./media/animal_cards/goldfish.png",
      correct: "goldfish",
      answers: ["dog", "goldfish", "turtle"],
    },
    {
      image: "./media/animal_cards/rabbit.png",
      correct: "rabbit",
      answers: ["turtle", "cat", "rabbit"],
    },
    {
      image: "./media/animal_cards/canary.png",
      correct: "canary",
      answers: ["canary", "turtle", "goldfish"],
    },
  ];

  let currentIndex = 0;
  let tryCount = 0;
  let correctAnswersCount = 0;
  let gameAlreadyPlayed = false;

  function loadAnimal() {
    resetButtonStyles();
    $("#animal-image").attr("src", animals[currentIndex].image);
    $("#answer1").text(animals[currentIndex].answers[0]);
    $("#answer2").text(animals[currentIndex].answers[1]);
    $("#answer3").text(animals[currentIndex].answers[2]);
  }

  function resetButtonStyles() {
    $(".answer-btn").removeClass(
      "correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX animate__slow"
    );
  }

  function showFeedback(element, isCorrect) {
    $(element).addClass(
      isCorrect
        ? "correct animate__animated animate__bounce animate__slow"
        : "incorrect animate__animated animate__shakeX animate__slow"
    );
    setTimeout(() => {
      $(element).removeClass(
        "correct animate__animated animate__bounce animate__slow incorrect animate__animated animate__shakeX animate__slow"
      );
    }, 2000);
  }

  function showNext() {
    currentIndex++;
    if (currentIndex < animals.length) {
      tryCount = 0;
      loadAnimal();
    } else {
      endGameMessage();
    }
  }

  function endGameMessage() {
    const countAllAnswers = animals.length;
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
      });
    
    $("#message-modal").on("hidden.bs.modal", function () {
      window.location.href = "activities.html";
    });
  }

  function shuffle(array) {
    let currentIndex = array.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  function shuffleAnswers() {
    for (let i = 0; i < animals.length; i++) {
      shuffle(animals[i].answers);
    }
  }

  $(".answer-btn").on("click", function () {
    const selectedAnswer = $(this).text();
    if (selectedAnswer === animals[currentIndex].correct) {
      correctAnswersCount++;
      showFeedback(this, true);
      setTimeout(() => {
        showNext();
      }, 2000);
    } else {
      tryCount++;
      if (tryCount < 2) {
        showFeedback(this, false);
        $("#message-modal .modal-body").text("Please try again");
        $("#message-modal").modal("show");
        setTimeout(() => {
          $("#message-modal").modal("hide");
        }, 2000);
      } else {
        $(this).addClass(
          "incorrect animate__animated animate__shakeX animate__slow"
        );
        $(`.answer-btn`)
          .filter(function () {
            return $(this).text() === animals[currentIndex].correct;
          })
          .addClass("correct");
        setTimeout(() => {
          showNext();
        }, 2000);
      }
    }
  });

  shuffle(animals);

  let  directionsSet = false;
  function showInstructions() {
    if (!directionsSet) {
      $('#instructionModal .instruction-en').prepend(`Find the name for the following animals.`);
      $('#instructionModal .instruction-fr').html(`Trouve le nom pour désigner les animaux suivants.`)
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

  showInstructions() 
  // loadAnimal();
});
