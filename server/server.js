const express = require("express");
const path = require("path");
const formidable = require("formidable");
const fs = require("fs");
const cors = require("cors");

const app = express();
const PORT = 5000;
const filesPath = path.join(__dirname, "../file-manager/src/upload");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const fixFileName = (fileName) => {
    var newPath = path.join(filesPath, fileName);
    var newName = fileName.split(".")[0];
    var fileExt = fileName.split(".")[1] || "";
    var i = 0;
    while (fs.existsSync(newPath)) {
        i += 1;
        if (newName.at(-3) == "(" && newName.at(-1) == ")") {
            newPath = path.join(
                filesPath,
                newName.substring(0, newName.length - 3) +
                    `(${i})` +
                    "." +
                    fileExt
            );
        } else {
            newPath = path.join(
                filesPath,
                newName + `(${i})` + "." + fileExt
            );
        }
    }
    return newPath;
};

app.post("/upload", (req, res) => {
    let form = formidable({
        multiples: true,
        keepExtensions: true,
        uploadDir: filesPath,
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.send(err);
        }
        res.send("Success");
    });
});

app.post("/removeFiles", (req, res) => {
    console.log(req.body.files);
    for (const file of req.body.files) {
        console.log(file);
        const newPath = path.join(filesPath, file);
        if (fs.existsSync(newPath)) {
            fs.unlinkSync(newPath);
        }
    }
    res.send("Success");
});

app.post("/renameFile", (req, res) => {
    const newPath = fixFileName(req.body.newName);

    fs.rename(path.join(filesPath, req.body.oldName), newPath, (err) => {
        if (err) console.log(err);
        else {
            res.send('Success')
        }
    });
})

app.get("/getFiles", (req, res) => {
    const data = fs.readdirSync(filesPath, { withFileTypes: true });
    res.send(data);
});

app.listen(PORT, () => {
    console.log("Server starting... PORT: " + PORT);
});
