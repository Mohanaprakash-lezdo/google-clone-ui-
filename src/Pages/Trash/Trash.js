import React from 'react'
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './Trash.css'
const Trash = ({trashedNotes,restoreNote,permanentDeleteNote}) => {
  return (
    <div className='trash-container'>
      <h2>Trash</h2>
      {/* <h3>hi</h3> */}
      {trashedNotes.length===0?(
        <p>No Notes in Trash</p>


      ):(
        trashedNotes.map((note)=>(
          <div key={note.id} className='trash-note'>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            {note.image && <img src={note.image} alt='note'/>}
            <div className='trash-actions'>
              <button onClick={()=>restoreNote(note.id)}>
                <RestoreFromTrashIcon/>
              </button>
              <button onClick={()=>permanentDeleteNote(note.id)}>
                <DeleteForeverIcon/>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default Trash