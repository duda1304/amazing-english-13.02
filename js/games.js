let currentPage;
let order = [];

const content = {
    "1" : [
        {
            "img" : "dog.svg",
            "en" : "dog",
            "fr" : "chien"
        },
        {
            "img" : "cat.svg",
            "en" : "cat",
            "fr" : "chat"
        },
        {
            "img" : "bag.svg",
            "en" : "bag",
            "fr" : "sac"
        },
        {
            "img" : "sun.svg",
            "en" : "sun",
            "fr" : "soleil"
        },
        {
            "img" : "bed.svg",
            "en" : "bed",
            "fr" : "lit"
        },
        {
            "img" : "girl.svg",
            "en" : "girl",
            "fr" : "fille"
        },
        {
            "img" : "bird.svg",
            "en" : "bird",
            "fr" : "oiseau"
        },
        {
            "img" : "vase.svg",
            "en" : "vase",
            "fr" : "vase"
        },
        {
            "img" : "sofa.svg",
            "en" : "sofa",
            "fr" : "canapé"
        },
        {
            "img" : "frog.svg",
            "en" : "frog",
            "fr" : "grenouille"
        }
    ],
    "2" : [
        {
            "en" : "red",
            "fr" : "rouge"
        },
        {
            "en" : "ear",
            "fr" : "oreille"
        },
        {
            "en" : "nut",
            "fr" : "noix"
        },
        {
            "en" : "oil",
            "fr" : "huile"
        },
        {
            "en" : "pie",
            "fr" : "tarte"
        },
        {
            "en" : "tea",
            "fr" : "thé"
        },
        {
            "en" : "box",
            "fr" : "boîte"
        },
        {
            "en" : "ant",
            "fr" : "fourmi"
        },
        {
            "en" : "bin",
            "fr" : "poubelle"
        },
        {
            "en" : "boy",
            "fr" : "garçon"
        },
    ],
    "3" : [
        {
            "en" : "knee",
            "fr" : "genou"
        },
        {
            "en" : "milk",
            "fr" : "lait"
        },
        {
            "en" : "snow",
            "fr" : "neige"
        },
        {
            "en" : "zero",
            "fr" : "zéro"
        },
        {
            "en" : "neck",
            "fr" : "cou"
        },
        {
            "en" : "moon",
            "fr" : "lune"
        },
        {
            "en" : "bowl",
            "fr" : "bol"
        },
        {
            "en" : "tree",
            "fr" : "arbre"
        },
        {
            "en" : "leaf",
            "fr" : "feuille"
        },
        {
            "en" : "boat",
            "fr" : "bateau"
        },
    ],
    "4" : [
        {
            "en" : "glass",
            "fr" : "verre"
        },
        {
            "en" : "berry",
            "fr" : "baie"
        },
        {
            "en" : "horse",
            "fr" : "cheval"
        },
        {
            "en" : "green",
            "fr" : "vert"
        },
        {
            "en" : "brain",
            "fr" : "cerveau"
        },
        {
            "en" : "house",
            "fr" : "maison"
        },
        {
            "en" : "apple",
            "fr" : "pomme"
        },
        {
            "en" : "chair",
            "fr" : "chaise"
        },
        {
            "en" : "knife",
            "fr" : "couteau"
        },
        {
            "en" : "plane",
            "fr" : "avion"
        },
    ],
    "5" : [
        {
            "en" : "lamb",
            "fr" : "agneau"
        },
        {
            "en" : "goat",
            "fr" : "chèvre"
        },
        {
            "en" : "doll",
            "fr" : "poupée"
        },
        {
            "en" : "lion",
            "fr" : "lion"
        },
        {
            "en" : "head",
            "fr" : "tête"
        },
        {
            "en" : "bell",
            "fr" : "cloche"
        },
        {
            "en" : "desk",
            "fr" : "bureau"
        },
        {
            "en" : "half",
            "fr" : "moitié"
        },
        {
            "en" : "bank",
            "fr" : "banque"
        },
        {
            "en" : "hand",
            "fr" : "main"
        },
    ],
    "6" : [
        {
            "en" : "seven",
            "fr" : "sept"
        },
        {
            "en" : "shark",
            "fr" : "requin"
        },
        {
            "en" : "mouse",
            "fr" : "souris"
        },
        {
            "en" : "watch",
            "fr" : "montre"
        },
        {
            "en" : "stamp",
            "fr" : "timbre"
        },
        {
            "en" : "snake",
            "fr" : "serpent"
        },
        {
            "en" : "dress",
            "fr" : "robe"
        },
        {
            "en" : "beach",
            "fr" : "plage"
        },
        {
            "en" : "birth",
            "fr" : "naissance"
        },
        {
            "en" : "enemy",
            "fr" : "ennemi"
        }
    ],
    "7" : [
        {
            "en" : "island",
            "fr" : "île"
        },
        {
            "en" : "turtle",
            "fr" : "tortue"
        },
        {
            "en" : "flower",
            "fr" : "fleur"
        },
        {
            "en" : "violin",
            "fr" : "violon"
        },
        {
            "en" : "rabbit",
            "fr" : "lapin"
        },
        {
            "en" : "cherry",
            "fr" : "cerise"
        },
        {
            "en" : "donkey",
            "fr" : "âne"
        },
        {
            "en" : "corner",
            "fr" : "angle"
        },
        {
            "en" : "bottle",
            "fr" : "bouteille"
        },
        {
            "en" : "fabric",
            "fr" : "tissu"
        }
    ],
    "8" : [
        {
            "img" : "car.svg",
            "en" : "car",
            "fr" : "voiture"
        },
        {
            "img" : "leg.svg",
            "en" : "leg",
            "fr" : "jambe"
        },
        {
            "img" : "pig.svg",
            "en" : "pig",
            "fr" : "cochon"
        },
        {
            "img" : "eye.svg",
            "en" : "eye",
            "fr" : "œil"
        },
        {
            "img" : "cow.svg",
            "en" : "cow",
            "fr" : "vache"
        },
        {
            "img" : "book.svg",
            "en" : "book",
            "fr" : "livre"
        },
        {
            "img" : "baby.svg",
            "en" : "baby",
            "fr" : "bébé"
        },
        {
            "img" : "bear.svg",
            "en" : "bear",
            "fr" : "ours"
        },
        {
            "img" : "coat.svg",
            "en" : "coat",
            "fr" : "manteau"
        },
        {
            "img" : "duck.svg",
            "en" : "duck",
            "fr" : "canard"
        }
    ],
    "9" : [
        {
            "en" : "plate",
            "fr" : "assiette"
        },
        {
            "en" : "queen",
            "fr" : "reine"
        },
        {
            "en" : "table",
            "fr" : "table"
        },
        {
            "en" : "clock",
            "fr" : "horloge"
        },
        {
            "en" : "tiger",
            "fr" : "tigre"
        },
        {
            "en" : "mouth",
            "fr" : "bouche"
        },
        {
            "en" : "plant",
            "fr" : "plante"
        },
        {
            "en" : "bread",
            "fr" : "pain"
        },
        {
            "en" : "belly",
            "fr" : "ventre"
        },
        {
            "en" : "phone",
            "fr" : "téléphone"
        }
    ],
    "10" : [
        {
            "en" : "family",
            "fr" : "famille"
        },
        {
            "en" : "tractor",
            "fr" : "tracteur"
        },
        {
            "en" : "farmer",
            "fr" : "fermier"
        },
        {
            "en" : "pillow",
            "fr" : "oreiller"
        },
        {
            "en" : "elephant",
            "fr" : "éléphant"
        },
        {
            "en" : "bicycle",
            "fr" : "vélo"
        },
        {
            "en" : "favourite",
            "fr" : "préféré"
        },
        {
            "en" : "butterfly",
            "fr" : "papillon"
        },
        {
            "en" : "health",
            "fr" : "santé"
        },
        {
            "en" : "behaviour",
            "fr" : "comportement"
        }
    ],
    "11" : [
        {
            "img" : "ant.svg",
            "en" : "ant",
            "fr" : "fourmi"
        },
        {
            "img" : "arm.svg",
            "en" : "arm",
            "fr" : "bras"
        },
        {
            "img" : "axe.svg",
            "en" : "axe",
            "fr" : "hache"
        },
        {
            "img" : "bee.svg",
            "en" : "bee",
            "fr" : "abeille"
        },
        {
            "img" : "bib.svg",
            "en" : "bib",
            "fr" : "bavoir"
        },
        {
            "img" : "bus.svg",
            "en" : "bus",
            "fr" : "bus"
        },
        {
            "img" : "can.svg",
            "en" : "can",
            "fr" : "canette"
        },
        {
            "img" : "cap.svg",
            "en" : "cap",
            "fr" : "casquette"
        },
        {
            "img" : "egg.svg",
            "en" : "egg",
            "fr" : "œuf"
        },
        {
            "img" : "elk.svg",
            "en" : "elk",
            "fr" : "élan"
        }
    ],
    "12" : [
        {
            "img" : "bell.svg",
            "en" : "bell",
            "fr" : "cloche"
        },
        {
            "img" : "bike.svg",
            "en" : "bike",
            "fr" : "vélo"
        },
        {
            "img" : "boot.svg",
            "en" : "boot",
            "fr" : "botte"
        },
        {
            "img" : "bulb.svg",
            "en" : "bulb",
            "fr" : "ampoule"
        },
        {
            "img" : "cake.svg",
            "en" : "cake",
            "fr" : "gâteau"
        },
        {
            "img" : "corn.svg",
            "en" : "corn",
            "fr" : "maïs"
        },
        {
            "img" : "crab.svg",
            "en" : "crab",
            "fr" : "crabe"
        },
        {
            "img" : "desk.svg",
            "en" : "desk",
            "fr" : "bureau"
        },
        {
            "img" : "dice.svg",
            "en" : "dice",
            "fr" : "dé"
        },
        {
            "img" : "doll.svg",
            "en" : "doll",
            "fr" : "poupée"
        }
    ],
    "13" : [
        {
            "img" : "witch.svg",
            "en" : "witch",
            "fr" : "sorcière"
        },
        {
            "img" : "three.svg",
            "en" : "three",
            "fr" : "trois"
        },
        {
            "img" : "olive.svg",
            "en" : "olive",
            "fr" : "olive"
        },
        {
            "img" : "happy.svg",
            "en" : "happy",
            "fr" : "heureux"
        },
        {
            "img" : "angel_1.svg",
            "en" : "angel",
            "fr" : "ange"
        },
        {
            "img" : "eagle.svg",
            "en" : "eagle",
            "fr" : "aigle"
        },
        {
            "img" : "train.svg",
            "en" : "train",
            "fr" : "train"
        },
        {
            "img" : "camel.svg",
            "en" : "camel",
            "fr" : "chameau"
        },
        {
            "img" : "spoon.svg",
            "en" : "spoon",
            "fr" : "cuillère"
        },
        {
            "img" : "whisk.svg",
            "en" : "whisk",
            "fr" : "fouet"
        }
    ],
    "14" : [
        {
            "img" : "fly.svg",
            "en" : "fly",
            "fr" : "mouche"
        },
        {
            "img" : "hat.svg",
            "en" : "hat",
            "fr" : "chapeau"
        },
        {
            "img" : "hen.svg",
            "en" : "hen",
            "fr" : "poule"
        },
        {
            "img" : "hut.svg",
            "en" : "hut",
            "fr" : "cabane"
        },
        {
            "img" : "ice.svg",
            "en" : "ice",
            "fr" : "glace"
        },
        {
            "img" : "key.svg",
            "en" : "key",
            "fr" : "clé"
        },
        {
            "img" : "lip.svg",
            "en" : "lip",
            "fr" : "lèvre"
        },
        {
            "img" : "mat.svg",
            "en" : "mat",
            "fr" : "tapis"
        },
        {
            "img" : "mug.svg",
            "en" : "mug",
            "fr" : "grande tasse"
        },
        {
            "img" : "one.svg",
            "en" : "one",
            "fr" : "un"
        }
    ],
    "15" : [
        {
          "en": "day",
          "fr": "jour"
        },
        {
          "en": "fog",
          "fr": "brouillard"
        },
        {
          "en": "ink",
          "fr": "encre"
        },
        {
          "en": "jam",
          "fr": "confiture"
        },
        {
          "en": "man",
          "fr": "homme"
        },
        {
          "en": "nap",
          "fr": "sieste"
        },
        {
          "en": "net",
          "fr": "filet"
        },
        {
          "en": "owl",
          "fr": "hibou"
        },
        {
          "en": "pan",
          "fr": "poêle"
        },
        {
          "en": "toy",
          "fr": "jouet"
        }
       ],
    "16" : [
        {
          "en": "ball",
          "fr": "balle"
        },
        {
          "en": "bath",
          "fr": "baignoire"
        },
        {
          "en": "belt",
          "fr": "ceinture"
        },
        {
          "en": "bone",
          "fr": "os"
        },
        {
          "en": "coin",
          "fr": "pièce de monnaie"
        },
        {
          "en": "fire",
          "fr": "feu"
        },
        {
          "en": "foam",
          "fr": "mousse"
        },
        {
          "en": "fork",
          "fr": "fourchette"
        },
        {
          "en": "gold",
          "fr": "or"
        },
        {
          "en": "sand",
          "fr": "sable"
        }
       ],
    "17" : [
        {
          "en": "beach",
          "fr": "plage"
        },
        {
          "en": "brain",
          "fr": "cerveau"
        },
        {
          "en": "brush",
          "fr": "brosse"
        },
        {
          "en": "clock",
          "fr": "horloge"
        },
        {
          "en": "crown",
          "fr": "couronne"
        },
        {
          "en": "flake",
          "fr": "flocon"
        },
        {
          "en": "glove",
          "fr": "gant"
        },
        {
          "en": "green",
          "fr": "vert"
        },
        {
          "en": "snake",
          "fr": "serpent"
        },
        {
          "en": "whale",
          "fr": "baleine"
        }
       ],
    "18" : [
        {
          "en": "airplane",
          "fr": "avion"
        },
        {
          "en": "armchair",
          "fr": "fauteuil"
        },
        {
          "en": "blueberry",
          "fr": "myrtille"
        },
        {
          "en": "button",
          "fr": "bouton"
        },
        {
          "en": "dolphin",
          "fr": "dauphin"
        },
        {
          "en": "envelope",
          "fr": "enveloppe"
        },
        {
          "en": "guitar",
          "fr": "guitare"
        },
        {
          "en": "hamster",
          "fr": "hamster"
        },
        {
          "en": "pencil",
          "fr": "crayon"
        },
        {
          "en": "tomato",
          "fr": "tomate"
        }
       ],
    "19" : [
        {
          "en": "ant",
          "fr": "fourmi"
        },
        {
          "en": "axe",
          "fr": "hache"
        },
        {
          "en": "bat",
          "fr": "chauve-souris"
        },
        {
          "en": "cup",
          "fr": "tasse"
        },
        {
          "en": "day",
          "fr": "jour"
        },
        {
          "en": "elf",
          "fr": "lutin"
        },
        {
          "en": "fan",
          "fr": "ventillateur"
        },
        {
          "en": "fox",
          "fr": "renard"
        },
        {
          "en": "tag",
          "fr": "étiquette"
        },
        {
          "en": "ten",
          "fr": "dix"
        }
       ],
    "20" : [
        {
          "en": "bean",
          "fr": "haricot"
        },
        {
          "en": "deer",
          "fr": "cerf"
        },
        {
          "en": "easy",
          "fr": "facile"
        },
        {
          "en": "fire",
          "fr": "feu"
        },
        {
          "en": "five",
          "fr": "cinq"
        },
        {
          "en": "foot",
          "fr": "pied"
        },
        {
          "en": "gift",
          "fr": "cadeau"
        },
        {
          "en": "goat",
          "fr": "chèvre"
        },
        {
          "en": "hand",
          "fr": "main"
        },
        {
          "en": "swan",
          "fr": "cygne"
        }
       ],
    "21" :[
        {
          "en": "baker",
          "fr": "boulanger"
        },
        {
          "en": "candy",
          "fr": "bonbon"
        },
        {
          "en": "eagle",
          "fr": "aigle"
        },
        {
          "en": "earth",
          "fr": "terre"
        },
        {
          "en": "flake",
          "fr": "flocon"
        },
        {
          "en": "lemon",
          "fr": "citron"
        },
        {
          "en": "lorry",
          "fr": "camion"
        },
        {
          "en": "shirt",
          "fr": "chemise"
        },
        {
          "en": "thumb",
          "fr": "pouce"
        },
        {
          "en": "witch",
          "fr": "sorcière"
        }
       ],
    "22" : [
        {
          "en": "airplane",
          "fr": "avion"
        },
        {
          "en": "armchair",
          "fr": "fauteuil"
        },
        {
          "en": "bottle",
          "fr": "bouteille"
        },
        {
          "en": "chicken",
          "fr": "poulet"
        },
        {
          "en": "chocolate",
          "fr": "chocolat"
        },
        {
          "en": "dolphin",
          "fr": "dauphin"
        },
        {
          "en": "eraser",
          "fr": "gomme"
        },
        {
          "en": "flower",
          "fr": "fleur"
        },
        {
          "en": "hammer",
          "fr": "marteau"
        },
        {
          "en": "shoulder",
          "fr": "épaule"
        }
       ],
    "23" : [
        {
            "img" : "owl.svg",
            "en": "owl",
            "fr": "hibou"
        },
        {
            "img": "pan.svg",
            "en": "pan",
            "fr": "poêle"
        },
        {
            "img" : "pen.svg",
            "en": "pen",
            "fr": "stylo"
        },
        {
            "img": "rat.svg",
            "en": "rat",
            "fr": "rat"
        },
        {
            "img": "sad.svg",
            "en": "sad",
            "fr": "triste"
        },
        {
            "img": "six.svg",
            "en": "six",
            "fr": "six"
        },
        {
            "img": "tie.svg",
            "en": "tie",
            "fr": "cravate"
        },
        { 
            "img": "top.svg",
            "en": "top",
            "fr": "toupie"
        },
        {
            "img": "van.svg",    
            "en": "van",
            "fr": "van"
        },
        {
            "img" : "web.svg",
            "en": "web",
            "fr": "toile"
        }
       ],
    "24" : [
        {
            "img": "door.svg",
            "en": "door",
            "fr": "porte"
        },
        {
            "img": "fish.svg",
            "en": "fish",
            "fr": "poisson"
        },
        {
            "img": "five.svg",
            "en": "five",
            "fr": "cinq"
        },
        {
            "img": "gift.svg",
            "en": "gift",
            "fr": "cadeau"
        },
        {
            "img": "hand.svg",
            "en": "hand",
            "fr": "main"
        },
        {
            "img": "king.svg",
            "en": "king",
            "fr": "roi"
        },
        {
            "img": "kite.svg",
            "en": "kite",
            "fr": "cerf-volant"
        },
        {
            "img": "lamp.svg",
            "en": "lamp",
            "fr": "lampe"
        },
        {
            "img": "nose.svg",
            "en": "nose",
            "fr": "nez"
        },
        {
            "img": "oven.svg",
            "en": "oven",
            "fr": "four"
        }
       ],
    "25" : [
        {
            "img": "rain.svg",
          "en": "rain",
          "fr": "pluie"
        },
        {
            "img": "ring.svg",
          "en": "ring",
          "fr": "bague"
        },
        {
            "img": "road.svg",
          "en": "road",
          "fr": "route"
        },
        {
            "img": "roof.svg",
          "en": "roof",
          "fr": "toit"
        },
        {
            "img": "shoe.svg",
          "en": "shoe",
          "fr": "chaussure"
        },
        {
            "img": "soap.svg",
          "en": "soap",
          "fr": "savon"
        },
        {
            "img": "star.svg",
          "en": "star",
          "fr": "étoile"
        },
        {
            "img": "swan.svg",
          "en": "swan",
          "fr": "cygne"
        },
        {
            "img": "tent.svg",
          "en": "tent",
          "fr": "tente"
        },
        {
            "img": "wolf.svg",
          "en": "wolf",
          "fr": "loup"
        }
       ],
    "26" : [
        {
            "img": "dress.svg",
          "en": "dress",
          "fr": "robe"
        },
        {
            "img": "ghost.svg",
          "en": "ghost",
          "fr": "fantôme"
        },
        {
            "img": "ruler.svg",
          "en": "ruler",
          "fr": "règle"
        },
        {
            "img": "robot.svg",
          "en": "robot",
          "fr": "robot"
        },
        {
            "img": "phone.svg",
          "en": "phone",
          "fr": "téléphone"
        },
        {
            "img": "black.svg",
          "en": "black",
          "fr": "noir"
        },
        {
            "img": "plant.svg",
          "en": "plant",
          "fr": "plante"
        },
        {
            "img": "beach.svg",
          "en": "beach",
          "fr": "plage"
        },
        {
            "img": "bench.svg",
          "en": "bench",
          "fr": "banc"
        },
        {
            "img": "thumb.svg",
          "en": "thumb",
          "fr": "pouce "
        }
       ],
    "27" : [
        {
          "en": "oak",
          "fr": "chêne"
        },
        {
          "en": "fox",
          "fr": "renard"
        },
        {
          "en": "hen",
          "fr": "poule"
        },
        {
          "en": "paw",
          "fr": "patte"
        },
        {
          "en": "sky",
          "fr": "ciel"
        },
        {
          "en": "tag",
          "fr": "étiquette"
        },
        {
          "en": "tap",
          "fr": "robinet"
        },
        {
          "en": "ten",
          "fr": "dix"
        },
        {
          "en": "toy",
          "fr": "jouet"
        },
        {
          "en": "wig",
          "fr": "perruque"
        }
       ],
    "28" : [
        {
          "en": "gold",
          "fr": "or"
        },
        {
          "en": "bean",
          "fr": "haricot"
        },
        {
          "en": "easy",
          "fr": "facile"
        },
        {
          "en": "line",
          "fr": "ligne"
        },
        {
          "en": "mask",
          "fr": "masque"
        },
        {
          "en": "rice",
          "fr": "riz"
        },
        {
          "en": "shop",
          "fr": "magasin"
        },
        {
          "en": "sock",
          "fr": "chaussette"
        },
        {
          "en": "wave",
          "fr": "vague"
        },
        {
          "en": "wind",
          "fr": "vent"
        }
       ],
    "29" : [
        {
          "en": "night",
          "fr": "nuit"
        },
        {
          "en": "lemon",
          "fr": "citron"
        },
        {
          "en": "nurse",
          "fr": "infirmière"
        },
        {
          "en": "onion",
          "fr": "oignon"
        },
        {
          "en": "scarf",
          "fr": "écharpe"
        },
        {
          "en": "sheep",
          "fr": "mouton"
        },
        {
          "en": "teeth",
          "fr": "dent"
        },
        {
          "en": "watch",
          "fr": "montre"
        },
        {
          "en": "water",
          "fr": "eau"
        },
        {
          "en": "wheel",
          "fr": "roue"
        }
       ],
    "30" :[
        {
          "en": "jacket",
          "fr": "veste"
        },
        {
          "en": "needle",
          "fr": "aiguille"
        },
        {
          "en": "pineapple",
          "fr": "ananas"
        },
        {
          "en": "rainbow",
          "fr": "arc-en-ciel"
        },
        {
          "en": "rocket",
          "fr": "fusée"
        },
        {
          "en": "scissors",
          "fr": "ciseaux"
        },
        {
          "en": "shoulder",
          "fr": "épaule"
        },
        {
          "en": "trousers",
          "fr": "pantalon"
        },
        {
          "en": "tuesday",
          "fr": "mardi"
        },
        {
          "en": "umbrella",
          "fr": "parapluie"
        }
       ],
    "31" : [
        {
          "en": "hen",
          "fr": "poule"
        },
        {
          "en": "fog",
          "fr": "brouillard"
        },
        {
          "en": "ink",
          "fr": "encre"
        },
        {
          "en": "jaw",
          "fr": "machoire"
        },
        {
          "en": "map",
          "fr": "carte"
        },
        {
          "en": "new",
          "fr": "nouveau"
        },
        {
          "en": "owl",
          "fr": "hibou"
        },
        {
          "en": "pan",
          "fr": "poêle"
        },
        {
          "en": "pen",
          "fr": "stylo"
        },
        {
          "en": "rug",
          "fr": "tapis"
        }
       ],
    "32" : [
        {
          "en": "gold",
          "fr": "or"
        },
        {
          "en": "bike",
          "fr": "vélo"
        },
        {
          "en": "lamp",
          "fr": "lampe"
        },
        {
          "en": "leaf",
          "fr": "feuille"
        },
        {
          "en": "moon",
          "fr": "lune"
        },
        {
          "en": "pool",
          "fr": "piscine"
        },
        {
          "en": "sand",
          "fr": "sable"
        },
        {
          "en": "shoe",
          "fr": "chaussure"
        },
        {
          "en": "sink",
          "fr": "évier"
        },
        {
          "en": "wind",
          "fr": "vent"
        }
       ],
    "33" : [
        {
          "en": "skirt",
          "fr": "jupe"
        },
        {
          "en": "brain",
          "fr": "cerveau"
        },
        {
          "en": "glove",
          "fr": "gant"
        },
        {
          "en": "snail",
          "fr": "escargot"
        },
        {
          "en": "snake",
          "fr": "serpent"
        },
        {
          "en": "tiger",
          "fr": "tigre"
        },
        {
          "en": "towel",
          "fr": "serviette"
        },
        {
          "en": "watch",
          "fr": "montre"
        },
        {
          "en": "whale",
          "fr": "baleine"
        },
        {
          "en": "zebra",
          "fr": "zèbre"
        }
       ],
    "34" : [
        {
          "en": "parrot",
          "fr": "perroquet"
        },
        {
          "en": "jacket",
          "fr": "veste"
        },
        {
          "en": "needle",
          "fr": "aiguille"
        },
        {
          "en": "pencil",
          "fr": "crayon"
        },
        {
          "en": "pineapple",
          "fr": "ananas"
        },
        {
          "en": "rabbit",
          "fr": "lapin"
        },
        {
          "en": "rocket",
          "fr": "fusée"
        },
        {
          "en": "strawberry",
          "fr": "fraise"
        },
        {
          "en": "tomato",
          "fr": "tomate"
        },
        {
          "en": "turtle",
          "fr": "tortue"
        }
       ]       
}

