import multer from "multer";
import path from 'path';

// Storage configuration for multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // console.log("Saving file:", file.originalname);
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const newFilename = Date.now() + path.extname(file.originalname);
        // console.log("File will be saved as:", newFilename);
        cb(null, newFilename);
    }
});

export const upload = multer({ storage: storage });