import React from 'react'
import { useParams } from 'react-router-dom'
import NoteList from '../../Components/NoteList/NoteList';
import Createnote from '../../Components/Createnote/Createnote';

const LabelNotes = ({notes,addNote,deleteNote,editNote,pinNote,copyNote}) => {
    const {labelName}=useParams();
    const filteredNotes = notes.filter((note) => note.labels && note.labels.includes(labelName) && !note.isGlobal);

  return (
    <div className='label-notes-container'>
        <h2>Notes for {labelName}</h2>
        {/* Create a note */}
        <Createnote addNote={(note)=>addNote(note,false)} labelName={labelName} />

        {filteredNotes.length>0 ?(
            <NoteList notes={filteredNotes}
            deleteNote={(id)=>deleteNote(id,labelName)}
            pinNote={pinNote}
            copyNote={copyNote}
            editNote={editNote}
           
            />
        ):(
            <p>No Notes for this label</p>
        )}
        

    </div>
  )
}

export default LabelNotes