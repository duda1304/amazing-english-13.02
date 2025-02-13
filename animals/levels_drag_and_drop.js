$(document).ready(function () {

  const levels = [
    { level: 1},
    { level: 2},
    { level: 3},
    { level: 4},
    { level: 5},
    { level: 6},
    { level: 7},
    { level: 8},
  ];

  const animalData = {
    farm: [
      { level: 1, name: "cow", color: "#9CA4CF" },
      { level: 2, name: "hen", color: "#ABCC96" },
      { level: 3, name: "pig", color: "#EFCB7B" },
      { level: 4, name: "duck", color: "#F3CA6F" },
      { level: 5, name: "sheep", color: "#97D2E2" },
      { level: 6, name: "horse", color: "#97D2E2" },
      { level: 7, name: "goose", color: "#F8AE9A" },
      { level: 8, name: "chicken", color: "#C7A4C4" },
    ],
    wild: [
      { level: 1, name: "tiger", color: "#ABCC96" },
      { level: 2, name: "lion", color: "#97D2E2" },
      { level: 3, name: "zebra", color: "#97D2E2" },
      { level: 4, name: "cheetah", color: "#C7A4C4" },
      { level: 5, name: "giraffe", color: "#EFCB7B" },
      { level: 6, name: "antelope", color: "#EFCB7B" },
      { level: 7, name: "elephant", color: "#F8AE9A" },
      { level: 8, name: "rhinoceros", color: "#9CA4CF" },
    ],
    pets: [
      { level: 1, name: "dog", color: "#F8AE9A" },
      { level: 2, name: "cat", color: "#97D2E2" },
      { level: 3, name: "turtle", color: "#C7A4C4" },
      { level: 4, name: "parrot", color: "#F3CA6F" },
      { level: 5, name: "canary", color: "#ABCC96" },
      { level: 6, name: "rabbit", color: "#97D2E2" },
      { level: 7, name: "hamster", color: "#EFCB7B" },
      { level: 8, name: "goldfish", color: "#9CA4CF" },
    ],
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function shuffleCategories() {
    for (let category in animalData) {
      let shuffledArr = shuffle([...animalData[category]]);
      shuffledArr.forEach((animal, index) => {
        animal.level = index + 1; 
      });
      animalData[category] = shuffledArr;
    }
  }

  shuffleCategories();

  let categories = ["farm", "wild", "pets"];
  let currentCategoryIndex = 0;
  let currentLevel = 1;
  const totalLevels = 8;
  // let attempts = 0;

  // render levels
  function renderLevels() {
    levels.forEach(element => {
        if (element.level < currentLevel) {
            $(`#${element.level}_inactive`).hide();
            $(`#${element.level}_active`).fadeIn(700);
            $(`#${element.level}_inactive`).parent().find('path').css('fill-opacity', '1');
        } else {
            $(`#${element.level}_active`).hide();
            $(`#${element.level}_inactive`).show();
            $(`#${element.level}_inactive`).parent().find('path').css('fill-opacity', '0.5');
        }
    })
  }

  renderLevels()

  function addCounter() {
    if (localStorage.getItem("ageGroup") == 3) {
      setCountdown()
    } else {
      $('#countdown').remove();
    }
  }

  let countdownInterval;

  function stopCounter() {
    clearInterval(countdownInterval);
  }

  function setCountdown() {
    stopCounter();
    startTimer()
  }

  function startTimer() {
    i = 1;
    countdownInterval = setInterval(function() {
      const countdownFinalValue = 20;
      const timeRemaining = countdownFinalValue - i;
      if (timeRemaining < 0) {
        clearInterval(countdownInterval);
        failedGameMessage();
      } else {
        $('#countdown button').text(timeRemaining);
        i += 1;
      }
    }, 1000); 
  }

  function loadLevel(level) {
    if (level < 1 || level > totalLevels) {
      console.warn("Invalid level selected");
      return;
    }

    stopCounter()

    currentLevel = level;
    // attempts = 0; 

    const currentCategory = categories[currentCategoryIndex];
    const animal = animalData[currentCategory].find((a) => a.level === level);
  
    $("#current-level").text(`Level ${level}`);

    $("#animal-image")
      .attr("src", `./media/animals_levels_drag_drop/${animal.name}.png`)
      .attr("alt", animal.name);

    renderLevels()

    const dragLetters = generateDragLetters(animal.name.toUpperCase());

    // draggable circles
    $("#drag-letters").empty();
    dragLetters.forEach((letter, index) => {
      const dragId = `drag-${Date.now()}-${index}-${Math.floor(Math.random() * 1000)}`;
      const letterDiv = $("<div></div>")
        .addClass(
          "circle circle-drag rounded-circle shadow d-flex align-items-center justify-content-center text-dark me-2 mb-2"
        )
        .text(letter)
        .attr("data-letter", letter)
        // .attr("draggable", "true")
        .attr("id", dragId) 
        .data("dropped", false);
        
      $("#drag-letters").append(letterDiv);
    });

    // droppable circles
    const dropCount = animal.name.length;
    $("#drop-circles").empty();
    for (let i = 0; i < dropCount; i++) {
      const dropDiv = $("<div></div>")
        .addClass(
          "circle circle-drop rounded-circle shadow d-flex align-items-center justify-content-center text-white me-2 mb-2"
        )
        .attr("data-position", i)
        .data("filled", false)
        .data("correct-letter", animal.name[i].toUpperCase())
        .css("background-color", animal.color)
        .html("&nbsp;");
      $("#drop-circles").append(dropDiv);
    }

    resetDragAndDrop();
    enableDragDrop();

    if (currentCategory === 'wild' || currentCategory === 'pets') {
      if (level === 1) {
        scrollToBottom();
      } else if (level === 5) {
        scrollUp();
      }
    }
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  function generateDragLetters(name) {
    const original = name.split("");
    let shuffled = shuffle([...original]); 

    while (shuffled.join("") === original.join("")) {
      shuffled = shuffle([...original]);
    }

    return shuffled;
  }

  function resetDragAndDrop() {
    $(".circle-drop")
      .removeClass("filled incorrect bg-success bg-danger")
      .css("background-color", function () {
        const level = currentLevel;
        const currentCategory = categories[currentCategoryIndex];
        const animal = animalData[currentCategory].find((a) => a.level === level);
        return animal.color;
      })
      .html("&nbsp;")
      .data("filled", false)
      .removeData("placedLetterId");
      
    // $(".circle-drag").css("opacity", "1").data("dropped", false).attr('draggable', true);
    $(".circle-drag").css("opacity", "1").data("dropped", false);
  }

  function checkCompletion() {
    let allFilled = true;
    $(".circle-drop").each(function () {
      if (!$(this).data("filled")) {
        allFilled = false;
        return false;
      }
    });
    return allFilled;
  }

  let overallCorrectAnswers = 0;
  function validateAnswer() {    
    let correct = true;
    let userAnswer = "";
    let correctAnswer = "";

    $(".circle-drop").each(function () {
      const letter = $(this).text().trim().toUpperCase();
      userAnswer += letter;
      correctAnswer += $(this).data("correct-letter") || "";
    });

    const currentCategory = categories[currentCategoryIndex];
    const animal = animalData[currentCategory].find((a) => a.level === currentLevel);
    correctAnswer = animal.name.toUpperCase();

    if (userAnswer === correctAnswer) {
      correct = true;
    } else {
      correct = false;
    }

    if (correct) {
      overallCorrectAnswers++
    }
    return correct;
  }

  function resetGame() {
    currentLevel = 1;
    loadLevel(currentLevel);
    scrollToBottom();
    $('#countdown button').text('20');
    $("#center-content-wrapper, #countdown")
    .css("opacity", 1)
    .fadeIn(1000, function() {
      addCounter()
    });
  }

  function startGame() {
    loadLevel(currentLevel);
    scrollToBottom();
    $('#countdown button').text('20');
    $("#center-content-wrapper, #countdown")
    .css("opacity", 1)
    .fadeIn(1000, function() {
      addCounter()
    });
  }

  if (localStorage.getItem("ageGroup") == 3) {
    $("#instruction-container .instruction-en").remove();
    $("#instruction-container .instruction-fr").remove();
    $("#instruction-container .modal-body").prepend(`
      <p class="instruction-en mb-3">Spell the animal names correctly using the letters given. Each
              time you make a mistake, you will have to start all over again. Attention, you have 20 seconds per level to find the right answer.<br>
              It is your turn!</p>
            <p class="instruction-fr">Orthographie correctement les noms des animaux avec les lettres données. À chaque erreur tu devras recommencer à zéro. Attention ! Tu as 20 secondes par niveau pour trouver la bonne réponse.
              À toi de jouer !</p>
      `)
    $("#instruction-container .instruction-en").append(` <i class="fas fa-volume-up"></i>`);
  }

  function showInstructions() {
    if ($('#countdown').length !== 0) {
      stopCounter();
    }

    $("#instruction-container").modal('show');
    $("#levels-container").hide();
    $(".card-levels").hide();
    $(".levels-drag-drop-navigation").removeClass("d-flex").hide();
    $(".instruction-en").on("click", function () {
      if (localStorage.getItem("ageGroup") == 3) {
        playSound(`./audio/drag_and_drop_levels/instruction_with_timer.mp3`);
      } else {
        playSound(`./audio/drag_and_drop_levels/instruction.mp3`);
      }
    });
    $("#instruction-container").on("hidden.bs.modal", function () {
      if ($("audio").length !== 0) {
        $("audio")[0].pause();
      }
    });
  }

  function showCategoryInstruction(category, callback) {
    if (category === 'farm') {
        instructionId = '#farm-instruction';
    } else if (category === 'wild') {
        instructionId = '#wild-instruction';
    } else if (category === 'pets') {
        instructionId = '#pets-instruction';
    }

    $(`${instructionId} .instruction-en`).on("click", function () {
      playSound(`./audio/drag_and_drop_levels/${category}.mp3`);
    });

    if (instructionId !== '') {
      $("#levels-container").hide();
      $(".card-levels").hide();
      $(".levels-drag-drop-navigation").removeClass("d-flex").hide();


      // $(instructionId).fadeIn(500);
      $(instructionId).modal('show');
      $(`${instructionId}`).on("hidden.bs.modal", function () {
        $("#levels-container").show();
        $(".card-levels").show();
        $(".levels-drag-drop-navigation").addClass("d-flex").show();
        if (callback) callback();
        if ($("audio").length !== 0) {
          $("audio")[0].pause();
        }
      });

      // $(document).on('click' ,function(event) {
      //       event.preventDefault();
      //       $(instructionId).hide();
      //       $("#levels-container").show();
      //       $(".card-levels").show();
      //       $(".levels-drag-drop-navigation").addClass("d-flex").show();
      //       if (callback) callback();
      //       if ($("audio").length !== 0) {
      //           $("audio")[0].pause();
      //       }
      //   $(document).off('click')
      // })
    } else {
        if (callback) callback();
    }
}
  
  // start button
  $("#start-button").on("click", function () {
    $("#instruction-container").modal('hide');

    showCategoryInstruction('farm', function() {
      startGame();
    });
  });

  showInstructions();

  function correctAnswer() {
    $(".circle-drop")
      .addClass("bg-success animate__animated animate__slow animate__bounce");
    stopCounter();
    setTimeout(() => {
      $("#center-content-wrapper, #countdown").fadeOut(1000).promise().done(function () {
        $(this).css('opacity', 0);
        $('#countdown button').text('20');

        if (currentLevel === totalLevels) {
          currentLevel = totalLevels + 1;
          renderLevels();

          setTimeout(() => {
            if (currentCategoryIndex < categories.length - 1) {
              currentCategoryIndex++;
              currentLevel = 1;
              const nextCategory = categories[currentCategoryIndex];
              showCategoryInstruction(nextCategory, function () {
                loadLevel(currentLevel);
                $("#center-content-wrapper, #countdown")
                .css("opacity", 1)
                .fadeIn(1000, function() {
                  addCounter()
                });
              });
            } else {
              endGameMessage()
            }
          }, 2000);
        } else {
          currentLevel++;
          const currentCategory = categories[currentCategoryIndex];
          if ((currentCategory === 'farm' || currentCategory === 'wild' || currentCategory === 'pets') && currentLevel === 6) {
            scrollUp();
          }
          $('#countdown button').text('20');
          renderLevels();
          loadLevel(currentLevel);
          setTimeout(() => {
            $("#center-content-wrapper, #countdown")
            .css("opacity", 1)
            .fadeIn(1000, function() {
              addCounter()
            });
          }, 2000);
        }
      });
    }, 2000); 
  }

  function incorrectAnswer() {
    // attempts++;
    // if (attempts < 2) {
    //   $(".circle-drop")
    //     .addClass("bg-danger animate__animated animate__slow animate__shakeX");
    //   setTimeout(() => {
    //     $(".circle-drop")
    //       .removeClass("bg-danger animate__animated animate__slow animate__shakeX");
    //     resetDragAndDrop();
    //     // enableDragDrop();
    //   }, 2000); 
    // } else {
      $(".circle-drop")
        .addClass("bg-danger animate__animated animate__slow animate__shakeX");
        stopCounter();
        setTimeout(() => {
          console.log("reset to level 1");
          failedGameMessage();
        }, 2000);
    // }
  }

  function endGameMessage() {
    if (overallCorrectAnswers > 19) {
      $("#message-modal .modal-body").html(
        "<p>Nice job!</p><p>Play another game if you want &#128522;</p>" 
      );
      $("#message-modal .modal-body").append(
        `<button id="restartButton" class="btn-blue btn">Play again</button>`
      );
    } else {
      $("#message-modal .modal-body").html(
        "<p>We are sure you can do better. &#128577;</p><p>Please try again.</p>"
      );
      $("#message-modal .modal-body").append(
        `<button id="restartButton" class="btn-blue btn">Play again</button>`
      );
    }
    $("#message-modal .modal-body").css("text-align", "center");
    $("#restartButton").on("click", function () {
      location.reload();
    });
    $("#message-modal").modal("show");
    $("#message-modal").on("hidden.bs.modal", function () {
      window.location.href = "activities.html";
    });
  }

  function failedGameMessage() {
    console.log("reset to level 1");
    $("#message-modal .modal-body").html(
      `<p class="text-center"> Oh no &#128532;</p>
      <p class="text-center">Please try again!</p>`
    );
    $("#message-modal").modal("show");
    $(document).on('click', function(event) {
      event.preventDefault();
      $("#message-modal").modal("hide");
      resetGame();
      $(document).off('click');
    })
  }

  // function enableDragDrop() {
  //   $(".circle-drag").attr('draggable', 'true');

  //   // drag and drop
  //   $(".circle-drag").on("dragstart", function (e) {
  //     e.stopPropagation();
  //     const draggedId = $(this).attr("id");
  //     const letter = $(this).data("letter");
  //     const dragData = JSON.stringify({ draggedId, letter });
  //     e.originalEvent.dataTransfer.setData("text", dragData);

  //     // one step that maybe can help for old safari
  //     // const img = new Image(); // Transparent image
  //     // img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEklEQVR42mP8/5+hHgAHggJ/Py8akAAAAABJRU5ErkJggg==';
  //     // e.dataTransfer.setDragImage(img, 0, 0);
  //   });

  //   $(".circle-drop").on("dragover", function (e) {
  //     e.preventDefault();
  //   });

  //   $(".circle-drop").on("drop", function (e) {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     const $thisDrop = $(this);
  //     const oldLetterId = $thisDrop.data("placedLetterId");
  //     if (oldLetterId) {
  //       const $oldDraggable = $(`#${oldLetterId}`);
  //       $oldDraggable
  //         .css("opacity", "1")
  //         .attr("draggable", true)
  //         .data("dropped", false);
    
  //       // $("#drag-letters").append($oldDraggable);
    
  //       $thisDrop.text("");
  //       $thisDrop.data("filled", false);
  //       $thisDrop.removeData("placedLetterId");
  //     }
    
  //     const dropData = JSON.parse(e.originalEvent.dataTransfer.getData("text"));
  //     const newLetterId = dropData.draggedId;
  //     const newLetter = dropData.letter;
    
  //     $thisDrop.text(newLetter);
  //     $thisDrop.data("placedLetterId", newLetterId);
    
  //     const wasFilled = $thisDrop.data("filled") === true;
  //     if (!wasFilled) {
  //       $thisDrop.data("filled", true);
  //     }
    
  //     $(`#${newLetterId}`)
  //       .css("opacity", "0")
  //       .attr("draggable", false)
  //       .data("dropped", true);
    
  //     if (checkCompletion()) {
  //       const isCorrect = validateAnswer();
  //       isCorrect ? correctAnswer() : incorrectAnswer();
  //     }
  //   });
  // }

  function enableDragDrop() {
    // drag
    $(".circle-drag").off("click").on("click", function () {
      if ($('.selected').not(`#${$(this).attr('id')}`).lenght !== 0) {
        $('.selected').not(`#${$(this).attr('id')}`).removeClass('selected')
      }
      $(this).toggleClass('selected')
    });

    $(".circle-drop").on("click", function () {
      if ($('.selected').length === 0) {
        return
      }

      const letter = $('.selected').data("letter");
      const id = $('.selected').attr("id");

      if ($(this).text().trim() !== '') {
        $(`#${$(this).data("placedLetterId")}`)
        .css("opacity", "1")
        .data("dropped", false)
        .on("click", function () {
          if ($('.selected').not(`#${$(this).attr('id')}`).length !== 0) {
            $('.selected').not(`#${$(this).attr('id')}`).removeClass('selected')
          }
          $(this).toggleClass('selected')
        })
        .css("cursor", "pointer"); 
      } 

      $(this).text(letter);
      $(this).data("placedLetterId", id);

      $(`#${id}`).off("click");

      $(`#${id}`)
      .css("opacity", "0")
      .data("dropped", true)
      .removeClass("selected")
      .css("cursor", "default");

      $(this).data("filled", true);
      $(this).css("cursor", "default"); 
    
      if (checkCompletion()) {
        const isCorrect = validateAnswer();
        isCorrect ? correctAnswer() : incorrectAnswer();
      }
    });

    $(".circle-drag").css("cursor", function() {
      return $(this).data("dropped") ? "default" : "pointer";
    });
  }


  function scrollToBottom() {
    let scrollableDiv = document.getElementById("svg-background");
    if (scrollableDiv.clientHeight/scrollableDiv.scrollHeight > 0.7) {
      $("#svg-background").animate({ scrollTop: (scrollableDiv.scrollHeight - scrollableDiv.clientHeight) / 2 }, 0);
    } else {
      $("#svg-background").animate({ scrollTop: scrollableDiv.scrollHeight }, 2000);
    }
  }

  scrollToBottom();
 
  function scrollUp() {
    let scrollableDiv = document.getElementById("svg-background");
    if (scrollableDiv.clientHeight/scrollableDiv.scrollHeight > 0.7) {
      return
    } 
    $("#svg-background").animate({ scrollTop: 10 }, 2000);
  }

});
