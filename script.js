// Player variables
let xp = 0; // Experience points
let health = 100; // Player's health
let kyberCrystals = 50; // Currency
let currentWeapon = 0; // Index of the current weapon in the inventory
let fighting; // Index of the current monster being fought
let monsterHealth; // Health of the current monster
let inventory = ["staff"]; // Player's inventory with a default weapon

// HTML elements
const attackSound = new Audio('./audio/attack.wav');
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const kyberCrystalText = document.querySelector("#kyberCrystalText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Weapon and monster data
const weapons = [
  { name: 'staff', power: 3 },
  { name: 'blaster rifle', power: 10 },
  { name: 'bowcaster', power: 30 },
  { name: 'lightsaber', power: 100 }
];

const monsters = [
  {
    name: "Tusken Raider",
    level: 2,
    health: 15
  },
  {
    name: "Rancor",
    level: 10,
    health: 100
  },
  {
    name: "Krayt Dragon",
    level: 20,
    health: 500
  }
];

// Location data
const locations = [
  {
    name: "Mos Eisley Town Square",
    "button text": ["Go to the market 💰", "Explore the Desert 🏜️", "Fight the Krayt Dragon 🐉"],
    "button functions": [goMarket, exploreDesert, fightKraytDragon],
    text: "You are in the Mos Eisley Town Square. You see a sign that says \"Market\". Enter the market to recover your health and get better weapons."
  },
  {
    name: "Market",
    "button text": ["Buy 10 health (10 Kyber Crystals) 💊", "Buy weapon (30 Kyber Crystals) 🗡️", "Return to Town Square 🕌"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the market. Here you can buy more health and obtain better weapons. One may even grant you the abilities of a Jedi..."
  },
  {
    name: "Desert",
    "button text": ["Fight Tusken Raider 👹", "Fight Rancor 🦖", "Return to Town Square 🕌"],
    "button functions": [fightTuskenRaider, fightRancor, goTown],
    text: "You enter the desert. You see some monsters."
  },
  {
    name: "Fight",
    "button text": ["Attack ⚔️", "Dodge 🏃", "Run 🏃‍♂️"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "Defeat Monster",
    "button text": ["Return to Town Square 🕌", "Return to Town Square 🕌", "Return to Town Square 🕌"],
    "button functions": [goTown, goTown, goTown],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find Kyber Crystals.'
  },
  {
    name: "Lose",
    "button text": ["REPLAY? 🔁", "REPLAY? 🔁", "REPLAY? 🔁"],
    "button functions": [restart, restart, restart],
    text: "You are defeated. ☠️"
  },
  { 
    name: "Win", 
    "button text": ["REPLAY? 🔁", "REPLAY? 🔁", "REPLAY? 🔁"], 
    "button functions": [restart, restart, restart], 
    text: "You defeated the Krayt Dragon! YOU WIN THE GAME! 🎉" 
  }
];

// Initialize buttons
button1.onclick = goMarket;
button2.onclick = exploreDesert;
button3.onclick = fightKraytDragon;

// Function to update UI based on current location
function update(location) {
  // Hide monster stats by default
  monsterStats.style.display = "none";

  // Update button text and functions
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;

  // Change image based on location
  if (location.name === "Mos Eisley Town Square") {
    locationImage.src = "./assets/town_square.jpg";
  } else if (location.name === "Market") {
    locationImage.src = "./assets/market.jpg";
  } else if (location.name === "Desert") {
    locationImage.src = "./assets/desert.jpg";
  } else if (location.name === "Fight") {
    locationImage.src = "./assets/fight.jpg";
  } else if (location.name === "Defeat Monster") {
    locationImage.src = "./assets/defeat_monster.jpg";
  } else if (location.name === "Lose") {
    locationImage.src = "./assets/lose.jpg";
  } else if (location.name === "Win") {
    locationImage.src = "./assets/victory.jpg";
  }   
}

// Functions for different locations
function goTown() {
  update(locations[0]);
}

function goMarket() {
  update(locations[1]);
}

function exploreDesert() {
  update(locations[2]);
}

// Function to buy health
function buyHealth() {
  // Check if the player has enough currency
  if (kyberCrystals >= 10) {
    kyberCrystals -= 10;
    health += 10;
    kyberCrystalText.innerText = kyberCrystals;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough Kyber Crystals to buy health.";
  }
}

// Function to buy a weapon
function buyWeapon() {
  // Check if the player can buy a weapon
  if (currentWeapon < weapons.length - 1) {
    // Check if the player has enough currency
    if (kyberCrystals >= 30) {
      kyberCrystals -= 30;
      currentWeapon++;
      kyberCrystalText.innerText = kyberCrystals;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough Kyber Crystals to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 Kyber Crystals";
    button2.onclick = sellWeapon;
  }
}

// Function to sell a weapon
function sellWeapon() {
  // Check if the player has more than one weapon to sell
  if (inventory.length > 1) {
    kyberCrystals += 15;
    kyberCrystalText.innerText = kyberCrystals;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

// Function to initiate the fight with Tusken Raider
function fightTuskenRaider() {
  fighting = 0;
  goFight();
}

// Function to initiate the fight with Rancor
function fightRancor() {
  fighting = 1;
  goFight();
}

// Function to initiate the fight with Krayt Dragon
function fightKraytDragon() {
  fighting = 2;
  goFight();
}

// Function to prepare for fight with a monster
function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

// Function to handle player's attack
function attack() {
    attackSound.play(); // Play an attack sound
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);

    // Prevent health from going into negative values and stop at 0
    health = Math.max(0, health);

    if (isMonsterHit()) {
      monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
    } else {
      text.innerText += " You miss.";
    }

    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;

    if (health <= 0) {
      lose();
    } else if (monsterHealth <= 0) {
      if (fighting === 2) {
        winGame();
      } else {
        defeatMonster();
      }
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
      text.innerText += " Your " + inventory.pop() + " breaks.";
      currentWeapon--;
    }
}

// Function to calculate the value of a monster's attack
function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit > 0 ? hit : 0;
}

// Function to determine if the monster is hit
function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

// Function to handle player's dodge
function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

// Function to handle defeating a monster
function defeatMonster() {
  kyberCrystals += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  kyberCrystalText.innerText = kyberCrystals;
  xpText.innerText = xp;
  update(locations[4]);
}

// Function to handle a player's loss
function lose() {
  update(locations[5]);
}

// Function to handlea a player's victory
function winGame() {
  update(locations[6]);
}

// Function to restart the game
function restart() {
  xp = 0;
  health = 100;
  kyberCrystals = 50;
  currentWeapon = 0;
  inventory = ["staff"];
  kyberCrystalText.innerText = kyberCrystals;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}
