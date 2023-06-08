import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FileUpload from "./FileUpload";
import axios from "axios";
import { Alert } from "@mui/material";
import {apiUrl} from "../constants"
const ModalBox = ({handleClose,open,success,setSuccess}) => {
  const [input,setInput] = useState({
    artist:"",
    title:"",
    img_src:"",
    src:"",
})
useEffect(()=>{
setSuccess(false);
setError(false)
},[success])
const  [status,setStatus] = useState(true);
const [error,setError] = useState(false)
const [errorMessage,setErrorMessage] = useState("")
const handleForm = ()=>{
  setSuccess(false);
  setError(false);
  handleValidation();
  if(!status && !error){
    const formData = new FormData();
    formData.append("image",input.img_src);
    formData.append("audio",input.src)
    axios.post(`${apiUrl}/file-details`,input).then((res)=>{
      axios.post(`${apiUrl}/upload-file`,formData).then((res)=>{
        setSuccess(true);
      })
      .catch((error)=>{
        setSuccess(false);
        setErrorMessage(error?.message)
      })
    })
  }
}

const handleValidation = ()=>{
  if(input.artist.trim()
   && input.title.trim()
   &&input.img_src
   &&input.src){
    setStatus(false)
    setError(false)
  }else{
    setStatus(true);
    setError(true)
  }
  } 

  
const alert = (flag,message)=>{
  return <>
  <Alert severity={`${flag}`}>{message}</Alert>
  </>
}
  return (
    <>
<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        Please fill the form!
        </DialogTitle>
        <DialogContent>
          <FileUpload input={input} setInput={setInput}/>
          {success && alert("success","Successfully uploaded")}
          {errorMessage && alert("error","Uploaded failed")}
          {status && error && alert("error","All fields are required")}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleForm} autoFocus>
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalBox;
