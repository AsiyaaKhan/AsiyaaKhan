const music = document.querySelector("audio");
const play = document.getElementById("play");
const image = document.querySelector("img");
const artist = document.getElementById("artist");
const name = document.getElementById("name");
const previous = document.getElementById("prev");
const next = document.getElementById("next");
let progress = document.getElementById("progress");
let current_time = document.getElementById("current");
let total_duration = document.getElementById("total-duration");
let seek_slider = document.getElementById("seek_slider");


let isPlaying= false;

const playMusic = () => {
    isPlaying= true;
    music.play();
    play.classList.replace("fa-play","fa-pause");

}
const pauseMusic = () => {
    isPlaying= false;
    music.pause();
    play.classList.replace("fa-pause","fa-play");

}

play.addEventListener("click" , () => {
    if (isPlaying){
        pauseMusic();    
    }else{
        playMusic();
    }
}) 

const loadSongs = (songs) =>{
    name.innerText = songs.name;
    artist.innerText = songs.artist;
    music.src ="audio/"+songs.path;
    image.src = "img/"+songs.image;
};

songIndex =0;

function nextTrack() {
if ( songIndex < songs.length-1)
songIndex +=1;
else songIndex = 0; 
loadSongs(songs[songIndex]); 
playMusic();
}
function prevTrack() {
if ( songIndex > 0)
songIndex -=1;
else songIndex = songs.length-1; 
loadSongs(songs[songIndex]); 
playMusic();
}

music.addEventListener('timeupdate', (event) =>{
const {currentTime, duration}= event.srcElement;
let progress_time = (currentTime/ duration) *100;
progress.style.width = `${progress_time}%`;

let min_duration = Math.floor(duration/60);
let sec_duration = Math.floor(duration % 60);
if(sec_duration < 10){
sec_duration = `0${sec_duration}`;
}
if (duration) {
total_duration.textContent = `${min_duration}:${sec_duration}`;
}

let min_currentTime = Math.floor(currentTime/60);
let sec_currentTime = Math.floor(currentTime % 60);
if(sec_currentTime < 10){
sec_currentTime = `0${sec_currentTime}`;
}
let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
current_time.textContent = `${tot_currentTime}`;

}
);

seek_slider.addEventListener("click", (event)=>{
let progressWidthval = seek_slider.clientWidth;
let clickedOffSetX = event.offsetX;
let songDuration = music.duration;

music.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
playMusic();
});

music.addEventListener('ended',nextTrack);

next.addEventListener("click", nextTrack);
previous.addEventListener("click", prevTrack);


