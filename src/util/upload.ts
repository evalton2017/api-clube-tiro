import multer from "multer";
import path = require('path');
import fs = require('fs');

var dir = './uploads';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const uploads = multer({storage: storage});

export default uploads;