class MusicPlayer{
    constructor(musicList){
        this.musicList=musicList;
        this.index=0;
        this.audioList = this.getAudioList();
        this.currentAudio=this.audioList[this.index];
    }
    getAudioList(){
        const audioList = [];
        for(let i=0;i<this.musicList.length;i++){
            audioList.push(new Audio(`music-audio/${this.musicList[i].audio}`));
        }
        return audioList;
    }
    getMusic(){
        if(this.index<this.musicList.length){
            return this.audioList[this.index];
        }else{
            return null;
        }
    }
    nextMusic(){
        if((this.index+1)==this.musicList.length){
            document.querySelector("#nextButton").classList.add("pointer-none");
        }else if(this.index<this.musicList.length){
            this.index++;
            this.currentAudio= this.getMusic();
            this.updateTime();
        }else{
            return null;
        }
    }
    prevMusic(){
        if(this.index==0){
            document.querySelector("#previousButton").classList.add("pointer-none");
        }else if(this.index>0){
            this.index--;
            this.currentAudio= this.getMusic();
            this.updateTime();
        }else{
            return null;
        }
    } 
    playMusic(){
        document.querySelector("#playButton").classList.add("nonactive-button");
        document.querySelector("#pauseButton").classList.remove("nonactive-button");
        this.currentAudio.play();
    }  
    pauseMusic(){
        document.querySelector("#pauseButton").classList.add("nonactive-button");
        document.querySelector("#playButton").classList.remove("nonactive-button");
        this.currentAudio.pause();
    }
    displaySongs(){
        let list = "";
        let counter =0;
        for(let song of this.musicList){
            if(this.index==counter){
                list += `<li class="active-song list-group-item">${song.name + " - " +song.composer}</li>`
            }else{
                list += `<li class="list-group-item">${song.name + " - " +song.composer}</li>`
            }
            counter++;
        }
        document.querySelector("#song-list").innerHTML = list;
    }
    displayInfos(){
        let song = this.musicList[this.index];
        document.querySelector("#song-name").innerText =`${song.name}`
        document.querySelector("#song-composer").innerText = `${song.composer}`
        document.querySelector(".card-img-top").innerHTML = `<img class="music-img rounded-top" src="music-img/${song.img}" alt="">`
    }
    updateTime() {
        let audio = this.currentAudio; 
        let duration = document.getElementById("duration");
        let currentTime = document.getElementById("current-time");
        let progressBar = document.getElementById("progress-bar");
        
        const calculateTime = (time) => {
            let minutes = Math.floor(time / 60);
            let seconds = Math.floor(time % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        };
        
        audio.addEventListener("loadedmetadata", () => {
            progressBar.max = audio.duration;
            duration.textContent = calculateTime(audio.duration);
        });
        
        audio.addEventListener("timeupdate", () => {
            progressBar.value = Math.floor(audio.currentTime);
            currentTime.textContent = calculateTime(audio.currentTime);
        });
        
        progressBar.addEventListener("input", () => {
            audio.currentTime = progressBar.value;
            currentTime.textContent = calculateTime(audio.currentTime);
        });
    }
    clearBars(){
        document.getElementById("progress-bar").value=0;
        document.getElementById("duration").textContent="0:00";
    }
}

