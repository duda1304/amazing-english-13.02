const translations = {
  farm_animals: {
    en: {
      title: `Susan and Harold’s farm
        <button id="speaker-button" class="btn-icon p-0 m-0">
          <i class="fas fa-volume-up"></i>
        </button>`,
      content: `
        <p class="mb-1 mb-lg-3">
          Hello, my name is Susan and I live in a farm in Bristol
          with my husband Harold. We keep lots of animals together. 
          I look after the cows, pigs, sheep and horses while my 
          husband looks after the hens, ducks, chickens and geese.
        </p>
        <p class="mb-1 mb-lg-3">
          We also organise school trips to our farm to introduce 
          children to farming and help them understand its importance. 
          They love milking cows, collecting eggs from the henhouse 
          and grooming the horses.
        </p>
      `,
    },
    fr: {
      title: `La ferme de Susan et Harold`,
      content: `
        <p class="mb-1 mb-lg-3">
          Bonjour, je m'appelle Susan et je
          vis dans une ferme à Bristol avec mon 
          mari Harold. Nous élevons beaucoup 
          d'animaux ensemble. Je m'occupe des vaches, 
          des cochons, des moutons et des chevaux,
          tandis que mon mari s'occupe des poules, 
          des canards, des poulets et des oies.
        </p>
        <p class="mb-1 mb-lg-2">
          Nous organisons également des visites 
          scolaires dans notre ferme 
          pour faire découvrir l'agriculture 
          aux enfants et les aider à en comprendre 
          l'importance. Ils adorent traire les vaches,  
          ramasser les œufs dans 
          le poulailler et soigner les chevaux.
        </p>
      `,
    },
  },
  wild_animals: {
    en: {
      title: `The Bandia Reserve and  its wild animals
        <button id="speaker-button" class="btn-icon  p-0 m-0">
          <i class="fas fa-volume-up"></i>
        </button>`,
      content: `
        <p class="mb-1 mb-lg-3">
          Hi, my name is Meghan and I work at the 
          Bandia reserve. This one offers an 
          incredible variety of natural landscapes. 
          There are tigers, lions, giraffes, antelopes,
          elephants, zebras, rhinoceros, and 
          cheetahs.
        </p>
        <p class="mb-1 mb-lg-3">
          My job is to feed them and look after 
          them every day. The Bandia reserve is 
          famous the world over and attracts 
          thousands of visitors every year.
        </p>
      `,
    },
    fr: {
      title: `La réserve de Bandia et  ses animaux sauvages`,
      content: `
        <p class="mb-1 mb-lg-3">
          Bonjour, je m'appelle Meghan 
          et je travaille à la réserve de Bandia. 
          Celle-ci offre une incroyable variété 
          de paysages naturels. Il y a des tigres, 
          des lions, des girafes, des antilopes,
          des éléphants, des zèbres, des rhinocéros 
          et des guépards.
        </p>
        <p class="mb-1 mb-lg-2">
          Mon travail consiste à les nourrir 
          et à m'occuper d'eux tous les jours. 
          La réserve de Bandia est célèbre dans 
          le monde entier et attire des milliers 
          de visiteurs chaque année.
        </p>
      `,
    },
  },
  pets: {
    en: {
      title: `The Pet Shop
        <button id="speaker-button" class="btn-icon p-0 m-0">
          <i class="fas fa-volume-up"></i>
        </button>`,
      content: `
         <p class="mb-1 mb-lg-3">
            Hi, my name is Samantha and I work in a 
            pet shop in Liverpool city centre. We sell 
            all sorts of pets such as canaries, turtles,
            parrots, hamsters, goldfish and rabbits, 
            but dogs and cats are our biggest sellers.
          </p>
          <p class="mb-1 mb-lg-3">
            They are particularly popular with 
            children. I love advising them because 
            they are curious to know how best to 
            look after their pets.
          </p>
      `,
    },
    fr: {
      title: `L’animalerie`,
      content: `
        <p class="mb-1 mb-lg-3">
          Bonjour, je m'appelle Samantha 
          et je travaille dans une animalerie 
          du centre ville de Liverpool. 
          Nous vendons toutes sortes d'animaux de 
          compagnie, comme des canaris, des
          tortues, des perroquets, des hamsters, 
          des poissons rouges et des lapins, 
          mais ce sont les chiens et les chats 
          qui se vendent le mieux. 
        </p>
        <p class="mb-1 mb-lg-2">
          Ils sont particulièrement populaires 
          auprès des enfants. J'aime les conseiller 
          car ils sont curieux de savoir comment 
          s'occuper au mieux de leurs animaux. 
        </p>
      `,
    },
  },
};

$(document).ready(function () {
  function setContent() {
    const storyId = $("body").data("story");
    const $h1 = $("h1.story-header");
    const $p = $("#homepage-story-text");
    const $button = $("#language-toggle");

    const currentLang = "en";

    const title = translations[storyId][currentLang]["title"];
    const content = translations[storyId][currentLang]["content"];

    $h1.html(title);
    $p.html(content);

    $button.text("French version");
    $button.data("lang", currentLang);

    $('#speaker-button').on("click", function () {
      playSound(
        `./audio/story/${storyId}.mp3`
      );
    });
  }

  setContent();

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

  $("#language-toggle").click(function (event) {
    event.preventDefault();
    const $button = $(this);
    const $h1 = $("h1.story-header");
    const $p = $("#homepage-story-text");

    const storyId = $("body").data("story");
    let currentLang = $button.data("lang") || "en";

    currentLang = currentLang === "en" ? "fr" : "en";
    $button.data("lang", currentLang);

    const title = translations[storyId][currentLang]["title"];
    const content = translations[storyId][currentLang]["content"];

    $h1.html(title);
    $p.html(content);

    $button.text(currentLang === "en" ? "French version" : "English version");

    if ($("audio").length !== 0) {
      $("audio")[0].pause();
    }

    $('#speaker-button').on("click", function () {
      playSound(
        `./audio/story/${storyId}.mp3`
      );
    });
  });

  function updateViewportHeight() {
    const vh = window.innerHeight * 0.01; 
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  updateViewportHeight();
  window.addEventListener('resize', updateViewportHeight);

});
