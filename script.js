let record = [];
let shouldRecord = false;
let initialRecordTime = 0;
let shouldPlay = true;

function playSound(sound) {
    const audio = new Audio(`audio/${sound}.wav`);

    audio.play();

    if (shouldRecord) {
        record.push({ track: sound, time: Date.now() });
    }
}

function initSoundButtons() {
    const soundTracks = ["crash", "hihat-close", "hihat-open", "kick", "ride", "snare", "tom-high", "tom-low", "tom-mid"];

    for (let sound of soundTracks) {
        const button = document.querySelector(`#${sound}`);

        button.addEventListener(
            "touchstart",
            (event) => {
                event.preventDefault();
                playSound(sound);
            },
            { passive: false }
        );

        button.addEventListener("click", () => {
            playSound(sound);
        });
    }
}

function initSoundKeys() {
    window.addEventListener("keydown", (event) => {
        const key = event.key.toLowerCase();
        const keyMap = {
            q: "crash",
            w: "hihat-close",
            e: "hihat-open",
            a: "kick",
            s: "ride",
            d: "snare",
            z: "tom-high",
            x: "tom-low",
            c: "tom-mid",
        };

        playSound(keyMap[key]);
    });
}

function initRecordButton() {
    const recordButton = document.querySelector("#record");

    recordButton.addEventListener("click", (event) => {
        const playButton = document.querySelector("#play");

        recordButton.classList.toggle("record-button--active");

        shouldRecord = !shouldRecord;

        if (shouldRecord) {
            record = [];
            playButton.setAttribute("disabled", "true");
            initialRecordTime = Date.now();
        } else {
            playButton.removeAttribute("disabled");
            initialRecordTime = 0;
        }
    });
}

function initPlayButton() {
    const playButton = document.querySelector("#play");
    function delay(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }

    playButton.addEventListener("click", async () => {
        if (!shouldPlay) {
            return;
        }

        shouldPlay = false;
        const recordButton = document.querySelector("#record");

        playButton.classList.toggle("play-button--active");
        recordButton.setAttribute("disabled", "true");

        for (let sound of record) {
            const index = record.indexOf(sound);
            const delayTime = index === 0 ? sound.time - initialRecordTime : sound.time - record[index - 1].time;

            await delay(delayTime);
            playSound(sound.track);
        }

        recordButton.removeAttribute("disabled");
        playButton.classList.toggle("play-button--active");
        shouldPlay = true;
    });
}

function initLegendButton() {
    const button = document.querySelector("#legend-button");

    button.addEventListener("click", () => {
        const legendList = document.querySelector(".legend-list");

        button.classList.toggle("legend-button--active");
        legendList.classList.toggle("legend-list--hidden");
    });
}

(function init() {
    initSoundButtons();
    initSoundKeys();
    initRecordButton();
    initPlayButton();
    initLegendButton();
})();
