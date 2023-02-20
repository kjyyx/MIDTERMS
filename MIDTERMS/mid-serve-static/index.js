const express = require('express');
const app = express();

app.use(express.static('public'));

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

app.all('*', (req, res) => {
  res.status(404).send('<h1>Error 404 page not found.</h1>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
