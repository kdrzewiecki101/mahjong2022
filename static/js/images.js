// const types = [
//     { name: "bamboo", number: 9, multiplicity: 4 },
//     { name: "character", number: 9, multiplicity: 4 },
//     { name: "dots", number: 9, multiplicity: 4 },
//     { name: "wind", number: 4, multiplicity: 4 },
//     { name: "dragon", number: 3, multiplicity: 4 },
//     { name: "flower", number: 4, multiplicity: 1 },
//     { name: "season", number: 4, multiplicity: 1 },
// ]

let imagesLeft = []
let startingItemsArray = []

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

// function checkImagesLeft() {
//     imagesLeft = []
//     for (let i = 0; i < images.length; i++) {
//         for (let j = 0; j < images[i].multiplicity; j++) {
//             console.log(images[i].name)
//             imagesLeft.push(images[i].name)
//         }
//     }

//     console.log(imagesLeft)
// }

function startImages() {
    imagesLeft = []
    for (let i = 0; i < images.length; i++) {
        for (let j = 0; j < images[i].multiplicity; j++) {
            // console.log(images[i].name)
            imagesLeft.push(images[i].name)
        }
    }
    //console.log(imagesLeft)

    let XXXX = images

    for (let i = 0; i < imagesLeft.length; i++) {
        let rN = Math.floor(Math.random() * XXXX.length)

        XXXX[rN].multiplicity--
        let imageName = XXXX[rN].name
        // console.log(imageName)
        startingItemsArray.push(imageName)

        if (XXXX[rN].multiplicity == 0) {
            console.log("TO KONIEC DLA: " + XXXX[rN].name)
            let filteredBombowo = XXXX.filter(function (el) { return el.name != XXXX[rN].name })
            XXXX = filteredBombowo
            console.log(XXXX)
        }

        // console.log(XXXX[rN].name)

    }
    //console.log(startingItemsArray)
    return startingItemsArray
}


// function deleteFromImages(clicked) {
//     //Clicked to klknięty element-> zczytywanie jego ID, ew przekazanie samego parametru id / może name czy coś
//     let found = images.find(element => element.name == clicked)
//     found.multiplicity--
//     console.log(found)

//     let filteredImages = images.filter(function (el) { return el.name != clicked; })
//     images = filteredImages
//     console.log(images)


//     images.push(found)
//     console.log(images)

// }

export { images, imagesLeft, startImages };