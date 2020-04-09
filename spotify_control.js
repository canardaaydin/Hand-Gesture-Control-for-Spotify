window.onload = setTimeout(this.addListeners, 1000)


function addListeners(){

    chrome.storage.sync.get(['code'], function(result) {
        // console.log('Value currently is ' + result.code);
        window.code = result.code
    });

    dcPrevBut = document.getElementById("prevBut");
    dcPrevBut.addEventListener("click", this.prevSong);

    dcNextBut = document.getElementById("nextBut");
    dcNextBut.addEventListener("click", this.nextSong);

    dcPauseBut = document.getElementById("pauseBut");
    dcPauseBut.addEventListener("click", this.pauseSong);

    dcPlayBut = document.getElementById("playBut");
    dcPlayBut.addEventListener("click", this.playSong);
    
}


function gestifyPause() {
    fetch("https://api.spotify.com/v1/me/player/pause", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Authorization: Bearer " + window.code
        }
    })
    .then(function(response) { return response.json() })
    .then(function(data) { console.log(data) })
}

function gestifyPlay() {
    fetch("https://api.spotify.com/v1/me/player/play", {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Authorization: Bearer " + window.code
        }
    })
    .then(function(response) { return response.json() })
    .then(function(data) { console.log(data) }) 
}


function prevSong() {
    console.log(window.code)
}

function nextSong() {
    console.log(window.code)
}

function pauseSong() {
    console.log(window.code)
}

function playSong() {
    console.log(window.code)
}