const levels = {
    "easy" : ["1", "2", "3", "4", "5", "6", "7", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22"],
    "hard" : ["8", "9", "10", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34"]
}

const userGames = [
    {
        "age" : [0,6],
        "games" : {
            "1" : "1",
            "2" : "11",
            "3" : "14",
            "4" : "12",
            "5" : "13",
            "6" : "8",
            "7" : "23",
            "8" : "24", 
            "9" : "25", 
            "10" : "26"
        }
    },
    {
        "age" : [7,9],
        "games" : {
            "1" : "2",
            "2" : "15",
            "3" : "3",
            "4" : "16",
            "5" : "4",
            "6" : "17",
            "7" : "18",
            "8" : "27",
            "9" : "28",
            "10" : "29",
            "11" : "9",
            "12" : "30"
        }
    },
    {
        "age" : [10,999],
        "games" : {
            "1" : "19",
            "2" : "5",
            "3" : "20",
            "4" : "6",
            "5" : "21", 
            "6" : "22",
            "7" : "7",
            "8" : "31",
            "9" : "32",
            "10" : "33",
            "11" : "10",
            "12" : "34"
        }
    }
]

const noMissingLetters = {
    "8" : 1,
    "9" : 2,
    "10" : 3,
    "23" : 1,
    "24" : 2,
    "25" : 2,
    "26" : 3,
    "27" : 1,
    "28" : 2,
    "29" : 3,
    "30" : 4,
    "31" : 1,
    "32" : 2,
    "33" : 3,
    "34" : 4
}

const description = {
    "easy" : {
        "description-en" : "Spell the following words in English then listen to the answers.",
        "description-fr" : "Épelle les mots suivants en anglais puis écoute les réponses.",
        "audio" : "SENTENCE 1"
    },
    "hard" : {
        "description-en" : "Find the missing letters in the following words by listening to their pronunciations.",
        "description-fr" : "Retrouve les lettres manquantes des mots suivants en écoutant leurs prononciations.",
        "audio" : "SENTENCE 2"
    }
}

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

let stateTemplate = {

}


async function setData(page) {
    const state = await getState();
    let template;
    if (state.code === 200 && levels.hard.includes(page)) {
        if (state.content === null) {
            const games = Object.values(userGames.find(element => userAge >= element.age[0] && userAge <= element.age[1])['games']);
            const gamesHardLevels = [];
           games.forEach(element => {
            if (levels.hard.includes(element)) {
                gamesHardLevels.push(element);
            }
           })
            gamesHardLevels.forEach(element => {
                stateTemplate[element] = {
                    "rate" : null,
                    "template" : null
                }
            })
            editState(stateTemplate);
        } else {
            stateTemplate = state.content;
        }
        if (stateTemplate[page].template !== null) {
            template = state.content[page].template;
        } 
    }
   
    $('.description-en').empty();
    $('.description-fr').empty();
    $('.content-div').empty();
    $('#image-map').empty();
    $('audio')[0].pause();
    $('.check-btn').remove();

    let level;

    $.each(levels, function(key, value) {
        if (value.includes(page)) {
            $('.description-en').html(`${description[key]['description-en']} <span><img class="audio-icon" src="./img/audio_icon.svg"></img></span>`)
            $('.description-fr').html(`${description[key]['description-fr']}`);
            level = key;

            $('.description-en').on('click', function() {
                playSound(description[key]['audio']);
            })
        }
    })
    
    if (template) {
        $('.content-div').append(template);
        $('p.active').on('input', function() {
            $(this).text($(this).text().charAt(0));
            $(this).removeClass('wrong');
        })
    } else {
        content[page].forEach(element => {
            let paragraph;
            
            if (level !== 'hard') {
                paragraph =  `<p>${element.en}</p>`;
            } else {
                paragraph = `${createRandomPuzzle(element.en, page)}`;
            }
            const longContent = ['9', '10', '26', '28', '29', '30', '32', '33', '34'];
            const adjustLargeScreen = ['9', '26', '28', '29', '32', '33'];
           
            let box_template = `<div class="${longContent.includes(page) ? 'col-auto' : 'col-2'} ${adjustLargeScreen.includes(page) ? 'col-xxl-2' : ''} d-flex flex-column align-items-center box text-center p-1 p-xl-2 me-2 mb-2 rounded-3" onclick="playSound('${element.en}')" data-page='${page}'>
                                    <div class="audio-icon align-self-end"></div>
                                    <div class="image ${!element.img ? 'd-none' : ''} ">
                                        ${element.img ? `<img src="./img/${element.img}" class="w-100 mb-xxl-2 mt-xxl-2"></img>` : ''}
                                    </div>
                                    <div class='word-en ${!element.img ? 'align-self-start' : ''}'>
                                        ${paragraph}
                                    </div>
                                    <small ${!element.img ? 'class="align-self-start text-start"' : ''}><i>${element.fr}</i></small>
                                </div>`;
                               
            const adjustButtonsFor = ['10', '26', '30', '34']
            if (adjustButtonsFor.includes(page)) {
              $('.navigation-buttons').addClass('navigation-buttons-one-row');
            }
            $('.content-div').append(box_template);
            $('p.active').on('input', function() {
                $(this).text($(this).text().charAt(0));
                $(this).removeClass('wrong');
            })
        })
    }
   

    if (level === 'hard') {
        $('.navigation-buttons').prepend(`<button class='btn rounded mt-2 ms-2 ms-lg-3 align-self-center check-btn' onclick="checkAnswers()">Check the answers</button>`)
    }
    
    currentPage = page;
    if (order.length === 0) order = Object.keys(content);

    $.each(letters, function(index, value){
        $('#image-map').append(`<div class="col-2" onclick="playSound('${value}')"></div>`)
    })
}

function playSound(src) {
    if (!e) var e = window.event;
    if (e) e.stopPropagation();
    const audio = document.getElementById('audio');
    audio.pause();
    if (src.includes('animation')) {
        $('#audio').attr('src', `audio/${src}`);
    } else {
        $('#audio').attr('src', `audio/${src.toUpperCase()}.wav`);
    }
    audio.play();
}

async function checkAnswers() {
    const audio = document.getElementById('audio');
    audio.pause();

    let count = 0;

    $.each($('.word-en'), function(index, value) {
        const page = $(this).parent().data('page');
        const answer = content[page][index]['en'].split('');
        
        $.each($(this).children(), function(index, value){
            if ($(value).hasClass('active')) {
                if (answer[index].toLowerCase() !== $(value).text().toLowerCase()) {
                    $(value).addClass('wrong');
                } else {
                    $(value).addClass('correct');
                    $(value).prop('contenteditable', false);
                }
            }
        });

        if ($(this).find('.wrong').length === 0) {
            count = count + 1;
        }
    });

    if (currentPage in stateTemplate) {
        stateTemplate[currentPage].rate = Math.round(count/$('.word-en').length * 100) / 100;
        await editState(stateTemplate);
    }
    if (count >= $('.word-en').length*0.8 && $('.navigation-buttons #see-answers').length === 0) {
            $(".navigation-buttons button:first-child").after(`<button class="btn btn-primary mt-2 ms-2 ms-lg-3" id="see-answers" onclick="showAnswers()">see answers</button>`);
    } 
    if ($("#next-button").css("display") == "none") {
      checkIfSublevelWon();
    }
}

function showAnswers() {
    $.each($('.word-en'), function(index, value) {
        const page = $(this).parent().data('page');
        const answer = content[page][index]['en'].split('');
        
        $.each($(this).children(), function(index, value){
            if ($(value).hasClass('active')) {
                if ($(value).hasClass('wrong')) {
                    $(value).text(answer[index]);
                    $(value).removeClass('wrong');
                    $(value).addClass('correct');
                    $(value).prop('contenteditable', false);
                }
            }
        });
    });
}

function getOverallRate() {
  let overallRate = 0;
  let count = 0;
  for(let key in stateTemplate) {
    if(stateTemplate[key].rate !== null) {
      overallRate = overallRate + stateTemplate[key].rate;
      count  = count + 1;
    }
  }
  return Math.round(overallRate*100/count);
}

async function checkIfSublevelWon() {
    checkUserToken()
    .then(response => {
        if (response.code === 200) {
          if (!response.sublevels.includes(1)) {
            const overallRate = getOverallRate();
            if (overallRate >= 80) {
              startRewardAnimation();
              saveResult(response);
            } else {
              $('#message-modal #rate').text(getOverallRate());
              $('#message-modal').modal('show');
            }
          }
        } else {
            window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + '/index.html';
        }
    })
}

async function saveResult(data) {
    data['sublevels'].push(1);
    saveGameResult(data.level, data['sublevels'], data.age)
    .then(response => {
        localStorage.setItem('showCongratsMessage', response.showCongratsMessage);
    })
}

async function startRewardAnimation() {
        $('#reward-modal').modal('show');
        playSound('feed your animal-animation.mp3');
        $('#reward-modal #avatar-icon').attr('src', `./img/${localStorage.getItem('avatar')}-icon.svg`);
        $('#reward-modal #avatar').attr('src', `./img/${localStorage.getItem('avatar')}.png`);
        tsParticles.load("tsparticles", {
            "fullScreen": {
            "zIndex": 1
            },
            "emitters": [
            {
                "position": {
                "x": 0,
                "y": 30
                },
                "rate": {
                "quantity": 5,
                "delay": 0.15
                },
                "particles": {
                "move": {
                    "direction": "top-right",
                    "outModes": {
                    "top": "none",
                    "left": "none",
                    "default": "destroy"
                    }
                }
                }
            },
            {
                "position": {
                "x": 100,
                "y": 30
                },
                "rate": {
                "quantity": 5,
                "delay": 0.15
                },
                "particles": {
                "move": {
                    "direction": "top-left",
                    "outModes": {
                    "top": "none",
                    "right": "none",
                    "default": "destroy"
                    }
                }
                }
            }
            ],
            "particles": {
            "color": {
                "value": [
                "#ffffff",
                "#00a864",
                "#edf50f",
                "#286fb5",
                "#f50fe2"
                ]
            },
            "move": {
                "decay": 0.05,
                "direction": "top",
                "enable": true,
                "gravity": {
                "enable": true
                },
                "outModes": {
                "top": "none",
                "default": "destroy"
                },
                "speed": {
                "min": 10,
                "max": 50
                }
            },
            "number": {
                "value": 0
            },
            "opacity": {
                "value": 1
            },
            "rotate": {
                "value": {
                "min": 0,
                "max": 360
                },
                "direction": "random",
                "animation": {
                "enable": true,
                "speed": 30
                }
            },
            "tilt": {
                "direction": "random",
                "enable": true,
                "value": {
                "min": 0,
                "max": 360
                },
                "animation": {
                "enable": true,
                "speed": 30
                }
            },
            "size": {
                "value": {
                "min": 5,
                "max": 10
                },
                "animation": {
                "enable": true,
                "startValue": "min",
                "count": 1,
                "speed": 16,
                "sync": true
                }
            },
            "roll": {
                "darken": {
                "enable": true,
                "value": 25
                },
                "enable": true,
                "speed": {
                "min": 5,
                "max": 15
                }
            },
            "wobble": {
                "distance": 30,
                "enable": true,
                "speed": {
                "min": -7,
                "max": 7
                }
            },
            "shape": {
                "type": [
                "circle",
                "square"
                ],
                "options": {}
            }
            }
        });
        
        const input = document.querySelector("input");
        const label = document.querySelector("label");
        document.body.style.setProperty("--dynamicIconImage", `url("./img/${localStorage.getItem('avatar')}-icon.svg")`);
        document.body.style.setProperty("--dynamicAvatarImage", `url("./img/${localStorage.getItem('avatar')}.png")`);

        input.addEventListener("input", event => {
        const value = Number(input.value) / 100;
       
        $('#animation-text').css('margin-left', value*80 +  '%');
        avatar.style.opacity = value + 0.2;

        if (value === 1) {
            playSound('yummi-animation.mp3');
        }
        });

        $('#reward-modal').on('hidden.bs.modal', function (event) {
            const container = tsParticles.domItem(0);
            $('#reward-modal').modal('hide');
            container.plugins.get("emitters").array[0].pause();
            container.plugins.get("emitters").array[1].pause();
            input.value = 0;
            $('#avatar').css('opacity', 0.2);
            $('#animation-text').css('margin-left', '0');
            const audio = document.getElementById('audio');
            audio.pause();
        })
}

function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

function createRandomPuzzle(string, page) {
    const characters = string.split('');
    let randomIndexes = [];
  
    if (noMissingLetters[page] === 1) {
        randomIndexes.push(Math.floor(Math.random() * characters.length));
    }
    else {
        let index = 0;
        while (randomIndexes.length < noMissingLetters[page]) {
            
                index  = Math.floor(Math.random() * characters.length);
                if (!randomIndexes.includes(index)) {
                randomIndexes.push(index);
            }
        }
    }

    let paragraphs = ``;

    characters.forEach((value, index) => {
        paragraphs = paragraphs + `<p class='rounded mb-1 ${randomIndexes.includes(index) ? 'active' : 'not-active'}' ${randomIndexes.includes(index) ? 'contenteditable' : ''} ${randomIndexes.includes(index) ? `onclick="playSound('${value.trim()}')"` : ''}>${randomIndexes.includes(index) ? '' : value}</p>`
    })

    return paragraphs;
}

async function setNext() {
    const nextPage = getNextPage();
    if (currentPage in stateTemplate) {
        stateTemplate[currentPage].template = $('.content-div').html();
        await editState(stateTemplate);
    }
    window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + `/alphabet_game${nextPage}.html`;
}

async function setPrev() {
    if (currentPage in stateTemplate) {
        stateTemplate[currentPage].template = $('.content-div').html();
        await editState(stateTemplate);
    }
    history.go(-1); 
    return false;
}

function getNextPage() {
    return (parseInt(gameNo) + 1).toString();
}

let gameNo;
let userAge;

async function checkUser() {
    checkToken()
    .then(response => {
        if (response.code === 200) {
            checkUserToken()
            .then(response => {
                if (response.code === 200) {
                    let count = 0;
                    // gameNo = window.location.pathname.substring(0, window.location.pathname.indexOf('.')).slice(-1);
                    const r = /\d+/;
                    gameNo = window.location.pathname.match(r);
                    localStorage.setItem('avatar', response.avatar);
                    localStorage.setItem('age', response.age);
                    userAge = response.age;
                    $.each(userGames, function() {
                        if (response.age >= this.age[0] && response.age <= this.age[1] && gameNo in this.games) {
                            count = count + 1;
                            setData(this.games[gameNo]);
                            if (parseInt(gameNo) + 1 in this.games) {
                                $('#next-button').show();
                            } else {
                                $('#next-button').hide();
                            }
                        } 
                    });
                    if (count === 0) {
                        window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + '/index.html';
                    }
                } else {
                    window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + '/index.html';
                }
            })
        } else {
            window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + '/index.html';
        }
    })
}

function goHome() {
    window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf("/")) + '/games.html';
}

$('#message-modal button').on('click', function() {
  goHome();
});


window.onload = function() {checkUser();}

