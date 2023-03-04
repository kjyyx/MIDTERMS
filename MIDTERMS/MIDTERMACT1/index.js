const express = require('express');
const app = express();

//require body-parser for this method 
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

//import statements for path, mimetype and multer
const path = require('path');
const mime = require('mime-types');
const multer = require('multer');
const { maxHeaderSize } = require('http');

//use multer to support file upload feature
const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // specify the destination directory for the uploaded files
},

filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original name of the file
    },
});

const upload = multer({ 
  storage: fileStorage,
  fileFilter: (req,file,cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ){
      cb(null,true);
    }else{
      cb(null,false);
      cb(new Error("Upload only png, jpg, and jpeg format."))
    }
  },
});

//file upload route
app.post('/uploads', upload.single('myFile'), (req, res) => {
    console.log(req.file);
    //set the correct MIME type for the uploaded file, 
    //use to verify that the uploaded file is of the expected 
    //type before further processing it.
    req.file.mimetype = mime.lookup(req.file.originalname);

    //send a customized page to the client 
    res.sendFile(path.join(__dirname, 'file-uploaded.html')); });

//route to upload
app.get('/file-upload', (req, res) => { 
    res.sendFile(__dirname + '/' + 'file-upload.html');
});

app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/' + 'index.html');
});

app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/' + 'about.html');
});

app.get('/blog', (req, res) => {
  res.sendFile(__dirname + '/' + 'blog.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/' + 'contact.html');
});

app.get('/upload', (req, res) => {
  res.sendFile(__dirname + '/' + 'upload.html');
});

app.post('/process_post', urlencodedParser, function (req, res) {

    // Prepare output in JSON format
    response = {
        Name:req.body.Name,
        Subject:req.body.Subject,
        Message:req.body.Message,
        Email:req.body.Email,
    };

        console.log(response); 
        res.end(JSON.stringify(response));
});

app.all('*', (req, res) => {
  res.status(404).sendFile(__dirname + '/' + 'error.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
