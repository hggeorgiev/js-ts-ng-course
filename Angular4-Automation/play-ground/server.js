// Put in root dir


const _ = require('lodash');
const express = require('express');
const app = express();

app.set('port',  8080);
app.use(express.static(__dirname + '/public'));


app.get('*', function(req, res) {
    res.sendFile(__dirname + 'public/index.html');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});