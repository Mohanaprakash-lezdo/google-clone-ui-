import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Header from "./Components/Header/Header";
import CreateNote from "./Components/Createnote/Createnote";
import NoteList from "./Components/NoteList/NoteList";
// import Sidebar from "./Components/Sidebar/Sidebar";
import Layout from "./Components/Layout/Layout";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Reminder from "./Pages/Reminder/Reminder";
import EditLabel from "./Pages/EditLabels/EditLabels";
import Archive from "./Pages/Archive/Archive";
import Trash from "./Pages/Trash/Trash";
import LabelNotes from "./Pages/LabelNotes/Labelnotes";
// import { LabelSharp } from "@mui/icons-material";

function App() {
  const [notes, setNotes] = useState([]);
  const [trashedNotes,setTrashNotes]=useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [labels,setLabels]=useState([]);
  const[isModalOpen,setIsModalOpen]=useState(false);
  const navigate=useNavigate();
  const location = useLocation();

  const addNote = (newNote,isGlobal=true) => {
    setNotes((prevNotes) => 
        [...prevNotes,
          {
            ...newNote,
             ispinned: false, 
             id: uuidv4(),
            lastedited: null,
            isGlobal
          }
          ,
        ]);
      }
     
      
      // generating a unique id
    
  ;
  // move note to trash
  const deleteNote = (id,labelName=null) => {
    setNotes((prevNotes) => {
      const noteToTrash=prevNotes.find((note)=>note.id ===id);
      if (noteToTrash){
        if (labelName && noteToTrash.labels.length>1){
          // Remove the label insteadt of deleting  the note
          const updatedNote={
            ...noteToTrash,
            labels:noteToTrash.labels.filter((label)=>label !==labelName)
          }
          return prevNotes.map((note)=>
          note.id===id?updatedNote:note)
        }else{
          setTrashNotes((prevTrashedNotes)=>[...prevTrashedNotes,noteToTrash])
          return prevNotes.filter((note) => 
            note.id !== id);;
        }
      }
      return prevNotes;

      });
      // Redirect to home if the delete note was open
      if (location.pathname=== `/note/${id}`){
        navigate('/')
      }
    };

    // Move note to trash
    const restoreNote=(id)=>{
      setTrashNotes((prevTrashedNotes)=>{
        const noteToRestore=prevTrashedNotes.find((note)=>note.id===id);
        if (noteToRestore){
          // check if  all labels on the  note exist  in the label state
          const noteLabels=Array.isArray(noteToRestore.labels)?noteToRestore.labels:  [];
          const missinglabels=noteLabels.filter(label=>!labels.includes(label));
          if (missinglabels.length>0){
            const userChoice=window.confirm(
              `this note labels had that no longer exist: ${missinglabels.join(',')}.\nDo you want to restore it on home page?`
            )
           if (!userChoice){
            return prevTrashedNotes
           }
          }

          const updatedNote={
            ...noteToRestore,
            labels:noteLabels.filter(label=>labels.includes(label)) || [],
            isGlobal:true 

          }
          setNotes((prevNotes)=>[...prevNotes,updatedNote])
          navigate('/')
        }
        return prevTrashedNotes.filter((note)=>note.id !==id);
      })
    }

    // premantely delete
    const permanentDeleteNote=(id)=>{
      setTrashNotes((prevTrash)=>prevTrash.filter((note)=>note.id !==id))
    }

  // pin  or unpin a note
  const pinNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  };

  // copy a note
  const copyNote = (note) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      { ...note, id: uuidv4(), lastedited: null },
    ]);
  };

  // Edit a note
  const editNote = (id, updateTitle, updatedContent, updatedImage) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              title: updateTitle,
              content: updatedContent,
              image: updatedImage,
              lastedited: new Date().toLocaleTimeString(),
            }
          : note
      )
    );
  };

  // note search filter
  const filteredNotes = notes.filter(
    (note) =>note.isGlobal &&(
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())

    )
     
  );
  // separte pin and unpin notes
  const pinnedNotes = filteredNotes.filter((note) => note.isPinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.isPinned);
  console.log('notes',notes);
  console.log('trashnednotes',trashedNotes);

  // Determine if we're in Trash  or Archive
  const isTrash=location.pathname ==='/Trash';
  const isArchive=location.pathname ==='/Archive';
  // const isReminder=location.pathname ==='/Reminder';
  const isHome=location.pathname ==='/';

  // add a label
  const addLabel=(newLabel)=>{
    if (newLabel.trim() && !labels.includes(newLabel)){
      setLabels((prevLabels)=>[...prevLabels,newLabel])
    }
  }

  // delete a label
  const deleteLabel=(labelToDelete)=>{
    setLabels((prevLabels)=> prevLabels.filter((label)=>label !==labelToDelete))
  }

  // open modal
  const openModal=()=>{
    setIsModalOpen(true)
  }

  // close modal
  const closeModal=()=>{
    setIsModalOpen(false);
    navigate('/')
  }
  

  return (
    <div className="App">
      <Header setSearchQuery={setSearchQuery} />
      <div className="main-content">

        <Layout labels={labels} openModal={openModal}/>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Reminder" element={
              <>
              <CreateNote addNote={addNote}/>
              <Reminder />
              </>}
               />
            
            <Route path="/Archive" element={<Archive />} />
            <Route path="/Trash" element={
              <Trash
               trashedNotes={trashedNotes}
               restoreNote={restoreNote}
               permanentDeleteNote={permanentDeleteNote}
               />} />
            <Route path='/note/:id' element={<NoteList notes={notes} editNote={editNote}/>}/>
            <Route path='/label/:labelName' element={
              <LabelNotes notes={notes} 
              addNote={addNote}
              deleteNote={deleteNote}
              editNote={editNote}
              pinNote={pinNote}
              copyNote={copyNote}/>}/>
          </Routes>

          {/* editlabel modal */}
          {isModalOpen &&(
            <EditLabel
            labels={labels}
            addLabel={addLabel}
            deleteLabel={deleteLabel}
            closeModal={closeModal}/>
          )}

          {/* {show create note only for Home and Reminder path } */}
          {isHome && <CreateNote addNote={addNote}/>}

        
          {/* {show notes  only on home} */}
          {isHome &&(
             <>
             {/* {Show pinned notes} */}
           {pinnedNotes.length > 0 && (
             <>
               <h2>Pinned</h2>
               <NoteList
                 notes={pinnedNotes}
                 deleteNote={deleteNote}
                 pinNote={pinNote}
                 copyNote={copyNote}
                 editNote={editNote}
               />
             </>
           )}
           {/* {show other notes} */}
           {pinnedNotes.length > 0 && unpinnedNotes.length > 0 && (
             <>
               <h2>Others</h2>
               <NoteList
                 notes={unpinnedNotes}
                 deleteNote={deleteNote}
                 pinNote={pinNote}
                 copyNote={copyNote}
                 editNote={editNote}
               />
             </>
           )}

           {/* unpinned notes */}
           {pinnedNotes.length === 0 && unpinnedNotes.length > 0 && (
             <NoteList
               notes={unpinnedNotes}
               deleteNote={deleteNote}
               pinNote={pinNote}
               copyNote={copyNote}
               editNote={editNote}
             />
           )}
             </>
           )}
 
             {/* {Show Trash page} */}
             {isTrash }
             
             {/* {Show Archive page} */}
             {isArchive }
        </div>
      </div>
    </div>
  );
}

export default App;
