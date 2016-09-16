var express = require('express');
var beautify = require('js-beautify');
var app = express();

app.use('/static', express.static('dist'));
// Fallback
app.use(express.static(__dirname + '/dist'));


app.get('/', (req, res) => {
    res.send();
});

app.post('/beautify', (req, res) => {
    var body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = JSON.parse(Buffer.concat(body).toString());
        let options = {
            indent_size: 4,
            unformatted: [],
            brace_style: 'expand'
        };
        let resJSON = {
            html: beautify.html(body.html, options),
            css: beautify.css(body.css, options),
        };
        res.send(JSON.stringify(resJSON));
    });
});


app.listen(process.env.PORT || 3000, () => {
    console.log('App.js listening');
});
