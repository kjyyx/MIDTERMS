var express = require('express');
var app = express();

const port = 2001;
const host = 'localhost';

app.get('/', function (req, res) {
  res.send('You have successfully created your second app');
});

app.listen(port, host, () => {
  console.log('Example app listening at http://%s:%s', host, port);
});
// var server = app.listen(2001, function(){
//     var host = server.address().address
//     var port = server.address().port

//     console.log("Example app listening at http://%s:%s", host, port)
// })
