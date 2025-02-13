/* eslint-disable no-undef */
$(document).ready(function () {

  function isTouchActionSupported() {
    return CSS.supports('touch-action', 'none');
  }
  
  if (!isTouchActionSupported()) {
    $('#grid').on('touchstart touchmove touchend', function(e) {
      e.preventDefault();
    }, { passive: false });
  }

  const words_all = [["COW","SHEEP", "PIG","HORSE","GOOSE","HEN","CHICKEN","DUCK"],
  ["TIGER","LION","GIRAFFE","ANTELOPE","CHEETAH","ZEBRA","ELEPHANT","RHINOCEROS"],
  ["DOG","CAT", "TURTLE","PARROT","HAMSTER","GOLDFISH","RABBIT","CANARY"]
  ];
  
  const solution = [[{9 : "F"}, {19 : "A"}, {29 : "R"}, {39 : "M"}], [{3 : "S"}, {4 : "A"}, {5 : "V"}, {6 : "A"}, {7 : "N"}, {8 : "N"}, {9 : "A"}], [{5 : "H"}, {6 : "O"}, {7 : "U"}, {8 : "S"}, {9 : "E"}]]

  const predifened_grid = [
    [
      {
        "word" : "sheep",
        "letters" : [0,10,20,30,40]
      },
      {
        "word" : "goose",
        "letters" : [24,35,46,57,68]
      },
      {
        "word" : "chicken",
        "letters" : [13,23,33,43,53,63,73]
      },
      {
        "word" : "cow",
        "letters" : [90,91,92]
      },
      {
        "word" : "pig",
        "letters" : [74,85,96]
      },
      {
        "word" : "horse",
        "letters" : [49,59,69,79,89]
      },
      {
        "word" : "duck",
        "letters" : [7,17,27,37]
      },
      {
        "word" : "hen",
        "letters" : [76,77,78]
      }
    ],
    [
      {
        "word" : "cheetah",
        "letters" : [20,30,40,50,60,70,80]
      },
      {
        "word" : "tiger",
        "letters" : [42,53,64,75,86]
      },
      {
        "word" : "zebra",
        "letters" : [81,82,83,84,85]
      },
      {
        "word" : "giraffe",
        "letters" : [22,33,44,55,66,77,88]
      },
      {
        "word" : "antelope",
        "letters" : [19,29,39,49,59,69,79,89]
      },
      {
        "word" : "lion",
        "letters" : [27,37,47,57]
      },
      {
        "word" : "elephant",
        "letters" : [11,12,13,14,15,16,17,18]
      },
      {
        "word" : "rhinoceros",
        "letters" : [90,91,92,93,94,95,96,97,98,99]
      }
    ],
    [
      {
        "word" : "dog",
        "letters" : [11,12,13]
      },
      {
        "word" : "cat",
        "letters" : [10,20,30]
      },
      {
        "word" : "hamster",
        "letters" : [21,31,41,51,61,71,81]
      },
      {
        "word" : "parrot",
        "letters" : [19,29,39,49,59,69]
      },
      {
        "word" : "turtle",
        "letters" : [3,14,25,36,47,58]
      },
      {
        "word" : "rabbit",
        "letters" : [52,53,54,55,56,57]
      },
      {
        "word" : "canary",
        "letters" : [73,74,75,76,77,78]
      },
      {
        "word" : "goldfish",
        "letters" : [92,93,94,95,96,97,98,99]
      }
    ]
  ];
  
  const directions = [
    {"en" : "Find all the names of the <span>farm animals</span> in the grid.<br>Words can be read  horizontally, vertically or diagonally. ", 
     "fr" : "Retrouve tous les noms d’animaux de la ferme dans la grille.<br>Les mots peuvent se lire horizontalement, verticalement ou en diagonale.",
     "audio" : "farm_animals.mp3"
    }, 
    {"en" : "Find all the names of the <span>wild animals</span> in the grid.<br>Words can be read  horizontally, vertically or diagonally. ", 
     "fr" : "Retrouve tous les noms d’animaux sauvages dans la grille.<br>Les mots peuvent se lire horizontalement, verticalement ou en diagonale.",
     "audio" : "wild_animals.mp3"
    }, 
    {"en" : "Find all the names of the <span>pets</span> in the grid.<br>Words can be read  horizontally, vertically or diagonally. ", 
     "fr" : "Retrouve tous les noms d’animaux domestiques dans la grille.<br>Les mots peuvent se lire horizontalement, verticalement ou en diagonale.",
      "audio" : "pets.mp3"
    }
  ]

  const congrats = [
    {
      "en": "Well done! &#128522;<br>Are you ready to take up a new challenge on the wild animals?<br>It is your turn! ",
      "fr": "Bien joué ! Es-tu prêt(e) à relever un nouveau challenge sur les animaux sauvages ? À toi de jouer !",
      "audio" : "congrats_1.mp3"
    },
    {
      "en": "You are unbeatable!<br>Take up the final challenge on the pets. Here we go! ",
      "fr": "Tu es imbattable ! Relève le dernier défi sur les animaux domestiques. C'est parti !",
       "audio" : "congrats_2.mp3"
    }
  ];

  const question = [
    {
      "en": "Top right, you can read vertically in English the name of the place where the farm animals are raised. Which one is it? Write it down in the boxes below. ",
      "fr": "En haut à droite, tu pourras lire verticalement en anglais le nom de l'endroit où les animaux de la ferme sont élevés. Lequel est-ce ? Note le dans les cases ci-dessous.",
      "audio" : "question_1.mp3",
      "answer" : "FARM"
    },
    {
      "en": "On the first line, you can read horizontally in English the name of the place where the wild animals live. Which one is it? Write it down in the boxes below. ",
      "fr": "Sur la première ligne, tu pourras lire verticalement en anglais le nom de l'endroit où les animaux sauvages sont élevés. Lequel est-ce ? Note le dans les cases ci-dessous.",
      "audio" : "question_2.mp3",
      "answer" : "SAVANNA"
    },
    {
      "en": "On the first line, you can read vertically the name of the place where the pets live. Which one is it? Write it down in the boxes below. ",
      "fr": "Sur la première ligne, tu pourras lire verticalement en anglais le nom de l'endroit où les animaux domestiques sont élevés. Lequel est-ce ? Note le dans les cases ci-dessous.",
      "audio" : "question_3.mp3",
      "answer" : "HOUSE"
    }
  ]

  const colors = {
    'correct-1' : '255, 215, 0',
    'correct-2' : '255, 99, 71',
    'correct-3' : '127, 255, 212',
    'correct-4' : '138, 43, 226',
    'correct-5' : '220, 20, 60',
    'correct-6' : '0, 255, 0',
    'correct-7' : '255, 105, 180',
    'correct-8' : '30, 144, 255',
    'correct-9' : '255, 69, 0',
    'correct-10' : '173, 255, 47'
  }
  
  let currentPage = 0;
  
  const gridSize = 10;
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let isDragging = false;
  let startIndex = null;
  let selectedCells = [];
  let selectedWord = "";
  let wordCount = 0;
  let direction = null;

  const age = parseInt(localStorage.getItem("ageGroup"));

  let words = words_all[currentPage];

  let validDirections = [];
  if (age === 1) {
    validDirections = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
    ];
  } else if (age === 2 || age === 3) {
    validDirections = [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 1, y: -1 },
    ];
  }

  let z_index = 1;

  // GRID CREATION //
  function createGrid() {
    words = words_all[currentPage];
    wordCount = 0;
    $('#grid').empty();
    $('#words').empty();
    $("#words").html(words.map((item) => `<li>${item}</li>`).join(""));

   
    for (let i = 0; i < gridSize * gridSize; i++) {
      $("#grid").append(`<div class="cell" data-index="${i}"></div>`);
    }

    // APPEND SOLUTION
    if (age !== 1) {
      solution[currentPage].forEach(element => {
        const key = Object.keys(element)[0];
        const value = element[key];   
        $(`.cell[data-index="${key}"]`).text(value)
      })
    }
    
    let predifened_grid_needed = false;

    for (let word of words) {
      if (predifened_grid_needed === true) {
        break
      }
      let placed = false;
      let counter = 0;
      while (!placed) {
        counter = counter + 1
        if (counter > 20000) {
          placed = true;
          predifened_grid_needed = true;
        }
        const dirIndex = Math.floor(Math.random() * validDirections.length);
        const dir = validDirections[dirIndex];
        const startRow = Math.floor(Math.random() * gridSize);
        const startCol = Math.floor(Math.random() * gridSize);
        let canPlace = true;
        let positions = [];

        for (let i = 0; i < word.length; i++) {
          const row = startRow + dir.y * i;
          const col = startCol + dir.x * i;

          if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) {
            canPlace = false;
            break;
          }

          const index = row * gridSize + col;
          if ($(`.cell[data-index="${index}"]`).text() !== "") {
            canPlace = false;
            break;
          }
          positions.push(index);
        }

        if (canPlace) {
          for (let i = 0; i < word.length; i++) {
            const index = positions[i];
            $(`.cell[data-index="${index}"]`).text(word[i]);
            $(`.cell[data-index="${index}"]`).attr("data-word", word);
          }
          placed = true;
        }
      }
    }

    if (predifened_grid_needed === true) {
      // CREATE PREDEFINED GRID
      $('.cell').text('');
      $('.cell').removeAttr('data-word');
      predifened_grid[currentPage].forEach(element => {
        const word = element.word.toUpperCase();
        let i = 0;
        element.letters.forEach(index => {
          $(`.cell[data-index="${index}"]`).text(word[i]);
          $(`.cell[data-index="${index}"]`).attr("data-word", word);
          i = i + 1;
        })
      })
      // APPEND SOLUTION
      if (age !== 1) {
        solution[currentPage].forEach(element => {
          const key = Object.keys(element)[0];
          const value = element[key];   
          $(`.cell[data-index="${key}"]`).text(value)
        })
      }
    }

    // POPULATE CELLS //
    $(".cell").each(function () {
      if ($(this).text() === "") {
        const randomLetter =
          alphabet[Math.floor(Math.random() * alphabet.length)];
        $(this).text(randomLetter);
      }
    });
  }

  // CROSS OUT FOUND WORD //
  function crossOutWord(word) {
    $("#words li").each(function () {
      if ($(this).text() === word) {
        $(this).addClass("crossed");
      }
    });
  }

  // DISABLE SELECTED CELLS //
  function disableSelectedCells() {
    selectedCells.forEach((index) => {
      const $cell = $(`.cell[data-index="${index}"]`);
      $cell.addClass("disabled").off();
    });
  }

  // GET CLIENT COORDINATES (MOUSE OR TOUCH) //
  function getClientCoordinates(e) {
    let clientX, clientY;
    if (e.type.includes("touch")) {
      const touch =
        e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
      clientX = touch.clientX;
      clientY = touch.clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return { clientX, clientY };
  }

  // PREVENT RIGHT-CLICK //
  $("#grid").on("contextmenu", function (e) {
    e.preventDefault();
  });

  // CELL SELECTION //
  function cellSelection() {
    $(".cell").on("mousedown touchstart", function (e) {
      if ($(this).hasClass("correct") || $(this).hasClass("disabled")) {
        return;
      }

      isDragging = true;
      selectedCells = [];
      selectedWord = "";
      direction = null;

      startIndex = $(this).data("index");
      const letter = $(this).text();

      selectedCells.push(startIndex);
      selectedWord += letter;

      $(".cell").removeClass("marked");
      $(this).addClass("marked");
    });

    // MOUSE MOVE  TOUCH MOVE //
    $(document).on("mousemove touchmove", function (e) {
      if (!isDragging) return;

      const { clientX, clientY } = getClientCoordinates(e);
      const element = document.elementFromPoint(clientX, clientY);

      if (!$(element).hasClass("cell")) return;

      const $cell = $(element);
      const currentIndex = $cell.data("index");

      if (currentIndex === startIndex) return;

      const result = getCellsInLine(startIndex, currentIndex);

      if (!result) return;

      // REMOVE MARK
      $(".cell").removeClass("marked");

      selectedCells = result.path;
      direction = result.direction;

      selectedWord = selectedCells
        .map((index) => $(`.cell[data-index="${index}"]`).text())
        .join("");

      // MARK
      selectedCells.forEach((index) => {
        $(`.cell[data-index="${index}"]`).addClass("marked");
      });
    });

    // MOUSE UP / TOUCH END //
    $(document).on("mouseup touchend", function (e) {
      if (!isDragging) return;
      isDragging = false;

      if (!direction) {
        resetSelection();
        return;
      }

      const isAllowedDirection = validDirections.some(
        (dir) =>
          (dir.x === direction.x && dir.y === direction.y) ||
          (dir.x === -direction.x && dir.y === -direction.y)
      );

      if (!isAllowedDirection) {
        selectedCells.forEach((index) => {
          $(`.cell[data-index="${index}"]`)
            .removeClass("marked")
            .addClass("invalid-direction");
        });
        setTimeout(() => {
          $(".cell").removeClass("invalid-direction");
        }, 200);
        resetSelection();
        return;
      }
      // REVERSE WORD //
      const reversedWord = selectedWord.split("").reverse().join("");


      // CHECK IF ALL SELECTED CELLS HAVE CORRECT DATA-WORD ATTRIBUTE
      let allCellsValid = true;
      $('.marked').each(function() {
          if ($(this).data('word') !== selectedWord && $(this).data('word') !== reversedWord) {
            allCellsValid = false; 
          }
      });


      if ((words.includes(selectedWord) || words.includes(reversedWord)) && allCellsValid === true) {
        // CHECK IF WORD ALREADY CROSSED
        let already_played = false;
        $("#words li").filter(function() {
          return $(this).text().trim() === selectedWord || $(this).text().trim() === reversedWord; 
        }).each(function() {
          if ($(this).hasClass('crossed')) {
            already_played = true
          } else {
            already_played = false
          }
        });

        if (already_played) {
          return
        }

        wordCount++;
        const colorClass = `correct-${(wordCount % 10) + 1}`;
        selectedCells.sort((a, b) => a - b);

        if ((browserInfo.browser.toLocaleLowerCase().includes('safari') && parseInt(browserInfo.version) < 16) || (browserInfo.browser.toLocaleLowerCase().includes('chrome') && parseInt(browserInfo.version) < 108)) {
          selectedCells.forEach((value, index) => {
            const cell = $(`.cell[data-index="${value}"]`);
            cell.removeClass("marked");
  
            let angle = 0;
            let width = "100%";
            let additional_class = "";
  
            if (index === 0) {
              // FIRST ELEMENT
              additional_class = "border_left";
            } else if (index === selectedCells.length - 1) {
              // LAST ELEMENT
              additional_class = "border_right";
            }
  
            if (direction.x === 0 && (direction.y === 1 || direction.y === -1)) {
              // VERTICAL
              angle = "90";
            } else if (
              (direction.x === 1 && direction.y === 1) ||
              (direction.x === -1 && direction.y === -1)
            ) {
              // DIAGONAL LEFT
              angle = "45";
              width = Math.sqrt(cell.outerWidth() ** 2 + cell.outerHeight() ** 2)+'px';
            } else if (
              (direction.x === 1 && direction.y === -1) ||
              (direction.x === -1 && direction.y === 1)
            ) {
              // DIAGONAL RIGHT
              angle = "135";
              width = Math.sqrt(cell.outerWidth() ** 2 + cell.outerHeight() ** 2)+'px';
            }
            $(cell).css('background-color', `RGB(${colors[colorClass]}, 0.8)`);
          });
        } else {
          selectedCells.forEach((value, index) => {
            const cell = $(`.cell[data-index="${value}"]`);
            cell.removeClass("marked");
  
            let angle = 0;
            let width = "100%";
            let additional_class = "";
  
            if (index === 0) {
              // FIRST ELEMENT
              additional_class = "border_left";
            } else if (index === selectedCells.length - 1) {
              // LAST ELEMENT
              additional_class = "border_right";
            }
  
            if (direction.x === 0 && (direction.y === 1 || direction.y === -1)) {
              // VERTICAL
              angle = "90";
            } else if (
              (direction.x === 1 && direction.y === 1) ||
              (direction.x === -1 && direction.y === -1)
            ) {
              // DIAGONAL LEFT
              angle = "45";
              width = Math.sqrt(cell.outerWidth() ** 2 + cell.outerHeight() ** 2)+'px';
            } else if (
              (direction.x === 1 && direction.y === -1) ||
              (direction.x === -1 && direction.y === 1)
            ) {
              // DIAGONAL RIGHT
              angle = "135";
              width = Math.sqrt(cell.outerWidth() ** 2 + cell.outerHeight() ** 2)+'px';
            }
  
            const marker_element = `
            <div 
              class="marker_element ${colorClass} ${additional_class} ${angle === "45" || angle === "135" ? "diagonal" : ""}" 
              style="
                position: absolute;
                transform: rotate(${angle}deg) translateZ(0); 
                -webkit-transform: rotate(${angle}deg) translateZ(0); 
                z-index: ${z_index}; 
                width: ${width};
            ">
            </div>`;
            cell.append(marker_element);
            z_index += 1;
          });
        }

        if (words.includes(selectedWord)) {
          crossOutWord(selectedWord);
        } else {
          crossOutWord(reversedWord);
        }
        
        disableSelectedCells();

        if ($('#words li').length === $('#words li.crossed').length) {
          setTimeout(function() {
            if (localStorage.getItem('ageGroup') == 1) {
              if (currentPage === 0 || currentPage === 1) {
                showCongrats(); 
              } else {
                showNext(); 
              }
            } else {
              showQuestion()
            }
          }, 1000);
        }
      } else {
        selectedCells.forEach((index) => {
          $(`.cell[data-index="${index}"]`)
            .removeClass("marked")
        });
      }
      resetSelection();
    });
  }

  // RESET SELECTION //
  function resetSelection() {
    selectedCells = [];
    selectedWord = "";
    direction = null;
    startIndex = null;
    $(".cell").removeClass("marked");
  }

  // GET CELLS IN LINE //
  function getCellsInLine(startIndex, endIndex) {
    const startRow = Math.floor(startIndex / gridSize);
    const startCol = startIndex % gridSize;
    const endRow = Math.floor(endIndex / gridSize);
    const endCol = endIndex % gridSize;

    const deltaRow = endRow - startRow;
    const deltaCol = endCol - startCol;

    const gcd = Math.abs(greatestCommonDivisor(deltaRow, deltaCol));
    const stepRow = deltaRow / gcd || 0;
    const stepCol = deltaCol / gcd || 0;

    const length = gcd + 1;
    let path = [];
    for (let i = 0; i < length; i++) {
      const row = startRow + stepRow * i;
      const col = startCol + stepCol * i;

      if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) {
        return null;
      }

      const index = row * gridSize + col;
      path.push(index);
    }

    return {
      path: path,
      direction: { x: stepCol, y: stepRow },
    };
  }

  function greatestCommonDivisor(a, b) {
    if (b === 0) return Math.abs(a);
    return greatestCommonDivisor(b, a % b);
  }

  // INSTRUCTIONS
  function showInstructions() {
    $('#instructionModal .instruction-en').html(directions[currentPage]['en']);
    $('#instructionModal .instruction-fr').html(directions[currentPage]['fr']);
    $('#instructionModal .instruction-en').append('<i class="fas fa-volume-up"></i>');
  
    $(".instruction-en").off('click');
    $(".instruction-en").on("click", function () {
      playSound(
        `./audio/wordsearch/${directions[currentPage]['audio']}`
      );
    });


    $('#grid, #words').hide();    
    $('#wordsearch').css('background-image', 'url("./media/wordsearch/modal_background.png")');
    $('#instructionModal').modal('show');

    $('#instructionModal').on('hide.bs.modal', function (e) {
      if ($("audio").length !== 0) {
        $("audio")[0].pause();
      }

      $('#grid, #words').show();
  
      $('#wordsearch').css('background-image', 'url("./media/wordsearch/wordsearch_background.png")');
  
      createGrid();
      cellSelection();
    });
  } 
  
  // QUESTION
  function showQuestion() {
    $("#preview").empty();
    html2canvas(document.querySelector("#grid")).then(canvas => {
      $("#preview").append(canvas);
      scrollToBottom();
    });

    $('#questionModal .correct-answer').remove();
    if ($('#answer .old-browser-version').length !== 0) {
      $('#answer input.old-browser-version').val('');
      $('#answer input.old-browser-version').attr('disabled', false);
      $('#answer label.old-browser-version').attr('disabled', false);
      $(`#answer input.old-browser-version`).css('color', 'black');
    }
   
    $(".question-modal-body").width($('#grid').width()+'px')

    $('#questionModal .instruction-en').html(question[currentPage]['en']);
    $('#questionModal .instruction-fr').html(question[currentPage]['fr']);
    $('#questionModal .instruction-en').append('<i class="fas fa-volume-up"></i>');

    $(".instruction-en").off('click');
    $(".instruction-en").on("click", function () {
      playSound(
        `./audio/wordsearch/${question[currentPage]['audio']}`
      );
    });

    // append input fields
    const letters = question[currentPage]['answer'].split('');

    if ((browserInfo.browser.toLocaleLowerCase().includes('safari') && parseInt(browserInfo.version) >= 16) || (browserInfo.browser.toLocaleLowerCase().includes('chrome') && parseInt(browserInfo.version) >= 108)) {
      $('#answer').empty();
      letters.forEach((letter, index) => {
        const isLast = index === letters.length - 1;
        const inputClasses = isLast ? 'border-dark border-2' : 'border-dark border-end-0';
        $('#answer').append(
          `<input class="${inputClasses} new_browser_version" type="text" data-letter="${letter}">`
        );
      });
      $('#answer input').on('input', function() {
        handleInputNewBrowsers(this)
      })
    } 

    $('#grid, #words').hide();
    $('#wordsearch').css('background-image', 'url("./media/wordsearch/modal_background.png")');
    $('#questionModal').modal('show');
    $('#answer input').first().focus();
  }

  function checkAnswer() {
    if ($('#answer input').val() === '') {
      return;
    }
    $('#answer input').attr('disabled', true);
    $('#answer button').attr('disabled', true);

    if ($('#answer input').val().toLowerCase().trim() === question[currentPage]['answer'].toLowerCase()) {
      $(`#answer input`).css('color', 'green');
      playSound(
        `./audio/wordsearch/${question[currentPage]['answer']}.mp3`
      );
      setTimeout(() => {
        $('#questionModal').modal('hide');
        if (currentPage === 0 || currentPage === 1) {
          showCongrats();
        } else {
          endGameMessage();
        }
      }, 3000);
    } else {
      $(`#answer input`).css('color', 'red');
      setTimeout(() => {
        $('#answer').before(`<p class="correct-answer text-success mb-0 fw-bold">Correct answer:</p>`);
        $(`#answer input`).val(question[currentPage]['answer']);
        $(`#answer input`).css('color', 'green');
        playSound(
          `./audio/wordsearch/${question[currentPage]['answer']}.mp3`
        );
  
        setTimeout(() => {
          $('#questionModal').modal('hide');
          if (currentPage === 0 || currentPage === 1) {
            showCongrats();
          } else {
            endGameMessage();
          }
        }, 3000); 
      }, 500); 
    }
  }

  document.querySelectorAll('#answer input').forEach(input => {
    input.addEventListener('input', function () {
        this.value = this.value.replace(/[^A-Za-z]/g, '');
    });
  });


  $('#check_answer').on('click', function() {
    checkAnswer();
  })

  function handleInputNewBrowsers(inputElement) {
    // for each only one letter to enter is permitted
    let value = $(inputElement).val();
    if (value.length > 0) {
        $(inputElement).val(value.charAt(0).toUpperCase());
    }
      
    const emptyInputs = $(`#answer input`).filter(function() {
      return $(this).val().trim() === '';
    });

    // check if all filled
    if (emptyInputs.length !== 0) {
      if ($(inputElement).next('input').length > 0 && $(inputElement).val() !== '') {
        $(inputElement).next('input').focus();
      }
    } else {
      $(`#answer input`).attr('disabled', true);
      const incorrectInputs = $(`#answer input`).filter(function() {
        return $(this).val().trim().toUpperCase() !== $(this).data('letter').toUpperCase();
      });
      
      if (incorrectInputs.length === 0) {
        $(`#answer input`).css('color', 'green');
        playSound(
          `./audio/wordsearch/${question[currentPage]['answer']}.mp3`
        );
        setTimeout(() => {
          $('#questionModal').modal('hide');
          if (currentPage === 0 || currentPage === 1) {
            showCongrats();
          } else {
            endGameMessage();
          }
        }, 2000);
      } else {
        $(`#answer input`).css('color', 'red');
        setTimeout(() => {
          $('#answer').before(`<p class="correct-answer text-success mb-0 fw-bold">Correct answer:</p>`);
          $(`#answer input`).each(function() {
            $(this).val($(this).data('letter')).css('color', 'green')
            playSound(
              `./audio/wordsearch/${question[currentPage]['answer']}.mp3`
            );
          });
    
          setTimeout(() => {
            $('#questionModal').modal('hide');
            $('#questionModal').hide();
            if (currentPage === 0 || currentPage === 1) {
              showCongrats();
            } else {
              endGameMessage();
            }
          }, 2000); 
        }, 500); 
      }
    }
  }

  // CONGRATS
  function showCongrats() {
    $('#congratsModal .instruction-en').html(congrats[currentPage]['en']);
    $('#congratsModal .instruction-fr').html(congrats[currentPage]['fr']);
    $('#congratsModal .instruction-en').append('<i class="fas fa-volume-up"></i>');
  
    $(".instruction-en").off('click');
    $(".instruction-en").on("click", function () {
      playSound(
        `./audio/wordsearch/${congrats[currentPage]['audio']}`
      );
    });


    $('#grid, #words').hide();
    $('#wordsearch').css('background-image', 'url("./media/wordsearch/modal_background.png")');
  
    $('#congratsModal').removeClass('d-none');
    $('#congratsModal').modal('show');
  
    $('#congratsModal').on('hide.bs.modal', function (e) {
      if ($("audio").length !== 0) {
        $("audio")[0].pause();
      }

      $('#congratsModal').addClass('d-none');
      $('#congratsModal').off('hide.bs.modal');
      $('#wordsearch').css('background-image', 'url("./media/wordsearch/wordsearch_background.png")');
  
      showNext(); 
    });
  }

  // END GAME POP UP
  function endGameMessage() {
    $("#message-modal .modal-body").html(
      `<div class="text-center">
        <p>Congratulations!</p>
        <p>Play another game if you want &#128522;</p>
        <button id="restartButton" class="btn-blue btn fs-bold">Play again</button>
      </div>`
    );
  
    $('#message-modal').modal('show');
    $('#grid, #words, .grid, .wordsearch-navigation').hide();
  
    $('#restartButton').on('click', function() {
      location.reload();
    });
    $("#message-modal").on("hidden.bs.modal", function () {
      window.location.href = "activities.html";
    });
  }

  
  function showNext() {
    if ($("audio").length !== 0) {
      $("audio")[0].pause();
    }
    console.log(currentPage)
    if (currentPage + 1 < words_all.length) {
      currentPage++;
      showInstructions();
    } else {
      endGameMessage();
    }
  }

  function scrollToBottom() {
    let scrollableDiv = document.querySelector("#questionModal");
    if (scrollableDiv.clientHeight/scrollableDiv.scrollHeight < 0.95) {
      $("#questionModal").animate({ scrollTop: scrollableDiv.scrollHeight }, 2000);
    } 
  }

  // DETECT BROWSER VERSION
  function getBrowserVersion() {
    const userAgent = navigator.userAgent;
    let browserName = "Unknown";
    let version = "Unknown";

    // Check for specific browsers
    if (/chrome|crios|crmo/i.test(userAgent)) {
        browserName = "Chrome";
        version = userAgent.match(/(?:chrome|crios|crmo)\/(\d+\.\d+)/i)[1];
    } else if (/firefox|fxios/i.test(userAgent)) {
        browserName = "Firefox";
        version = userAgent.match(/firefox\/(\d+\.\d+)/i)[1];
    } else if (/safari/i.test(userAgent) && !/chrome|crios|crmo/i.test(userAgent)) {
        browserName = "Safari";
        version = userAgent.match(/version\/(\d+\.\d+)/i)[1];
    } else if (/msie|trident/i.test(userAgent)) {
        browserName = "Internet Explorer";
        version = userAgent.match(/(?:msie |rv:)(\d+\.\d+)/i)[1];
    } else if (/edge/i.test(userAgent)) {
        browserName = "Edge";
        version = userAgent.match(/edge\/(\d+\.\d+)/i)[1];
    } else if (/opr\//i.test(userAgent)) {
        browserName = "Opera";
        version = userAgent.match(/opr\/(\d+\.\d+)/i)[1];
    }

    return { browser: browserName, version: version };
  }

  const browserInfo = getBrowserVersion();
  console.log(browserInfo);

  showInstructions();

  window.visualViewport.addEventListener("resize", (event) => {
    if ((browserInfo.browser.toLocaleLowerCase().includes('safari') && parseInt(browserInfo.version) < 16) || (browserInfo.browser.toLocaleLowerCase().includes('chrome') && parseInt(browserInfo.version) < 108)) {
      return
    } else {
      $("div[data-word]").each(function() {
        const cell = $(this);
        const markerElement = $(this).find(".marker_element");
        if (markerElement.hasClass('diagonal')) {
          const width = Math.sqrt(cell.outerWidth() ** 2 + cell.outerHeight() ** 2)+'px';
          markerElement.css('width', width);
        }
      });
    }
  });

  const targetDiv = document.getElementById("grid");

  const resizeObserver = new ResizeObserver(() => {
    if ((browserInfo.browser.toLocaleLowerCase().includes('safari') && parseInt(browserInfo.version) < 16) || (browserInfo.browser.toLocaleLowerCase().includes('chrome') && parseInt(browserInfo.version) < 108)) {
      return
    } else {
      $("div[data-word]").each(function() {
        const cell = $(this);
        const markerElement = $(this).find(".marker_element");
        if (markerElement.hasClass('diagonal')) {
          const width = Math.sqrt(cell.outerWidth() ** 2 + cell.outerHeight() ** 2)+'px';
          markerElement.css('width', width);
        }
      });
    }
  });

  resizeObserver.observe(targetDiv);

  
});


