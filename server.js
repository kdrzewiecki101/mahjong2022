var express = require("express")
var app = express();
const PORT = 3000;
let users = [];
app.use(express.static('static'));
app.use(express.text());

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})