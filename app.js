var express = require('express')
var app = express();

app.use('/static', express.static('dist'));
// Fallback
app.use(express.static(__dirname + '/dist'));


app.get('/', (req, res) => {
    res.send();
});

app.listen(process.env.PORT || 3000, () => {
    console.log('App.js listening');
});
