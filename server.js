var express = require("express")
var app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
let users = [];
app.use(express.static(path.join(__dirname, './static')));
app.use(express.text());
const images = [
    { name: "bamboo1", multiplicity: 4 },
    { name: "bamboo2", multiplicity: 4 },
    { name: "bamboo3", multiplicity: 4 },
    { name: "bamboo4", multiplicity: 4 },
    { name: "bamboo5", multiplicity: 4 },
    { name: "bamboo6", multiplicity: 4 },
    { name: "bamboo7", multiplicity: 4 },
    { name: "bamboo8", multiplicity: 4 },
    { name: "bamboo9", multiplicity: 4 },

    { name: "character1", multiplicity: 4 },
    { name: "character2", multiplicity: 4 },
    { name: "character3", multiplicity: 4 },
    { name: "character4", multiplicity: 4 },
    { name: "character5", multiplicity: 4 },
    { name: "character6", multiplicity: 4 },
    { name: "character7", multiplicity: 4 },
    { name: "character8", multiplicity: 4 },
    { name: "character9", multiplicity: 4 },

    { name: "dots1", multiplicity: 4 },
    { name: "dots2", multiplicity: 4 },
    { name: "dots3", multiplicity: 4 },
    { name: "dots4", multiplicity: 4 },
    { name: "dots5", multiplicity: 4 },
    { name: "dots6", multiplicity: 4 },
    { name: "dots7", multiplicity: 4 },
    { name: "dots8", multiplicity: 4 },
    { name: "dots9", multiplicity: 4 },

    { name: "dragon1", multiplicity: 4 },
    { name: "dragon2", multiplicity: 4 },
    { name: "dragon3", multiplicity: 4 },

    { name: "flower1", multiplicity: 1 },
    { name: "flower2", multiplicity: 1 },
    { name: "flower3", multiplicity: 1 },
    { name: "flower4", multiplicity: 1 },

    { name: "season1", multiplicity: 1 },
    { name: "season2", multiplicity: 1 },
    { name: "season3", multiplicity: 1 },
    { name: "season4", multiplicity: 1 },

    { name: "wind1", multiplicity: 4 },
    { name: "wind2", multiplicity: 4 },
    { name: "wind3", multiplicity: 4 },
    { name: "wind4", multiplicity: 4 }

]
let doublePlayerGameboard = []

function randomizeBoardImages() {
    const startingItemsArray = []
    const imagesLeft = []
    for (let i = 0; i < images.length; i++) {
        for (let j = 0; j < images[i].multiplicity; j++) {
            imagesLeft.push(images[i].name)
        }
    }

    while (imagesLeft.length != 0) {
        let rN = Math.floor(Math.random() * imagesLeft.length)
        startingItemsArray.push(imagesLeft[rN])
        imagesLeft.splice(rN, 1)
    }
    return startingItemsArray
}

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
        doublePlayerGameboard = randomizeBoardImages()
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
        console.log(doublePlayerGameboard)
        res.send(JSON.stringify({ ready: true, gameboardImagesRandomized: doublePlayerGameboard }))
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
