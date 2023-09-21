import React, { useState } from 'react'
import "./Edit.css"

const EditPage = ({setIsEditOpen,isEditingRowdata,handlClickSave}) => {
    const [editUserData,setEditUserData]=useState({...isEditingRowdata})

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setEditUserData((prevUser)=>({...prevUser,[name]:value}))
    }
    const handleSaveClick = () => {
        handlClickSave(editUserData);
        setIsEditOpen();
      };

  return (
    <div className="model">
      <div className="model-content">
        <h3>Edit Property</h3>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={editUserData.name}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={editUserData.email}
          onChange={handleChange}
        />
        <label>Role</label>
        <input
          type="text"
          name="role"
          value={editUserData.role}
          onChange={handleChange}
        />

        <div className="model-buttons">
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={() => setIsEditOpen(false)}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default EditPage