$(document).ready(async function () {
  const host = "https://formation.stepforward-education.fr/amazing-english/";
  const data = {
    1: {
      activity1: "select_answer",
      activity2: "wordsearch",
      activity3: "animal_missing",
    },
    2: {
      activity1: "wordsearch",
      activity2: "levels_drag_and_drop",
      activity3: "animal_missing",
    },
    3: {
      activity1: "wordsearch",
      activity2: "drag_and_drop",
      activity3: "levels_drag_and_drop",
    },
  };

  const kidAge = localStorage.getItem("age");
  if (kidAge < 7) {
    localStorage.setItem("ageGroup", 1);
  } else if (kidAge > 6 && kidAge < 10) {
    localStorage.setItem("ageGroup", 2);
  } else {
    localStorage.setItem("ageGroup", 3); 
  }

  if (window.location.href.includes("activities.html")) {
    localStorage.removeItem("activity");
  }
  if (
    window.location.href.includes("game.html") &&
    localStorage.getItem("age") !== null &&
    localStorage.getItem("activity") !== null
  ) {
    const template = await fetch(
      `${
        data[localStorage.getItem("ageGroup")][localStorage.getItem("activity")]
      }.html?v=106`
    ).then((response) => response.text());
    $("body").append(
      `<script src="${
        data[localStorage.getItem("ageGroup")][localStorage.getItem("activity")]
      }.js?v=106"></script>`
    );
    $("body").append(template);

    function isMobileDevice() {
      return /Android|iPhone/i.test(navigator.userAgent);
    }

    function updateViewportHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
  } else {
    if (window.location.href.includes("game.html")) {
      window.location.href = "index.html";
    }
  }

  const activitiesButton = $("button").filter(function () {
    return $(this).text().trim() === "activities home page";
  });

  $(activitiesButton).on("click", function () {
    window.location.href = "activities.html";
  });

  const homeButton = $("button").filter(function () {
    return $(this).text().trim() === "home page";
  });

  $(homeButton).on("click", function () {
    window.location.href = `${host}games.html`;
  });

  $(".card-landing").on("click", function (index, element) {
    localStorage.setItem("activity", `activity${$(this).data("activity")}`);
    window.location.href = "game.html";
  });

  if ($('.fa-volume-up').length === 0) {
    $(".instruction-en").append(` <i class="fas fa-volume-up"></i>`);
  }
  

  $(".instruction-en").css("cursor", "pointer");
  $(".instruction-en").on("click", function () {
    playSound(
      `./audio/directions/${localStorage.getItem(
        "ageGroup"
      )}/${localStorage.getItem("activity")}.mp3`
    );
  });

  function playSound(src) {
    if ($("audio").length === 0) {
      $("main").append('<audio type="audio/mpeg"></audio>');
    }
    if (!e) var e = window.event;
    if (e) e.stopPropagation();
    $("audio")[0].pause();
    $("audio").attr("src", src);
    $("audio")[0].play();
  }

  $("#failed").on("click", function () {
    window.location.href = `${host}index.html`;
  });

  async function checkUser() {
    checkToken().then((response) => {
      if (response.code === 200) {
        checkUserToken().then((response) => {
          if (response.code !== 200) {
            window.location.href = `${host}index.html`;
          }
        });
      } else {
        window.location.href = `${host}index.html`;
      }
    });
  }

  checkUser();
});

async function checkIfSublevelWon(result) {
  checkUserToken().then((response) => {
    if (response.code === 200) {
      let userData = response;
      if (!response.sublevels.includes(2)) {
        const game_no = localStorage
          .getItem("activity")
          .replace("activity", "game");
        updateSubjectPronounsStatus(game_no, result).then((response) => {
          if (response.code === 200) {
            if (response.status !== "already played") {
              saveCurrentSublevelProgress(25).then((response) => {
                if (response.code === 200) {
                  if (response.progress === 100) {
                    //CHECK OVERALL GAME STATUS AND SHOW RELEVANT MESSAGE
                    getOverallSubjectPronounsStatus().then((response) => {
                      if (response.code === 200) {
                        if (response.status !== "fail") {
                          //CHECK OVERALL GAME STATUS AND SHOW RELEVANT MESSAGE
                          startRewardAnimation();
                          let data = userData;
                          data["sublevels"].push(2);
                          saveResult(data);
                        } else {
                          // SHOW OTHEr
                          $("#finished-message-modal #rate").text(
                            Math.round(response.result)
                          );
                          $("#finished-message-modal").modal("show");
                          saveResult(userData);
                        }
                        return true;
                      } else {
                        alert(response.message);
                        return false;
                      }
                    });
                  }
                } else {
                  alert(response.message);
                  return false;
                }
              });
            }
          } else {
            alert(response.message);
            return false;
          }
        });
      } else {
        return false;
      }
    } else {
      window.location.href = `${host}index.html`;
    }
  });
}

