let fadeoutTimer = null;
let currentPad = null;

function Fadein(audio) {
    audio.volume = 1;
    audio.play();
}

function Fadeout(audio, callback = null) {
    // Clear any existing fadeout timer
    if (fadeoutTimer) {
        clearInterval(fadeoutTimer);
    }

    fadeoutTimer = setInterval(() => {
        if (audio.volume > 0.05) {
            audio.volume -= 0.05;
        } else {
            audio.pause();
            audio.currentTime = 0;
            audio.volume = 1;
            clearInterval(fadeoutTimer);
            fadeoutTimer = null;
            if (callback) callback();
        }
    }, 100);
}

function PlayPads(pitch) {
    // Adjust pitch to match audio ID format (e.g., 'c#' -> 'C#', 'a' -> 'A')
    const formattedPitch = pitch.replace('#', '#').toUpperCase();
    const audio = document.getElementById(formattedPitch + "Pad");

    if (!audio) {
        console.error(`Audio element for ${formattedPitch}Pad not found`);
        return;
    }

    if (currentPad === audio) {
        // Same pad clicked: toggle off
        Fadeout(audio);
        currentPad = null;
    } else {
        // Different pad or no pad playing
        if (currentPad) {
            // Fade out current pad, then play new one
            Fadeout(currentPad, () => Fadein(audio));
        } else {
            // No pad playing, play new one directly
            Fadein(audio);
        }
        currentPad = audio;
    }
}