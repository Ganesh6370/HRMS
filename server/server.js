const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

// Create the Express app
const app = express();
const port = 3000;

// Enable CORS to allow requests from different origins
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create the directory if it doesn't exist
const uploadDir = path.join(__dirname, 'assets/PassBankAttach');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Set up the multer middleware
const upload = multer({ storage: storage });

// Define the upload route
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        res.json({ message: 'File uploaded successfully', filename: req.file.filename});
    } catch (error) {
        res.status(400).send('Error uploading file'); // Plain text response
    }
});

// Serve static files from the 'assets' directory
app.use('/service/assets', express.static(path.join(__dirname, 'assets')));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
