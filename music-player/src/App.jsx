import { useEffect, useLayoutEffect, useState } from 'react'
import Player from './components/Player'
import Button from '@mui/material/Button';
import Modal from "./components/ModalBox";
import axios from "axios";
import { Box } from '@mui/material';
import { apiUrl } from './constants';
function App() {
  const [songs,setSongs] = useState([]);

  const [currentSongIndex,setCurrentSongIndex] = useState(0);
  const [nextSongIndex,setNextSongIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [success,setSuccess] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(()=>{
  setNextSongIndex(()=>{
    if(currentSongIndex + 1 >songs.length - 1){
      return 0;
    }else{
      return currentSongIndex + 1;
    }
  })
  },[currentSongIndex])

  useLayoutEffect(()=>{
  axios.get(`${apiUrl}/get-file-data`).then((res)=>{  
  setSongs(res.data)
  })
  },[success])

  const handleSongs = (title,artist,img_src,src) =>{
  const data = {
    title,
    artist,
    img_src,
    src,
  }
  setSongs((previous)=>({...previous,...data}))
  }
  return (
    <div className="app">
      <Player
       currentSongIndex={currentSongIndex}
       setCurrentSongIndex={setCurrentSongIndex}
       nextSongIndex={nextSongIndex}
       songs={songs}
      />
      <Modal 
       handleClose={handleClose}
       open={open}
       handleSongs={handleSongs}
       success={success}
       setSuccess={setSuccess} />
       <Box sx={{display:"flex",justifyContent:"center",padding:2}}>
       <Button sx={{background:"black"}}
       variant="contained" 
       onClick={()=>handleClickOpen(true)}
       >Upload your audio file here</Button>
       </Box>
    </div>
  )
}

export default App
