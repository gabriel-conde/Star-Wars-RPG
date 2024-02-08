let xp = 0;
let health = 100;
let kyberCrystal = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;

let inventory = ["staff"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goToStore, goToCave, fightKraytDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goToTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight Rancor", "Fight Sand People", "Go to town square"],
    "button functions": [fightRancor, fightSandPeople, goToTown],
    text: "You enter the cave. You see some monsters."
  }
];

button1.onclick = goToStore;
button2.onclick = goToCave;
button3.onclick = fightKraytDragon;

function update(location) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
  }
  
function goToTown() {
    update(locations[0]);
}

function goToStore() {
    update(locations[1]);
}

function goToCave() {
    update(locations[2]);
}

function fightKraytDragon() {
    console.log("Fighting Krayt Dragon.");
}

function buyHealth() {

}

function buyWeapon() {

}

function fightRancor() {

}

function fightSandPeople() {

}