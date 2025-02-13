$(document).ready(function () {
  const data = {
    1: [
      {
        animal: "cow",
        positions: [
          { top: "10%", left: "70%" },
          { top: "45%", left: "80%" },
          { top: "55%", left: "15%" },
        ],
        css: { "background-color": "#9CA4CF", color: "#5F2664" },
      },
      {
        animal: "sheep",
        positions: [
          { top: "12%", left: "15%" },
          { top: "17%", left: "50%" },
          { top: "10%", left: "80%" },
          { top: "60%", left: "15%" },
          { top: "60%", left: "80%" },
        ],
        css: { "background-color": "#EBA8AE", color: "#C97278" },
      },
      {
        animal: "pig",
        positions: [
          { top: "10%", left: "60%" },
          { top: "35%", left: "85%" },
          { top: "45%", left: "5%" },
        ],
        css: { "background-color": "#EFCB7B", color: "#DA9C31" },
      },
      {
        animal: "horse",
        positions: [
          { top: "19%", left: "45%" },
          { top: "45%", left: "85%" },
          { top: "11%", left: "15%" },
          { top: "25%", left: "70%" },
          { top: "50%", left: "12%" },
        ],
        css: { "background-color": "#97D2E2", color: "#3E85D6" },
      },
    ],
    2: [
      {
        animal: "goose",
        positions: [
          { top: "10%", left: "20%" },
          { top: "25%", left: "80%" },
          { top: "20%", left: "58%" },
          { top: "35%", left: "10%" },
          { top: "40%", left: "84%" },
        ],
        css: { "background-color": "#F8AE9A", color: "#BE735F" },
      },
      {
        animal: "hen",
        positions: [
          { top: "10%", left: "45%" },
          { top: "45%", left: "85%" },
          { top: "35%", left: "10%" },
        ],
        css: { "background-color": "#ABCC96", color: "#6F8D5C" },
      },
      {
        animal: "chicken",
        positions: [
          { top: "15%", left: "15%" },
          { top: "20%", left: "45%" },
          { top: "35%", left: "85%" },
          { top: "50%", left: "80%" },
          { top: "50%", left: "12%" },
          { top: "10%", left: "70%" },
        ],
        css: { "background-color": "#C7A4C4", color: "#91548C" },
      },
      {
        animal: "duck",
        positions: [
          { top: "10%", left: "45%" },
          { top: "45%", left: "85%" },
          { top: "35%", left: "10%" },
          { top: "25%", left: "60%" },
        ],
        css: { "background-color": "#F3CA6F", color: "#BE9333" },
      },
    ],
    3: [
      {
        animal: "elephant",
        positions: [
          { top: "10%", left: "45%" },
          { top: "12%", left: "22%" },
          { top: "45%", left: "85%" },
          { top: "35%", left: "10%" },
          { top: "20%", left: "72%" },
          { top: "10%", left: "85%" },
          { top: "65%", left: "15%" },
        ],
        css: { "background-color": "#F8AE9A", color: "#BB7663" },
      },
      {
        animal: "rhinoceros",
        positions: [
          { top: "10%", left: "45%" },
          { top: "45%", left: "81%" },
          { top: "35%", left: "7%" },
          { top: "12%", left: "60%" },
          { top: "10%", left: "85%" },
          { top: "65%", left: "15%" },
          { top: "10%", left: "20%" },
          { top: "31%", left: "83%" },
          { top: "68%", left: "85%" },
        ],
        css: { "background-color": "#9CA4CF", color: "#5E6696" },
      },
      {
        animal: "tiger",
        positions: [
          { top: "35%", left: "10%" },
          { top: "10%", left: "85%" },
          { top: "35%", left: "80%" },
          { top: "52%", left: "85%" },
          { top: "10%", left: "15%" },
        ],
        css: { "background-color": "#ABCC96", color: "#66A141" },
      },
      {
        animal: "lion",
        positions: [
          { top: "12%", left: "51%" },
          { top: "31%", left: "85%" },
          { top: "53%", left: "8%" },
          { top: "60%", left: "75%" },
        ],
        css: { "background-color": "#97D1E0", color: "#3E85D6" },
      },
    ],
    4: [
      {
        animal: "giraffe",
        positions: [
          { top: "10%", left: "45%" },
          { top: "45%", left: "85%" },
          { top: "35%", left: "10%" },
          { top: "12%", left: "15%" },
          { top: "10%", left: "85%" },
          { top: "56%", left: "65%" },
        ],
        css: { "background-color": "#EFCB7B", color: "#C38C13" },
      },
      {
        animal: "antelope",
        positions: [
          { top: "10%", left: "45%" },
          { top: "47%", left: "11%" },
          { top: "40%", left: "83%" },
          { top: "22%", left: "13%" },
          { top: "20%", left: "73%" },
          { top: "8%", left: "81%" },
          { top: "8%", left: "21%" },
        ],
        css: { "background-color": "#ABCC96", color: "#449510" },
      },
      {
        animal: "cheetah",
        positions: [
          { top: "17%", left: "45%" },
          { top: "52%", left: "81%" },
          { top: "2%", left: "75%" },
          { top: "25%", left: "85%" },
          { top: "35%", left: "10%" },
          { top: "9%", left: "15%" },
        ],
        css: { "background-color": "#C7A4C4", color: "#B56CAF" },
      },
      {
        animal: "zebra",
        positions: [
          { top: "10%", left: "45%" },
          { top: "53%", left: "15%" },
          { top: "33%", left: "10%" },
          { top: "17%", left: "70%" },
          { top: "12%", left: "85%" },
        ],
        css: { "background-color": "#97D2E2", color: "#3E85D6" },
      },
    ],
    5: [
      {
        animal: "dog",
        positions: [
          { top: "10%", left: "70%" },
          { top: "45%", left: "80%" },
          { top: "55%", left: "15%" },
        ],
        css: { "background-color": "#F8AE9A", color: "#D7836C" },
      },
      {
        animal: "cat",
        positions: [
          { top: "10%", left: "45%" },
          { top: "45%", left: "85%" },
          { top: "35%", left: "10%" },
        ],
        css: { "background-color": "#97D2E2", color: "#48A3BC" },
      },
      {
        animal: "turtle",
        positions: [
          { top: "17%", left: "45%" },
          { top: "59%", left: "81%" },
          { top: "5%", left: "62%" },
          { top: "25%", left: "85%" },
          { top: "45%", left: "10%" },
        ],
        css: { "background-color": "#C7A4C4", color: "#AB5BA4" },
      },
      {
        animal: "parrot",
        positions: [
          { top: "10%", left: "55%" },
          { top: "20%", left: "81%" },
          { top: "32%", left: "11%" },
          { top: "45%", left: "76%" },
          { top: "55%", left: "21%" },
        ],
        css: { "background-color": "#F3CA6F", color: "#C5952B" },
      },
    ],
    6: [
      {
        animal: "hamster",
        positions: [
          { top: "10%", left: "45%" },
          { top: "47%", left: "11%" },
          { top: "40%", left: "83%" },
          { top: "22%", left: "13%" },
          { top: "20%", left: "73%" },
          { top: "8%", left: "81%" },
        ],
        css: { "background-color": "#EFCB7B", color: "#DBA93A" },
      },
      {
        animal: "goldfish",
        positions: [
          { top: "10%", left: "45%" },
          { top: "47%", left: "11%" },
          { top: "40%", left: "83%" },
          { top: "22%", left: "13%" },
          { top: "20%", left: "73%" },
          { top: "8%", left: "81%" },
          { top: "58%", left: "79%" },
        ],
        css: { "background-color": "#9CA4CF", color: "#C97278" },
      },
      {
        animal: "rabbit",
        positions: [
          { top: "10%", left: "25%" },
          { top: "52%", left: "17%" },
          { top: "33%", left: "10%" },
          { top: "13%", left: "73%" },
          { top: "42%", left: "85%" },
        ],
        css: { "background-color": "#97D2E2", color: "#3E85D6" },
      },
      {
        animal: "canary",
        positions: [
          { top: "10%", left: "45%" },
          { top: "53%", left: "15%" },
          { top: "19%", left: "10%" },
          { top: "17%", left: "70%" },
          { top: "66%", left: "85%" },
        ],
        css: { "background-color": "#ABCC96", color: "#609E39" },
      },
    ],
  };

  const instructions = [
    {"en" : "Reconstitute the names of the following <span>farm animals</span> from the letters given and find the odd one out. ", 
     "fr" : "Reconstitue les noms des animaux de la ferme suivants à partir des lettres données et trouve l’intruse.",
     "audio" : "drag_and_drop/farm_instructions.mp3"
    }, 
    {"en" : "Reconstitute the names of the following <span>wild animals</span> from the letters given and find the odd one out. ", 
     "fr" : "Reconstitue les noms des animaux sauvages suivants à partir des lettres données et trouve l’intruse.",
     "audio" : "drag_and_drop/wild_instructions.mp3"
    }, 
    {"en" : "Reconstitute the names of the following <span>pets</span> from the letters given and find the odd one out. ", 
     "fr" : "Reconstitue les noms des animaux domestiques suivants à partir des lettres données et trouve l’intruse.",
      "audio" : "drag_and_drop/pets_instructions.mp3"
    }
  ]

  function showInstructions(instructionIndex) {
    const instr = instructions[instructionIndex];
    $("#instructionModal .instruction-en").html(instr.en);
    $("#instructionModal .instruction-fr").html(instr.fr);
    $('#instructionModal .instruction-en').append('<i class="fas fa-volume-up"></i>');
    $(".instruction-en").off('click');
    $(".instruction-en").on("click", function () {
      playSound(`./audio/${instr.audio}`);
    });
    $(".drag-drop-container, .drag-drop-navigation").hide();
    $("#instructionModal").modal("show");

    $("#instructionModal").on("hidden.bs.modal", function () {
      $(".drag-drop-container, .drag-drop-navigation").show();
      if ($("audio").length !== 0) {
        $("audio")[0].pause();
      }
      renderPage(currentAnimalIndex);
    });
  }

  showInstructions(0);

  const dataArray = [];
  for (let key in data) {
    data[key].forEach((animalObj) => {
      dataArray.push(animalObj);
    });
  }

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

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

  let overallCorrect = 0;
  let totalWords = dataArray.length; 

  let currentAnimalIndex = 0; 
  let totalDroppablesPage = 0;
  let filledDroppablesPage = 0;
  let attemptCountPage = 1;
  let revealedIndexes = {};
  let wordStatus = {};

  function renderPage(animalIndex) {
    totalDroppablesPage = 0;
    filledDroppablesPage = 0;
    revealedIndexes = {};
    wordStatus = {};
    attemptCountPage = 1;

    const $animalContainer = $("#animalContainer");
    $animalContainer.find(".d-flex").empty();
    $animalContainer.css({});

    // reset droppables
    $animalContainer
      .find(".droppable")
      .removeClass(
        "bg-success bg-warning bg-danger text-white animate__animated animate__bounce animate__shakeY animate__slow animate__shakeX"
      )
      .addClass("bg-white")
      .text("")
      .data("filled", false);

    const values = dataArray[animalIndex];
    const index = animalIndex;
    $animalContainer.css({
      "background-color": values.css["background-color"],
      color: values.css["color"],
    });

    // animal image
    const $img = $animalContainer.find("img");
    $img.attr("src", `./media/animals_drag_drop/${values.animal}.svg`);

    // special sizes
    const smallImages = ["goose", "chicken", "parrot", "rabbit"];
    const bigImages = ["horse", "lion"];
    const midImages = [
      "giraffe",
      "dog",
      "cat",
      "goldfish",
      "canary",
      "antelope",
      "zebra",
      "tiger",
      "elephant",
      "hamster",
    ];

    if (smallImages.includes(values.animal)) {
      $img.css({ width: "35%", height: "auto" });
    } else if (bigImages.includes(values.animal)) {
      $img.css({ width: "70%", height: "auto" });
    } else if (midImages.includes(values.animal)) {
      $img.css({ width: "50%", height: "auto" });
    } else {
      $img.css({ width: "60%", height: "auto" });
    }

    const $innerDiv = $animalContainer.find("> div");
    $innerDiv.empty();

    const word_length = values.animal.length;
    let revealedLettersNumber = word_length < 6 ? 1 : 2;
    let indexes = Array.from({ length: word_length }, (_, index) => index);
    indexes = shuffle(indexes);

    let revealedIndexesTemp = indexes.slice(0, revealedLettersNumber);
    let unrevealedIndexes = indexes.slice(revealedLettersNumber);

    revealedIndexes[index] = revealedIndexesTemp.slice();

    wordStatus[index] = "unchecked";

    // solution circles droppables
    for (let i = 0; i < word_length; i++) {
      const isRevealed = revealedIndexesTemp.includes(i);
    
      let cellClass = isRevealed
        ? "circle-letter rounded-circle bg-white shadow mb-2 revealed-letter text-center"
        : "col circle-letter rounded-circle bg-white shadow mb-2 droppable text-center";
    
      let letterContent = isRevealed ? values.animal[i].toLowerCase() : "";
    
      $innerDiv.append(`
        <div class="${cellClass}"
            data-index="${i}"
            data-correct-letter="${values.animal[i].toLowerCase()}"
            data-animal-index="${index}"
            data-page="${animalIndex}"
            data-is-revealed="${isRevealed}"
            data-filled="${isRevealed}"  
            style="cursor: ${isRevealed ? 'default' : 'pointer'};"
        >
          ${letterContent}
        </div>
      `);
    
      if (!isRevealed) {
        totalDroppablesPage++;
      }
    }

    // letter circles draggables
    let lettersNeeded = unrevealedIndexes.map((i) => values.animal[i]);

    let numberOfPositions = values.positions.length;
    let numRandomLetters = numberOfPositions - lettersNeeded.length;

    let wordLetters = values.animal.toLowerCase().split("");
    let lettersNotInWord = alphabet
      .split("")
      .filter((letter) => !wordLetters.includes(letter));
    lettersNotInWord = shuffle(lettersNotInWord);
    let randomLetters = lettersNotInWord.slice(0, numRandomLetters);

    let allLetters = lettersNeeded.concat(randomLetters);
    allLetters = shuffle(allLetters);

    // add draggable letters to page
    values.positions.forEach((element, positionIndex) => {
      let letter = allLetters[positionIndex];
      let draggableId = `draggable-${index}-${positionIndex}`;

      // $innerDiv.append(
      //   `<div id="${draggableId}" class="circle-letter rounded-circle bg-white shadow mb-2 draggable" 
      //         draggable  draggable="true" style="position: absolute; top: ${
      //           element.top
      //         }; left: ${element.left};" 
      //         data-letter="${letter.toLowerCase()}">
      //         ${letter.toLowerCase()}
      //       </div>`
      // );
      // $(`#${draggableId}`).attr('draggable', 'true');

      $innerDiv.append(
        `<div id="${draggableId}" class="circle-letter rounded-circle bg-white shadow mb-2 draggable" 
              draggable style="position: absolute; top: ${
                element.top
              }; left: ${element.left};" 
              data-letter="${letter.toLowerCase()}">
              ${letter.toLowerCase()}
            </div>`
      );
    });

    // total droppables for each animal
    $animalContainer.data(
      "totalDroppables",
      word_length - revealedLettersNumber
    );

    // activate drag and drop
    enableDragDrop();
  }

  renderPage(currentAnimalIndex);

  // function enableDragDrop() {
  //   $(".draggable").attr('draggable', 'true');
    
  //   // drag
  //   $(".draggable").on("dragstart", function (event) {
  //     event.stopPropagation();
  //     const letter = $(this).data("letter");
  //     const id = $(this).attr("id");
  //     const dragData = JSON.stringify({ letter, id });
  //     event.originalEvent.dataTransfer.setData("text", dragData);
  //   });

  //   $('.droppable').on('dragover', function(event) {
  //     event.preventDefault();
  //   });

  //   // drop
  //   $('.droppable').on("drop", function (event) {
  //     event.preventDefault();
    
  //     const $thisDrop = $(this);
  //     const $animalContainer = $thisDrop.closest("#animalContainer");
  //     const wasFilledBefore = $thisDrop.data("filled") === true;
  
  //     const oldLetterId = $thisDrop.data("placedLetterId");
  //     if (oldLetterId) {
  //       const $oldDraggable = $(`#${oldLetterId}`);
    
  //       $oldDraggable
  //         .css("opacity", "1")
  //         .attr("draggable", "true")
  //         .data("dropped", false);
    
  //       $("#animalContainer > div").append($oldDraggable);
  //       $thisDrop.text("");
  //       $thisDrop.data("filled", false);
  //       $thisDrop.removeData("placedLetterId"); 
  //     }
    
  //     const dragData = event.originalEvent.dataTransfer.getData("text");
  //     const { letter, id } = JSON.parse(dragData);
    
  //     $thisDrop.text(letter.toLowerCase());
  //     $thisDrop.data("placedLetterId", id);
    
  //     if (!wasFilledBefore) {
  //       $thisDrop.data("filled", true);
        
  //       let filledDroppables = $animalContainer.data("filledDroppables") || 0;
  //       filledDroppables++;
  //       $animalContainer.data("filledDroppables", filledDroppables);
    
  //       filledDroppablesPage++;
  //       if (filledDroppablesPage >= totalDroppablesPage) {
  //         checkWords();
  //       }
  //     } else {
  //       $thisDrop.data("filled", true);
  //     }
    
  //     $(`#${id}`)
  //       .css("opacity", "0")
  //       .attr("draggable", "false")
  //       .data("dropped", true);
  //   });
  // }

  function enableDragDrop() {
    // drag
    $(".draggable").off("click").on("click", function () {
      if ($('.selected').not(`#${$(this).attr('id')}`).lenght !== 0) {
        $('.selected').not(`#${$(this).attr('id')}`).removeClass('selected')
      }
      $(this).toggleClass('selected')
    });

    // drop
    $('.droppable').on("click", function () {
      if ($('.selected').length === 0) {
        return
      }
    
      const letter = $('.selected').data("letter");
      const id = $('.selected').attr("id");

      const $animalContainer = $(this).closest("#animalContainer");
      const wasFilledBefore = $(this).data("filled") === true;

      if ($(this).text().trim() !== '') {
        const placedLetter = $(this).data("placedLetterId");
        $(`#${placedLetter}`)
          .css("opacity", "1")
          .css("cursor", "pointer")
          .data("dropped", false)
          .on("click", function () {
            if ($('.selected').not(`#${$(this).attr('id')}`).length !== 0) {
              $('.selected').not(`#${$(this).attr('id')}`).removeClass('selected')
            }
            $(this).toggleClass('selected')
          }); 
      } 

      $(this).text(letter.toLowerCase());
      $(this).data("placedLetterId", id);

      $(`#${id}`).off("click");

      $(`#${id}`)
      .css("opacity", "0")
      .css("cursor", "default")
      .data("dropped", true)
      .removeClass("selected")

      $(this).data("filled", true);
      $(this).css("cursor", "default"); 

      if (!wasFilledBefore) {
        $(this).data("filled", true);
        
        let filledDroppables = $animalContainer.data("filledDroppables") || 0;
        filledDroppables++;
        $animalContainer.data("filledDroppables", filledDroppables);
    
        filledDroppablesPage++;
        if (filledDroppablesPage >= totalDroppablesPage) {
          checkWords();
        }
      } else {
        $(this).data("filled", true);
      }
    });
  }
  
  function checkWords() {
    console.log('asdasd')
    const index = currentAnimalIndex;
    const values = dataArray[index];
    const $animalContainer = $("#animalContainer");

    const correctWord = values.animal.toLowerCase();
    let userWordArr = new Array(correctWord.length);
  
    for (let i = 0; i < correctWord.length; i++) {
      const $circle = $animalContainer.find(`[data-index="${i}"]`);
      const letter = $circle.text().trim().toLowerCase();
      userWordArr[i] = letter;
    }
    const userWord = userWordArr.join("");

    // first attempt
    if (attemptCountPage === 1) {
      if (userWord === correctWord) {
        if (wordStatus[index] !== "correct") {
          overallCorrect++;
        }
        wordStatus[index] = "correct";

        // correct
        $animalContainer.find(".droppable, .revealed-letter").each(function () {
          $(this)
            .removeClass("bg-white bg-danger animate__shakeX")
            .addClass(
              "bg-success animate__animated animate__slow animate__bounce"
            );
        });

        setTimeout(() => {
          goToNextPage();
        }, 3000);
      } else {
        wordStatus[index] = "incorrect";
        // wrong
        $animalContainer.find(".droppable, .revealed-letter").each(function () {
          $(this)
            .removeClass("bg-white bg-success animate__bounce")
            .addClass(
              "bg-danger animate__animated animate__slow animate__shakeX"
            );
        });

        attemptCountPage++;

        setTimeout(() => {
          $animalContainer.find(".droppable, .revealed-letter").each(function () {
            const droppableIndex = $(this).data("index");
            const isRevealed =
              revealedIndexes[index].includes(droppableIndex);

            if (isRevealed) {
              $(this).text(values.animal[droppableIndex].toLowerCase());
            } else {
              $(this).text("");
            }

            $(this)
              .removeClass(
                "bg-success bg-danger animate__animated animate__slow animate__bounce animate__shakeX"
              )
              .addClass("bg-white")
              .data("filled", isRevealed);
          });

          $animalContainer.find(".draggable").css("opacity", "1");

          // calculate droppables
          totalDroppablesPage = 0;
          const word_length = values.animal.length;
          let revealedLettersNumber = word_length < 6 ? 1 : 2;
          let incorrectDroppables = word_length - revealedLettersNumber;
          totalDroppablesPage += incorrectDroppables;

          filledDroppablesPage = 0;
          enableDragDrop()
        }, 3000);
      }
    } else if (attemptCountPage === 2) {
      if (userWord === correctWord) {
        if (wordStatus[index] !== "correct") {
          overallCorrect++;
        }
        wordStatus[index] = "correct";

        // correct
        $animalContainer.find(".droppable, .revealed-letter").each(function () {
          $(this)
            .removeClass("bg-white bg-danger animate__shakeX")
            .addClass(
              "bg-success animate__animated animate__slow animate__bounce"
            );
        });
      } else {
        wordStatus[index] = "incorrect";
        // wrong
        $animalContainer.find(".droppable, .revealed-letter").each(function () {
          $(this)
            .removeClass("bg-white bg-success animate__bounce")
            .addClass(
              "bg-danger animate__animated animate__slow animate__shakeX"
            );
        });
      }

      setTimeout(() => {
        goToNextPage();
      }, 3000);
    }
  }

  function goToNextPage() {
    currentAnimalIndex++;

    if (currentAnimalIndex < dataArray.length) {
      if (currentAnimalIndex === 8) {
        showInstructions(1); 
      } 
      else if (currentAnimalIndex === 16) {
        showInstructions(2); 
      } else {
        renderPage(currentAnimalIndex);
      }
    } else {
      console.log(`score: ${overallCorrect}/${totalWords}`);

      // final score
      if (!$("#message-modal").hasClass("show")) {
        $("#message-modal .modal-body").addClass("text-center");

        if (overallCorrect >= totalWords * 0.8) {
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
        $("#restartButton").on("click", function () {
          location.reload();
        });
        $("#message-modal").on("hidden.bs.modal", function () {
          window.location.href = "activities.html";
        });
        $("#message-modal").modal("show");
      }
    }
  }

  
});
