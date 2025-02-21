import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import "./EditLabels.css";

const EditLabel = ({ labels, addLabel, deleteLabel, closeModal }) => {
  const [newLabel, setNewLabel] = useState("");

  const handleAddLabel = () => {
    if (newLabel.trim() !== "" && !labels.includes(newLabel)) {
      addLabel(newLabel);
      setNewLabel("");
    }
  };

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Labels</h2>
          <button className="close-button" onClick={closeModal}>
            <CloseIcon />
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="create new label"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
          />
          <button className="add-button" onClick={handleAddLabel}>
            <AddIcon/>
            
          </button>
        </div>
        <ul className="label-list">
          {labels.map((label, index) => (
            <li key={index} className="label-item">
              <span>{label}</span>
              <button
                className="delete-button"
                onClick={() => deleteLabel(label)}
              >
                <DeleteIcon />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditLabel;
