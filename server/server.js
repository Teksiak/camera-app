const express = require("express")
const path = require('path')
const formidable = require("formidable")

const app = express()
const PORT = 5000   

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.post("/upload", (req, res) => {
    let form = formidable({
        multiples: true,
        keepExtensions: true,
        uploadDir: path.join(__dirname, "upload"),
    });

    form.parse(req, (err, fields, files) => {
        if(err) {
            console.log(err)
        }
        res.send("Success")
    });
})

app.listen(PORT, () => {
    console.log('Server starting... PORT: ' + PORT)
})