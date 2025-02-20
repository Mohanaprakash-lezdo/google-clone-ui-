import React, { useState,useEffect,useRef } from "react";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from '@mui/icons-material/Image';
import IconButton from '@mui/material/IconButton';
import "./Createnote.css";
// import { Icon } from "@mui/material";

// expand fn
const Createnote = (props) => { 
  const [isexpanded, setisExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    image:'',
  });

  // updated code
  const formRef = useRef(null); 
  const fileInputRef=useRef(null);

  const expand = () => {
    setisExpanded(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  };

  const handleImageUpload=(event)=>{
    const file=event.target.files[0];
    if (file){
      const reader=new FileReader();
      reader.onloadend=()=>{
      setNote((prevNote)=>({
        ...prevNote,
        image:reader.result  
        //  store  base64  image url
      }))
    }
    reader.readAsDataURL(file);
  }
  }
  const handleIconClick=()=>{
    fileInputRef.current.click()
  }
  const submitNote=(event)=>{
    event.preventDefault();
    props.addNote(note);
    setNote({
      title:'',
      content:'',
      image:'', 
    })
    setisExpanded(false)
  }
  // Function to detect clicks outside the form
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setisExpanded(false);
      }
    };
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

  return (
    <div className="create-note-container">
      
      <form className="create-note" ref={formRef}>
        {isexpanded && (
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={note.title}
          />
        )}
        <textarea
          type="text"
          name="content"
          placeholder="Take a note..."
          onClick={expand}
          onChange={handleChange}
          value={note.content}
        />
        {/* {image upload input} */}
        {isexpanded &&(
          <div className="image-upload">
          <input type='file'
           accept='image/*' 
           ref={fileInputRef}
           style={{display:'none'}}
          //  hide default file input
           onChange={handleImageUpload}/>
           <IconButton onClick={handleIconClick} color='primary'>
            <ImageIcon/>
           </IconButton>
          </div>
        )}

        {/* {image preview} */}
        {note.image && (
        <img src={note.image} alt='preview' className="image-preview"/>
      )}

        <Zoom in={isexpanded}>
          <Fab onClick={submitNote} className="add-button">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
      </div>
   
  );
};

export default Createnote;