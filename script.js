// get elements
const clicker = document.getElementById("clicker");
const counter = document.getElementById("counter");

// value load
let clickCount = 0;
clickCount = firstload(clickCount, "clickCount");
let manualClickMult = 0;
manualClickMult = firstload(manualClickMult, "manualClickMult");
let autoClickerRate = 0;
autoClickerRate = firstload(autoClickerRate, "autoClickerRate");
let totalMult = 0;
totalMult = firstload(totalMult, "totalMult");

// onload
if (localStorage.getItem("lang") == "swe") {
    swedishInit();
}
counter.textContent = "$" + clickCount
setInterval(gameTick, 50);
setInterval(saveTick, 10000);

// main game
function gameTick() {
    clickCount += (autoClickerRate * (totalMult + 1))
    counter.textContent = "$" + parseInt(clickCount)
}
function saveTick() {
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('manualClickMult', manualClickMult);
    localStorage.setItem('autoClickerRate', autoClickerRate);
    localStorage.setItem('totalMult', totalMult);
}
function clicked() {
    clickCount = clickCount + 1 * (manualClickMult + 1)
    counter.textContent = "$" + parseInt(clickCount)
}

// store
function storeItem1() {
    if (clickCount > 24) {
        clickCount = clickCount - 25
        manualClickMult++
    }
}
function storeItem2() {
    if (clickCount > 74) {
        clickCount = clickCount - 75
        autoClickerRate += 0.05
    }
}
function storeItem3() {
    if (clickCount > 149) {
        clickCount = clickCount - 150
        totalMult += 0.5
    }
}

// settings
const settings = document.getElementById("settings")
function openSettings() {
    settings.style.display = "flex"
}
function closeSettings() {
    settings.style.display = "none"
}
function resetSave() {
    if(confirm("Are you sure you want to reset your progress?") == true) {
        localStorage.clear();
        location.reload();
    }
}
function changeLanguage() {
    if (localStorage.getItem("lang") == "swe") {
        localStorage.removeItem("lang");
        englishInit();
    } else {
        localStorage.setItem("lang", "swe")
        swedishInit();
    }
    
}

// loading functions
function firstload(runName, storedName) {
    if (localStorage.getItem(storedName) == null) {
        localStorage.setItem(storedName, 0);
        runName = 0;
    }
    runName = parseFloat(localStorage.getItem(storedName));
    return(runName);
}
function englishInit() {
    document.getElementById("storeItem1").innerHTML = "<b>25 - Manual multiplier</b>";
    document.getElementById("storeItem2").innerHTML = "<b>75 - Simple autoclicker</b>";
    document.getElementById("storeItem3").innerHTML = "<b>150 - Total multiplier</b>";
    document.getElementById("langbutton").innerHTML = '<img src="assets/flags/Flag_of_Sweden.svg" height="10px"> Change language';
    document.getElementById("resetbutton").innerHTML = "Reset progress";
}
function swedishInit() {
    document.getElementById("storeItem1").innerHTML = "<b>25 - Manual multiplicerare</b>";
    document.getElementById("storeItem2").innerHTML = "<b>75 - Automatisk click</b>";
    document.getElementById("storeItem3").innerHTML = "<b>150 - Total multiplicerare</b>";
    document.getElementById("langbutton").innerHTML = '<img src="assets/flags/English_language.svg" height="10px"> Byt språk';
    document.getElementById("resetbutton").innerHTML = "Återställ spelet";
}