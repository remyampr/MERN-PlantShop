const multer = require("multer");
const path = require("path");
const fs = require("fs");  

// Set up Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Define the directory where files will be stored
        const uploadDir = path.join(__dirname, "MyUploads");

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Use the upload directory
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Set a unique filename to avoid overwriting
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Create an upload instance with the storage configuration
const upload = multer({ storage });

module.exports = { upload };
