const record = [];
let shouldRecord = false;

function playSound(sound) {
    const audio = new Audio(`./audio/${sound}.wav`);

    audio.play();

    
        if (shouldRecord) {
            record.push({ track: sound, time: Date.now() });
            console.log(record);
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

function initPlayButton(){
    const playButton = document.querySelector ("#play");
    function delay(){
        return new Promise( resolve => {
            setTimeout(()=>{
                resolve();

            },2000)

        });
        
    }
    playButton.addEventListener("click", async() => {
        for  (let sound of record){
            shouldRecord = false 
            await delay ()
            playSound(sound.track)

             
           
        }
        
        
    });
}




(function init() {
    initSoundButtons();
    initSoundKeys();
    initRecordButton();
    initPlayButton();

})();

