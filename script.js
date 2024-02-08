let xp = 0;
let health = 100;
let kyberCrystal = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
// let inventory = ["staff", "blaster rifle", "lightsaber"];
let inventory = ["staff"];
const button1 = document.querySelector("#button1")
const button2 = document.querySelector("#button2")
const button3 = document.querySelector("#button3")
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

function goToStore() {
    console.log("Going to store.");
}

function goToCave() {
    console.log("Going to cave.");
}

function fightKraytDragon() {
    console.log("Fighting Krayt Dragon.")
}

button1.onclick = goToStore;
button2.onclick = goToCave;
button3.onclick = fightKraytDragon;