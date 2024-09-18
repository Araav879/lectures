document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const playPauseBtn = document.getElementById('playPause');
    const muteUnmuteBtn = document.getElementById('muteUnmute');
    const progress = document.getElementById('progress');
    const volumeControl = document.getElementById('volume');
    const fullscreenBtn = document.getElementById('fullscreen');
    const videoList = document.getElementById('videoList');

    const jsonUrl = 'https://example.com/your-video-data.json'; // Replace with your JSON URL

    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            populateVideoList(data.videos);
        })
        .catch(error => console.error('Error fetching video data:', error));

    function populateVideoList(videos) {
        videoList.innerHTML = videos.map(video => `
            <li class="video-item">
                <span class="video-name">${video.title}</span>
                <a href="#" data-url="${video.url}"><h5>Click here to watch video</h5></a>
            </li>
        `).join('');

        videoList.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                e.preventDefault();
                video.src = e.target.getAttribute('data-url');
                video.play();
                playPauseBtn.textContent = 'Pause';
            }
        });
    }

    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            video.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    muteUnmuteBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        muteUnmuteBtn.textContent = video.muted ? 'Unmute' : 'Mute';
    });

    volumeControl.addEventListener('input', (e) => {
        video.volume = e.target.value / 100;
    });

    video.addEventListener('timeupdate', () => {
        const value = (video.currentTime / video.duration) * 100;
        progress.value = value;
    });

    progress.addEventListener('input', () => {
        video.currentTime = (progress.value / 100) * video.duration;
    });

    fullscreenBtn.addEventListener('click', () => {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { // Firefox
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { // Chrome, Safari & Opera
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { // IE/Edge
            video.msRequestFullscreen();
        }
    });
});
