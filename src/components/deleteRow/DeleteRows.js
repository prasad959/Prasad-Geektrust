import React from "react";
import "./DeleteRows.css"

const DeleteRows = ({ handleDeleteseleted, selectedRows }) => {
  return (
    <button
      onClick={handleDeleteseleted}
      disabled={selectedRows.length === 0}
      className="delete-selected-button"
    >
      Delete Selected
    </button>
  );
};

export default DeleteRows;
