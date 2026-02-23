let currentSong=null;

function playSong(id){
    const song=document.getElementById(id);
    if(currentSong && currentSong!==song){
        currentSong.pause();
        currentSong.currentTime=0;
    }

    if(song.paused){
        song.play();
        currentSong=song;
    }else{
        song.pause();
        currentSong=null;
    }
}