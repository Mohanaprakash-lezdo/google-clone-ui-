import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Note from "../Note/Note";
import "./NoteList.css";

const NoteList = ({ notes, deleteNote, pinNote, copyNote, editNote }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const selectedNote = notes.find((note) => note.id === id);
  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note.id} onClick={() => navigate(`/note/${note.id}`)}>
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            image={note.image}
            isPinned={note.isPinned}
            deleteNote={deleteNote}
            pinNote={pinNote}
            copyNote={copyNote}
            editNote={editNote}
            // pass a copy function
          />
        </div>
      ))}
      {/* {modal for selected note} */}
      {selectedNote &&(
        <div className="modal-overlay" onClick={() => navigate("/")}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <Note
            id={selectedNote.id}
            title={selectedNote.title}
            content={selectedNote.content}
            image={selectedNote.image}
            isPinned={selectedNote.isPinned}
            deleteNote={deleteNote}
            pinNote={pinNote}
            copyNote={copyNote}
            editNote={editNote}
          />
          <button className="close-btn" onClick={() => navigate("/")}>
            Close
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default NoteList;
