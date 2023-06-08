import React, { useEffect, useRef, useState } from "react";
import Details from "./Details";
import Control from "./Control";
var hostname = "http://localhost:5000/public"
const Player = ({
    currentSongIndex,
    setCurrentSongIndex,
    nextSongIndex,
    songs
}) => {
    const audioE1 = useRef(null);
    const [isPlaying,setIsPlaying] = useState(false);
    const [audioCurrentTime,setAudioCurrentTime] = useState(0);
   
    useEffect(()=>{
    if(isPlaying){
        audioE1.current.play()
    }else{
        audioE1.current.pause()
    }
})

    const skipSong = (forward = true)=>{
     if(forward){
        setCurrentSongIndex(()=>{
            let temp = currentSongIndex;
            temp++;
            if(temp > songs.length -1){
              temp = 0
            }
            return temp;
        })
     }else{
        setCurrentSongIndex(()=>{
            let temp = currentSongIndex;
            temp--;
            if(temp<0){
                temp = songs.length - 1;
            }
            return temp;
        })
     }
    }

    const currentTime = ()=>{
    let playback_time = audioE1.current.currentTime;
    let duration_time = audioE1.current.duration;
    if(playback_time == duration_time){
        skipSong(true)
    }
    }

  return <div className="player">
   <h4>Playing Now</h4>
   <Details
    songs={songs[currentSongIndex]}
   />
   <Control 
   isPlaying={isPlaying} 
   setIsPlaying={setIsPlaying} 
   skipSong={skipSong}
/>
   <audio
    className="player_audio"
    src={`${hostname}/songs/`+songs[currentSongIndex]?._id+".mp3"}
    controls
    ref={audioE1}
    onTimeUpdate={(e)=>currentTime()}
   ></audio>
   <p className="next-up"> 
    Next Up:
    <span>
        {songs[nextSongIndex]?.title}<br/>
        {songs[nextSongIndex]?.artist}
    </span>
   </p>
  </div>;
};

export default Player;
