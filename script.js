const record = [];
let shouldRecord = false;

function playSound(sound) {
    const audio = new Audio(`/audio/${sound}.wav`);

    audio.play();

    if (shouldRecord) {
        record.push(sound);
    }
}

function initSoundButtons() {
    const soundTracks = ["crash", "hihat-close", "hihat-open", "kick", "ride", "snare", "tom-high", "tom-low", "tom-mid"];

    for (let sound of soundTracks) {
        const button = document.querySelector(`#${sound}`);

        button.addEventListener("click", () => {
            playSound(sound);
        });
    }
}

function initSoundKeys() {
    window.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();

        switch (key) {
            case "q":
                playSound("crash");
                break;
            case "w":
                playSound("hihat-close");
                break;
            case "e":
                playSound("hihat-open");
                break;
            case "a":
                playSound("kick");
                break;
            case "s":
                playSound("ride");
                break;
            case "d":
                playSound("snare");
                break;
            case "z":
                playSound("tom-high");
                break;
            case "x":
                playSound("tom-low");
                break;
            case "c":
                playSound("tom-mid");
                break;
            default:
                break;
        }
    });
}

function initRecordButton() {
    const recordButton = document.querySelector("#record");
    recordButton.addEventListener("click", () => {
        shouldRecord = true;
    });
}

(function init() {
    initSoundButtons();
    initSoundKeys();
    initRecordButton();
})();
