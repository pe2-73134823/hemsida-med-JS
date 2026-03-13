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

// onload
counter.textContent = "Clicks: " + clickCount
setInterval(gameTick, 100);
setInterval(saveTick, 10000);

// main game
function gameTick() {
    clickCount = clickCount + autoClickerRate
    counter.textContent = "Clicks: " + parseInt(clickCount)
}
function saveTick() {
    localStorage.setItem('clickCount', clickCount);
    localStorage.setItem('manualClickMult', manualClickMult);
    localStorage.setItem('autoClickerRate', autoClickerRate);
}
function clicked() {
    clickCount = clickCount + 1 * (manualClickMult + 1)
    counter.textContent = "Clicks: " + parseInt(clickCount)
}

// store
function storeItem1() {
    if (clickCount > 149) {
        clickCount = clickCount - 150
        manualClickMult++
    }
}
function storeItem2() {
    if (clickCount > 299) {
        clickCount = clickCount - 300
        autoClickerRate += 0.025
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

// loading functions
function firstload(runName, storedName) {
    if (localStorage.getItem(storedName) == null) {
        localStorage.setItem(storedName, 0);
        runName = 0;
    }
    runName = parseFloat(localStorage.getItem(storedName));
    return(runName);
}