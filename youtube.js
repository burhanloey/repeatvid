function getQueryString(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var player;
var youtubeId = getQueryString('v');

if (youtubeId) {
    localStorage.setItem('v', youtubeId);
} else {
    youtubeId = localStorage.getItem('v');
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        event.target.playVideo();
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        videoId: youtubeId,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