async function saveResult(data) {
  saveGameResult(data.level, data["sublevels"], data.age).then((response) => {
    localStorage.setItem("showCongratsMessage", response.showCongratsMessage);
  });
}

function playSound(src) {
  if ($("audio").length === 0) {
    $("main").append('<audio type="audio/mpeg"></audio>');
  }
  if (!e) var e = window.event;
  if (e) e.stopPropagation();
  $("audio")[0].pause();
  $("audio").attr("src", src);
  $("audio")[0].play();
}

async function startRewardAnimation() {
  $("#reward-modal").modal("show");
  playSound("../audio/feed your animal-animation.mp3");
  $("#reward-modal #avatar-icon").attr(
    "src",
    `../img/${localStorage.getItem("avatar")}-icon.svg`
  );
  $("#reward-modal #avatar").attr(
    "src",
    `../img/${localStorage.getItem("avatar")}.png`
  );
  tsParticles.load("tsparticles", {
    fullScreen: {
      zIndex: 1,
    },
    emitters: [
      {
        position: {
          x: 0,
          y: 30,
        },
        rate: {
          quantity: 5,
          delay: 0.15,
        },
        particles: {
          move: {
            direction: "top-right",
            outModes: {
              top: "none",
              left: "none",
              default: "destroy",
            },
          },
        },
      },
      {
        position: {
          x: 100,
          y: 30,
        },
        rate: {
          quantity: 5,
          delay: 0.15,
        },
        particles: {
          move: {
            direction: "top-left",
            outModes: {
              top: "none",
              right: "none",
              default: "destroy",
            },
          },
        },
      },
    ],
    particles: {
      color: {
        value: ["#ffffff", "#00a864", "#edf50f", "#286fb5", "#f50fe2"],
      },
      move: {
        decay: 0.05,
        direction: "top",
        enable: true,
        gravity: {
          enable: true,
        },
        outModes: {
          top: "none",
          default: "destroy",
        },
        speed: {
          min: 10,
          max: 50,
        },
      },
      number: {
        value: 0,
      },
      opacity: {
        value: 1,
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: "random",
        animation: {
          enable: true,
          speed: 30,
        },
      },
      tilt: {
        direction: "random",
        enable: true,
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 30,
        },
      },
      size: {
        value: {
          min: 5,
          max: 10,
        },
        animation: {
          enable: true,
          startValue: "min",
          count: 1,
          speed: 16,
          sync: true,
        },
      },
      roll: {
        darken: {
          enable: true,
          value: 25,
        },
        enable: true,
        speed: {
          min: 5,
          max: 15,
        },
      },
      wobble: {
        distance: 30,
        enable: true,
        speed: {
          min: -7,
          max: 7,
        },
      },
      shape: {
        type: ["circle", "square"],
        options: {},
      },
    },
  });

  const input = document.querySelector("#slider");
  const label = document.querySelector("#slider-label");
  document.body.style.setProperty(
    "--dynamicIconImage",
    `url("../img/${localStorage.getItem("avatar")}-icon.svg")`
  );
  document.body.style.setProperty(
    "--dynamicAvatarImage",
    `url("../img/${localStorage.getItem("avatar")}.png")`
  );

  input.addEventListener("input", (event) => {
    const value = Number(input.value) / 100;

    $("#animation-text").css("margin-left", value * 80 + "%");
    avatar.style.opacity = value + 0.2;

    if (value === 1) {
      playSound("../audio/yummi-animation.mp3");
    }
  });

  $("#reward-modal").on("hidden.bs.modal", function (event) {
    const container = tsParticles.domItem(0);
    $("#reward-modal").modal("hide");
    container.plugins.get("emitters").array[0].pause();
    container.plugins.get("emitters").array[1].pause();
    input.value = 0;
    $("#avatar").css("opacity", 0.2);
    $("#animation-text").css("margin-left", "0");
    // const audio = document.getElementById('audio');
    $("audio")[0].pause();
  });
}
