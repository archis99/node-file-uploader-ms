const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const PORT = 3000;
const readChunk = require('read-chunk');
const fileType = require('file-type');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage });

app.use(cors());

app.post('/node-file-uploader-ms/upload', upload.single('file'), (req,res) => {
    console.log(JSON.stringify(req.file));
    const buffer = readChunk.sync(req.file.path, 0, fileType.minimumBytes);
    console.log(fileType(buffer));
    res.send({message: 'File Uploaded'});
});

app.listen(PORT, () => {
    console.log(`node-file-uploader-ms running on ${PORT}`);
});
