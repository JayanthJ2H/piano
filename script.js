const synth = new Tone.PolySynth({
    oscillator: {
        type: 'amtriangle',
        harmonicity: 6,
    },
    envelope: {
        attack: 0.05,
        decay: 0.8,
        sustain: 0.6,
        release: 3.0,
    },
}).toDestination();

let isKeyPressed = false;

const keyNoteMap = {
    'Z': 'C4',
    'Q': 'C#4/Db4',
    'X': 'D4',
    'W': 'D#4/Eb4',
    'C': 'E4',
    'V': 'F4',
    'E': 'F#4/Gb4',
    'M': 'G4',
    'R': 'G#4/Ab4',
    ',': 'A4',
    'T': 'A#4/Bb4',
    '.': 'B4',
    '/': 'C5',
    'Y': 'C#5/Db5',
    'A': 'D5',
    'U': 'D#5/Eb5',
    'S': 'E5',
    'D': 'F5',
    'I': 'F#5/Gb5',
    'F': 'G5',
    'O': 'G#5/Ab5',
    'J': 'A5',
    'P': 'A#5/Bb5',
    'K': 'B5',
    'L': 'C6',
    '[': 'C#6/Db6',
    ';': 'D6',
    ']': 'D#6/Eb6',
    "'": 'E6'
};


function playNote(element ,note) {
    synth.triggerAttackRelease(note, '0.5');
    changeColor(element)
}

function changeColor(key) {
    if (key.className == "white-keys"){
    key.style.background = "linear-gradient(to bottom, whitesmoke, whitesmoke, grey)"
    }
    if (key.className == "black-keys"){
        key.style.background = "linear-gradient(to bottom,black ,rgb(36, 35, 35), rgb(39, 38, 38))"
        key.style.height = "49.5%";
    }
    setTimeout(function () {
        resetColor(key);
    }, 300);
}

function resetColor(key) {
    key.style.background = "";
    key.style.height=""
}

document.addEventListener('keydown', function (event) {
    const keypress = event.key.toUpperCase();
    const key = document.querySelector(`[data-note="${keypress}"]`);

    if (key) {
        changeColor(key)
    }
});

function handleKeyPress(event) {
    const key = event.key.toUpperCase();
    if (keyNoteMap[key] && !isKeyPressed) {
        isKeyPressed = true;
        playNote('',keyNoteMap[key]);
    }
}

function handleKeyRelease(event) {
    const key = event.key.toUpperCase();
    if (keyNoteMap[key]) {
        isKeyPressed = false;
    }
}

document.addEventListener('keydown', handleKeyPress);
document.addEventListener('keyup', handleKeyRelease);
