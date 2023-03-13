const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'My EJS App' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
