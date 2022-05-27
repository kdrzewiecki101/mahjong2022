var express = require("express")
var app = express();
const PORT = 3000;
let users = [];
app.use(express.static('static'));
app.use(express.text());

app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})


app.post("/addUser", (req, res) => {
    // console.log(JSON.parse(req.body).nickname)

    if (users.includes(JSON.parse(req.body).nickname)) {
        // alert("sometext");
        console.log("Nazwa już istnieje")
        res.send(JSON.stringify({ id: "error", added: false }))
        return
    }

    if (users.length < 2) {
        users.push(JSON.parse(req.body).nickname);
        console.log(users)
        res.send(JSON.stringify({ id: users.length, nickname: JSON.parse(req.body).nickname, added: true }))
    }

    else {
        console.log("Za duzo graczy")
        res.send(JSON.stringify({ id: users.length, added: false }))
    }
})

app.get("/check", (req, res) => {
    if (users.length == 2) {
        console.log("GOTOWOŚĆ DO GRY")
        res.send(JSON.stringify({ ready: true }))
    }
    else {
        res.send(JSON.stringify({ ready: false }))
    }

})

app.get("/reset", (req, res) => {
    console.log("reset")
    users = [];
    res.send(JSON.stringify({ hasGameStarted: false }))
})