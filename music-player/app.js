const player = new MusicPlayer(musicList);

const songImg = document.querySelector(".music-img");
const playButton = document.querySelector("#playButton");
const pauseButton = document.querySelector("#pauseButton");
const nextButton = document.querySelector("#nextButton");
const previousButton = document.querySelector("#previousButton");
const listButton = document.querySelector("#button");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");

player.displaySongs();
player.updateTime();

playButton.addEventListener("click",function(){
    player.playMusic();
})
pauseButton.addEventListener("click",function(){
    player.pauseMusic();
})
nextButton.addEventListener("click",function(){
    player.pauseMusic();
    player.nextMusic();
    player.displayInfos();
    player.updateTime();
    player.displaySongs();
    player.clearBars();
})
previousButton.addEventListener("click",function(){
    player.pauseMusic();
    player.prevMusic();
    player.displayInfos();
    player.updateTime();
    player.displaySongs();
    player.clearBars();
})

//VOLUME CONTROL
let isMuted = true;
volume.addEventListener("click",function(){
    if(isMuted){
        player.currentAudio.muted=true;
        isMuted=false;
        volume.classList = "fa-solid fa-volume-xmark px-2";
        volumeBar.value=0;
    }else{
        player.currentAudio.muted=false;
        isMuted=true;
        volume.classList = "fa-solid fa-volume-high px-2";
        volumeBar.value=100;
    }
})

volumeBar.addEventListener("input",function(event){
    let value = event.target.value;
    player.currentAudio.volume=(value/100);
    if(value==0){
        player.currentAudio.muted=true;
        isMuted=false;
        volume.classList = "fa-solid fa-volume-xmark px-2";
    }else{
        player.currentAudio.muted=false;
        isMuted=true;
        volume.classList = "fa-solid fa-volume-high px-2";
    }
})
//END