import { TextField, Typography } from "@mui/material";

const FileUpload = ({input,setInput}) => {
  

    const handleForm = (e)=>{
     let name = e.target.name
     let value = e.target.value
        switch(name){
            case"artist":
            setInput((pre)=>({...pre,artist:value}))
            break;
            case"title":
            setInput((pre)=>({...pre,title:value}))
            break;
            case"img_src":
            setInput((pre)=>({...pre,img_src:e.target?.files[0]}))
            break;
            case"src":
            setInput((pre)=>({...pre,src:e.target?.files[0]}))
            break;
            default:
                setInput(input);
        }
    }
 

  return <div className="file-upload">
   <form >
   <TextField type="text" id="outlined-basic" onChange={handleForm} name="artist" label="Enter artist name" variant="outlined" />&nbsp;
   <TextField type="text" id="outlined-basic" onChange={handleForm} name="title" label="Enter title name" variant="outlined" />
    <Typography component="h6" >Leave a image</Typography>
    <input type="file" accept="image/*" onChange={handleForm} name="img_src" />
    <Typography component="h6">Leave a audio</Typography>  
    <input type="file" accept="audio/*" onChange={handleForm}  name="src" />
    </form> 

  </div>;
};

export default FileUpload;
