import "./App.css";
import logo from "./dir-file.png";
import File from "./components/File.js";
import { useEffect, useState } from "react";

function App() {
    const [files, setFiles] = useState([]);
    const [selected, setSelected] = useState([]);

    const getFiles = async () => {
        const res = await fetch("http://localhost:5000/getFiles", {
            method: "GET",
        });
        const data = await res.json();
        setFiles(data);
    };

    const removeFiles = async (files) => {
        await fetch("http://localhost:5000/removeFiles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ files: files }),
        });
        getFiles();
    };

    const selectFile = (file) => {
        if (selected.includes(file)) {
            setSelected((prev) => prev.filter((el) => el != file));
        } else {
            setSelected((prev) => [...prev, file]);
        }
    };

    const handleRemove = () => {
        removeFiles(selected)
        setSelected([])
        getFiles()
    }

    const renameFile = async (oldName, newName) => {
        await fetch("http://localhost:5000/renameFile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ oldName: oldName, newName: newName }),
        });
        getFiles();
    }

    useEffect(() => {
        getFiles();
    }, []);

    useEffect(() => {
        console.log(selected)
    }, [selected])

    return (
        <div>
            <header className="navbar navbar-light bg-light bg-gradient ps-3 row-sm">
                <a className="navbar-brand" href="/">
                    <img
                        src={logo}
                        width="75"
                        className="d-inline-block align-top me-1"
                        alt="folder"
                    />
                    <h1 className="display-4 d-inline-block">File manager</h1>
                </a>
            </header>
            <hr className="m-0" />
            <main className="d-flex flex-direction-row h-100">
                <aside className="d-flex flex-column align-items-center mh-100 px-3 py-1 bg-light w-25">
                    <div className="form-group d-flex flex-column gap-2 mb-3 mt-3 w-100">
                        <button
                            className="btn btn-lg btn-outline-primary w-100"
                            id="dir"
                            type="submit"
                            onClick={getFiles}
                        >
                            Reload
                        </button>
                        <div className="d-flex gap-2">
                            {
                                selected.length < files.length ?
                                <button
                                className="btn btn btn-secondary w-100"
                                id="file"
                                type="submit"
                                onClick={() => setSelected(files.map(el => el.name))}
                            >
                                Select all
                            </button>
                            :
                            <button
                            className="btn btn btn-secondary w-100"
                            id="file"
                            type="submit"
                            onClick={() => setSelected([])}
                        >
                            Deselect all
                        </button>
                            }
                            <button
                                className="btn btn btn-danger w-100"
                                id="file"
                                type="submit"
                                onClick={handleRemove}
                            >
                                Remove selected
                            </button>
                        </div>
                    </div>
                </aside>
                <div className="d-flex flex-wrap align-content-start">
                    {files.map((el) => {
                        return (
                            <File
                                name={el.name}
                                isSelected={selected.includes(el.name)}
                                selectFile={selectFile}
                                removeFile={removeFiles}
                                renameFile={renameFile}
                                key={el.name}
                            />
                        );
                    })}
                </div>
            </main>
        </div>
    );
}

export default App;
