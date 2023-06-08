import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBackward,faPause ,faForward,faPlay} from "@fortawesome/free-solid-svg-icons";
const Control = ({setIsPlaying,isPlaying,skipSong}) => {
  return (
    <div className="control">
      <button className="control_SkipButton" onClick={()=>skipSong(false)}>
        <FontAwesomeIcon icon={faBackward}  onClick={()=>skipSong(false)}/>
      </button>
      <button className="control_PlayButton" onClick={()=>setIsPlaying(!isPlaying)}>
        <FontAwesomeIcon icon={isPlaying?faPause:faPlay} onClick={()=>setIsPlaying(!isPlaying)} />
      </button>
      <button className="control_SkipButton" onClick={()=>skipSong()}>
        <FontAwesomeIcon icon={faForward} onClick={()=>skipSong()}/>
      </button>
    </div>
  );
};

export default Control;
