import React, { useState } from "react";

export default function File({ name, isSelected, selectFile, removeFile, renameFile }) {
    const [edit, setEdit] = useState(false)
    const [newName, setNewName] = useState(name.split(".")[0])
    
    let image = null
    try {
        image = require(`../upload/${name}`)
    } catch { }

    const handleInput = () => {
        selectFile(name)
    }

    const handleDelete = () => {
        removeFile([name])
    }

    const cancelRename = () => {
        setEdit(false)
        setNewName(name.split(".")[0])
    }

    const handleRename = () => {
        renameFile(name, newName+"."+name.split(".")[1])
    }
    
    return (
        <div className="d-flex flex-column justify-content-center align-items-center bg-light border rounded m-4 p-2" style={{width: 200}}>
            {
                edit ? 
                <div className="input-group mb-2">    
                    <input className="form-control" value={newName} onChange={event => setNewName(event.target.value)} type="text" />
                    <span className="input-group-text">.{name.split(".")[1]}</span>
                </div>
                :
                <p className="text-break text-center">{name}</p>

            }

            <img src={image} style={{width: 100, height: 100}} alt="file" className="border-0 rounded" />
            {
                edit ? 
                <div className="d-flex gap-1 mb-1 mt-3">
                    <button className="btn btn-sm btn-secondary" onClick={handleRename}>Confirm</button>
                    <button className="btn btn-sm btn-danger" onClick={cancelRename}>Cancel</button>
                </div>
                :
                <div className="d-flex gap-1 mb-1 mt-3">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => setEdit(true)}>Rename</button>
                    <button className="btn btn-sm btn-danger" onClick={handleDelete}>Remove</button>
                </div>
            }
            <input className="form-check-input" type="checkbox" checked={isSelected} onChange={handleInput}></input>
        </div>
    );
}
