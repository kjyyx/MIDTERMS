const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/' + 'index.html');
});

app.all('*', (req, res) => {
  res.status(404).send('<h1>Error 404 page not found.</h1>');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
