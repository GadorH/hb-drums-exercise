let record = [];
let shouldRecord = false;
let initialRecordTime = 0

function playSound(sound) {
    const audio = new Audio(`./audio/${sound}.wav`);

    audio.play();

    
        if (shouldRecord) {
            record.push({ track: sound, time: Date.now() });
            
        }
    
}

function initSoundButtons() {
    const soundTracks = ["crash", "hihat-close", "hihat-open", "kick", "ride", "snare", "tom-high", "tom-low", "tom-mid"];

    for (let sound of soundTracks) {
        const button = document.querySelector(`#${sound}`);

        button.addEventListener("click", () => {
            playSound(sound);
        });
        button.addEventListener("touchstart", () => {
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
        initialRecordTime = Date.now()
    });
}

function initPlayButton(){
    const playButton = document.querySelector ("#play");
    function delay(time){
        return new Promise( resolve => {
            setTimeout(()=>{
                resolve();

            },time)

        });
        
    }
    playButton.addEventListener("click", async() => {
        shouldRecord = false 
        
        for  (let sound of record){
            const index = record.indexOf(sound)
            const delayTime = index===0? sound.time-initialRecordTime: sound.time-record[index-1].time
            
            await delay (delayTime)
            playSound(sound.track)


             
           
        }
        
        record =[]
        
    });
}




(function init() {
    initSoundButtons();
    initSoundKeys();
    initRecordButton();
    initPlayButton();

})();

