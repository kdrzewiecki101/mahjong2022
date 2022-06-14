import { OrbitControls } from "../js/OrbitControls.js";
import { Board } from "../js/Board.js";
import * as THREE from '../js/three.module.js';
import { Piece } from "../js/Piece.js";
import { Button } from "../js/Button.js"
import { net, ui } from "../js/Main.js";

let zmiennaX = 4.6
let zmiennaZ = 3.6

//środkowe klocki zmienna
let specialPositionRow = -0.5

//parametry obecnie klikniętego klocka
let nowClickedPositionRow
let nowClickedPositionLR
let nowClickedPositionHeight

//hovery
let lastHoveredPiece = "";
let nowHoveredPiece = "";
//global helpers
let imageCounterStrike = 0
let lastClickedPieceImageObj = ""
let wasSomethingClicked = false


class Game {
    constructor() {
        this.playerPiecesLeft = [];
        this.hasGameStarted = false;
        this.hasGameEnded = false;
        this.yourLogin;
        this.yourGameboardImages
        this.floor = [];
        this.board = new Board();
        this.firstFloor = this.board.zeroFloor;
        this.secondFloor = [];
        this.thirdFloor = [];
        this.fourthFloor = [];
        this.playerID;
        this.pieceH = 2.2;
        this.boards = new THREE.Group();
        this.boards.position.y = -0.4;
        // Scena3D
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // this.axes = new THREE.AxesHelper(1000)
        // this.scene.add(this.axes);
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialiasing: true });
        this.renderer.setClearColor(0x483d8b);
        this.renderer.setClearAlpha(0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        // Camera
        this.camera.position.set(-120, 100, 0);
        this.camera.lookAt(this.scene.position);
        // OrbitControls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enablePan = false;
        this.controls.maxDistance = 70;
        this.controls.update();
        // Raycaster
        this.raycaster = new THREE.Raycaster();
        // Pointer (wskaźnik)
        this.pointer = new THREE.Vector2();
        // Listeners
        window.addEventListener('pointermove', this.onPointerMove);
        window.addEventListener('click', this.onPointerClick);
        // Functions
        //this.createBoard();
        //this.createButtons();
        this.helpButton();
        this.scene.add(this.boards);
        this.render();
    }

    helpButton = () => {
        let btn = document.getElementById("helpBt");
        btn.addEventListener("click", function () {
            alert("PRESS 'S' to SHUFFLE!")
        })
    }
    start(login, gameboardImagesRandomized) {
        this.yourLogin = login
        this.yourGameboardImages = gameboardImagesRandomized
        this.imageCounterStrike = 0
        if (login.id == 1) {
            this.imageCounterStrike = 0
            console.log("PIERWSZY")
            this.playerID = 1
            this.createButtons();
            this.createBoard();
            this.createFloor(this.board.zeroFloor, this.pieceH, 1);
            this.createFloor(this.board.firstFloor, this.pieceH, 2);
            this.createFloor(this.board.secondFloor, this.pieceH, 3);
            this.createFloor(this.board.thirdFloor, this.pieceH, 4);
            this.createTopPiece(this.pieceH, 5);
            this.createSidewaysPieces(this.pieceH, 1);
        }

        if (login.id == 2) {
            this.imageCounterStrike = 0
            console.log("DRUGA")
            this.playerID = 2
            this.createButtons();
            this.createBoard();
            this.createFloor(this.board.zeroFloor, this.pieceH, 1);
            this.createFloor(this.board.firstFloor, this.pieceH, 2);
            this.createFloor(this.board.secondFloor, this.pieceH, 3);
            this.createFloor(this.board.thirdFloor, this.pieceH, 4);
            this.createTopPiece(this.pieceH, 5);
            this.createSidewaysPieces(this.pieceH, 1);
        }
    }

    createButtons = () => {
        const buttonReset = new Button("resetButton", "./gfx/reset.png");
        buttonReset.position.x = -30;
        buttonReset.position.y = 2;
        buttonReset.position.z = -1 * 10;
        this.boards.add(buttonReset);
        console.log(buttonReset);
        const buttonReset2 = new Button("scoreButton", "./gfx/score.png");
        buttonReset2.position.x = -30;
        buttonReset2.position.y = 2;
        buttonReset2.position.z = 0 * 10;
        this.boards.add(buttonReset2);
        console.log(buttonReset2);
        const buttonReset3 = new Button("helpButton", "./gfx/help.png");
        buttonReset3.position.x = -30;
        buttonReset3.position.y = 2;
        buttonReset3.position.z = 1 * 10;
        this.boards.add(buttonReset3);
        console.log(buttonReset3);
    }

    createFloor = (floor, pieceH, level) => {
        for (let i = -4; i < Number(floor.length - 4); i++) {
            for (let j = -7; j < Number(floor[i + 4].length); j++) {

                if (floor[i + 4][j + 7] == 1) {
                    let imageOnTopName = this.yourGameboardImages[imageCounterStrike]
                    let topMaterialPath = `./gfx/${imageOnTopName}.png`;
                    let pieceID = imageOnTopName
                    let positionLR = j
                    let positionRow = i

                    const piece = new Piece(this.playerID, pieceID, topMaterialPath, positionLR, positionRow, level);
                    // console.log(piece);
                    piece.position.x = (i * zmiennaX + 0.5 * zmiennaX);
                    piece.position.y = (pieceH * level); //pieceH + 3

                    piece.position.z = (j * zmiennaZ + 0.5 * zmiennaZ);
                    // piece.scale.set(4.7, 3, 2.3);
                    this.scene.add(piece);
                    imageCounterStrike++
                }
            }
        }
        // console.log(imageCounterStrike)
    }

    createTopPiece = (pieceH, level) => {
        let imageOnTopName = this.yourGameboardImages[imageCounterStrike]
        let topMaterialPath = `./gfx/${imageOnTopName}.png`;
        let pieceID = imageOnTopName
        imageCounterStrike++
        const piece = new Piece(this.playerID, pieceID, topMaterialPath, specialPositionRow, specialPositionRow, level);
        piece.position.x = (0); //3.5 * 5 - 17.5
        piece.position.y = (pieceH * level);
        piece.position.z = (6.5 * 5 - 32.5);
        this.scene.add(piece);
    }
    createSidewaysPieces = (pieceH, level) => {
        //LEWA
        let imageOnTopNameL = this.yourGameboardImages[imageCounterStrike]
        let topMaterialPathL = `./gfx/${imageOnTopNameL}.png`;
        let pieceIDL = imageOnTopNameL

        let leftPositionLR = 6
        let rightPositionLR = -7
        const leftPiece = new Piece(this.playerID, pieceIDL, topMaterialPathL, leftPositionLR, specialPositionRow, level)
        leftPiece.position.x = (0); //3.5 * 5 - 17.5
        leftPiece.position.y = (pieceH * level);
        leftPiece.position.z = (6 * zmiennaZ + 0.5 * zmiennaZ);
        this.scene.add(leftPiece);
        imageCounterStrike++

        //PRAWA
        let imageOnTopNameR = this.yourGameboardImages[imageCounterStrike]
        let topMaterialPathR = `./gfx/${imageOnTopNameR}.png`;
        let pieceIDR = imageOnTopNameR
        const rightPiece = new Piece(this.playerID, pieceIDR, topMaterialPathR, rightPositionLR, specialPositionRow, level)
        rightPiece.position.x = (0); //3.5 * 5 - 17.5
        rightPiece.position.y = (pieceH * level);
        rightPiece.position.z = (-7 * zmiennaZ + 0.5 * zmiennaZ);
        this.scene.add(rightPiece);
        imageCounterStrike++
        let imageOnTopNameR2 = this.yourGameboardImages[imageCounterStrike]
        let topMaterialPathR2 = `./gfx/${imageOnTopNameR2}.png`;
        let pieceIDR2 = imageOnTopNameR2
        const rightPiece2 = new Piece(this.playerID, pieceIDR2, topMaterialPathR2, rightPositionLR - 1, specialPositionRow, level)
        rightPiece2.position.x = (0); //3.5 * 5 - 17.5
        rightPiece2.position.y = (pieceH * level);
        rightPiece2.position.z = (-8 * zmiennaZ + 0.5 * zmiennaZ);
        this.scene.add(rightPiece2);
        imageCounterStrike++
    }
    createBoard = () => {
        const geometry = new THREE.BoxGeometry(75, 3, 75);
        const material = [];
        material.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('./gfx/side2.png') }));
        material.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('./gfx/side2.png') }));
        material.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('./gfx/board.png') }));
        material.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('./gfx/board.png') }));
        material.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('./gfx/side3.png') }));
        material.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('./gfx/side3.png') }));
        const cube = new THREE.Mesh(geometry, material);
        this.boards.add(cube);
    }

    onPointerMove = (event) => {
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this.hoverPieces();
    }
    onPointerClick = (event) => {
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
        this.clickPieces();
    }
    hoverPieces = () => {
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        if (nowHoveredPiece != undefined && nowHoveredPiece == intersects[0].object)
            return
        if (nowHoveredPiece) {
            lastHoveredPiece = nowHoveredPiece;
            lastHoveredPiece.position.y -= 0.3;
            nowHoveredPiece = "";
        }
        if (intersects[0].object.name != "clickable")
            return
        // lastHoveredPiece.position.y -= 0.2;
        // console.log(intersects[0].object);
        let correctPieces = this.scene.children.filter(function (el) { return el.name == "clickable" })
        this.playerPiecesLeft = correctPieces
        nowClickedPositionLR = intersects[0].object.positionLR
        nowClickedPositionRow = intersects[0].object.positionRow
        nowClickedPositionHeight = intersects[0].object.positionHeight
        console.log(nowClickedPositionLR + " " + nowClickedPositionRow + " " + nowClickedPositionHeight)  //Wyświetlanie Wszystkich parametrow pozycji klikniętego klocka

        let sameRowElements = this.playerPiecesLeft.filter(function (el) {
            return (el.positionRow == nowClickedPositionRow && el.positionHeight == nowClickedPositionHeight) ||
                (el.positionRow == nowClickedPositionRow - 0.5 && el.positionHeight == nowClickedPositionHeight) || // klocki specjalnej troski
                (el.positionRow == nowClickedPositionRow + 0.5 && el.positionHeight == nowClickedPositionHeight)
        })

        let topSpecialPiece = this.playerPiecesLeft.find(el => el.positionHeight == 5) //Szczyt piramidy 

        if (topSpecialPiece != undefined && nowClickedPositionHeight == 4) { //jeżeli istnieje szczyt piramidy
            console.log("Ruch jest blokowany")
            return
        }

        let maxInControlRow = -10
        let minInControlRow = 10
        let maxHeightControl = -1

        for (let i = 0; i < sameRowElements.length; i++) {
            if (sameRowElements[i].positionLR > maxInControlRow)
                maxInControlRow = sameRowElements[i].positionLR
            if (sameRowElements[i].positionLR < minInControlRow)
                minInControlRow = sameRowElements[i].positionLR
            if (sameRowElements[i].positionHeight > maxHeightControl)
                maxHeightControl = sameRowElements[i].positionHeight
        }
        if (nowClickedPositionLR != maxInControlRow && nowClickedPositionLR != minInControlRow) // && sameRowElements[i].positionHeight != maxHeightControl
            return
        nowHoveredPiece = intersects[0].object;
        // console.log(intersects[0].object)

        intersects[0].object.position.y += 0.3;
        // console.log("teraz hover: " + nowHoveredPiece.id);
        // console.log("poprzedni hover: " + lastHoveredPiece.id);
    }
    clickPieces = () => {
        console.log(this.playerPiecesLeft.length);
        console.log(lastClickedPieceImageObj);
        if (lastClickedPieceImageObj != undefined && lastClickedPieceImageObj.pieceID != undefined) {
            console.log("ostatnio kliknięty: " + lastClickedPieceImageObj.pieceID);
            console.log(lastClickedPieceImageObj);
        }
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        console.log("teraz clicknięty: " + intersects[0].object.pieceID);

        if (lastClickedPieceImageObj != undefined) {
            if (intersects[0].object.buttonID == "resetButton")
                net.reset()
            console.log(intersects[0].object.buttonID)
            if (intersects[0].object.buttonID == "scoreButton")
                net.showResults()
            if (intersects[0].object.buttonID == "helpButton")
                net.instructions()
            let correctPieces = this.scene.children.filter(function (el) { return el.name == "clickable" })
            this.playerPiecesLeft = correctPieces
            nowClickedPositionLR = intersects[0].object.positionLR
            nowClickedPositionRow = intersects[0].object.positionRow
            nowClickedPositionHeight = intersects[0].object.positionHeight
            console.log(nowClickedPositionLR + " " + nowClickedPositionRow + " " + nowClickedPositionHeight)  //Wyświetlanie Wszystkich parametrow pozycji klikniętego klocka

            let sameRowElements = this.playerPiecesLeft.filter(function (el) {
                return (el.positionRow == nowClickedPositionRow && el.positionHeight == nowClickedPositionHeight) ||
                    (el.positionRow == nowClickedPositionRow - 0.5 && el.positionHeight == nowClickedPositionHeight) || // klocki specjalnej troski
                    (el.positionRow == nowClickedPositionRow + 0.5 && el.positionHeight == nowClickedPositionHeight)
            })

            let topSpecialPiece = this.playerPiecesLeft.find(el => el.positionHeight == 5) //Szczyt piramidy 

            if (topSpecialPiece != undefined && nowClickedPositionHeight == 4) { //jeżeli istnieje szczyt piramidy
                console.log("Ruch jest blokowany")
                return
            }

            let maxInControlRow = -10
            let minInControlRow = 10

            for (let i = 0; i < sameRowElements.length; i++) {
                if (sameRowElements[i].positionLR > maxInControlRow)
                    maxInControlRow = sameRowElements[i].positionLR
                if (sameRowElements[i].positionLR < minInControlRow)
                    minInControlRow = sameRowElements[i].positionLR
            }

            if (nowClickedPositionLR == maxInControlRow || nowClickedPositionLR == minInControlRow) { //Jeżeli skrajne w swoim rzędzie
                const lastPiecePrefix = lastClickedPieceImageObj.pieceID;
                const currentPiecePrefix = intersects[0].object.pieceID;
                //Normal Match
                if (intersects.length > 0 && intersects[0].object.name == "clickable" && lastClickedPieceImageObj.pieceID == intersects[0].object.pieceID && lastClickedPieceImageObj.id != intersects[0].object.id) {
                    intersects[0].object.removeFromParent()
                    lastClickedPieceImageObj.removeFromParent()
                    wasSomethingClicked = true
                }
                //Season Match
                else if (lastClickedPieceImageObj.pieceID != undefined && intersects.length > 0 && intersects[0].object.name == "clickable" && lastClickedPieceImageObj.id != intersects[0].object.id && lastPiecePrefix.substring(0, 3) == "sea" && currentPiecePrefix.substring(0, 3) == "sea") {
                    console.log("DS <3");
                    intersects[0].object.removeFromParent()
                    lastClickedPieceImageObj.removeFromParent()
                    wasSomethingClicked = true
                }
                //Flower Match
                else if (lastClickedPieceImageObj.pieceID != undefined && intersects.length > 0 && intersects[0].object.name == "clickable" && lastClickedPieceImageObj.id != intersects[0].object.id && lastPiecePrefix.substring(0, 3) == "flo" && currentPiecePrefix.substring(0, 3) == "flo") {
                    console.log("DSaaa <3");
                    intersects[0].object.removeFromParent()
                    lastClickedPieceImageObj.removeFromParent()
                    wasSomethingClicked = true
                }
                if (intersects[0].object != undefined)
                    lastClickedPieceImageObj = intersects[0].object
                else
                    lastClickedPieceImageObj = ""

                //Sprawdzenie pozostałości po usunięciu pary z planszy
                let correctPieces = this.scene.children.filter(function (el) { return el.name == "clickable" })
                this.playerPiecesLeft = correctPieces
            }
            else {
                console.log("Ruch jest blokowany")
                return
            }
        }
        if (wasSomethingClicked == true)
            lastClickedPieceImageObj = "" //w celu uniknięcia 3ciego kliku psującego
        wasSomethingClicked = false
        //console.log(this.playerPiecesLeft);
        if (this.playerPiecesLeft.length == 0) {
            // alert("You WON!")
            this.hasGameEnded = true
        }
    }

    pieceShuffling = () => {
        let receivedImages = []
        let receivedPositions = []
        console.log("SHUFFLING")
        let correctPieces = this.scene.children.filter(function (el) { return el.name == "clickable" })
        this.playerPiecesLeft = correctPieces
        for (let i = 0; i < this.playerPiecesLeft.length; i++) {
            //nazwa zdjecia
            receivedImages.push(this.playerPiecesLeft[i].pieceID)
            //miejsce klocka
            let positionsObj = {
                positionLR: this.playerPiecesLeft[i].positionLR,
                positionRow: this.playerPiecesLeft[i].positionRow,
                positionHeight: this.playerPiecesLeft[i].positionHeight
            }
            receivedPositions.push(positionsObj)

        }
        this.abortAllPieces()
        this.rebuildBoard(receivedImages, receivedPositions)
    }

    abortAllPieces = () => {
        wasSomethingClicked = false
        lastClickedPieceImageObj = "" //Dodge
        for (let i = this.scene.children.length; i > 0; i--) {
            let child = this.scene.children[i];
            this.scene.remove(child);
        }
    }

    rebuildBoard = (rebuildImages, rebuildPositions) => {
        let shuffledImagesArray = []
        const imagesLeft = []
        for (let i = 0; i < rebuildImages.length; i++) {
            imagesLeft.push(rebuildImages[i])
        }

        while (imagesLeft.length != 0) {
            let rN = Math.floor(Math.random() * imagesLeft.length)
            shuffledImagesArray.push(imagesLeft[rN])
            imagesLeft.splice(rN, 1)
        }

        for (let i = 0; i < rebuildImages.length; i++) {
            let imageOnTopName = shuffledImagesArray[i]
            let topMaterialPath = `./gfx/${imageOnTopName}.png`;
            let pieceID = imageOnTopName
            let positionLR = rebuildPositions[i].positionLR
            let positionRow = rebuildPositions[i].positionRow
            let positionHeight = rebuildPositions[i].positionHeight

            const piece = new Piece(this.playerID, pieceID, topMaterialPath, positionLR, positionRow, positionHeight)
            piece.position.x = (positionRow * zmiennaX + 0.5 * zmiennaX);
            piece.position.y = (this.pieceH * positionHeight);
            piece.position.z = (positionLR * zmiennaZ + 0.5 * zmiennaZ);
            this.scene.add(piece)
        }
    }

    render = () => {
        this.controls.update();
        //skalowanie renderera i kamery
        // console.log(window.innerHeight, window.innerWidth)
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render);
    }

    gameOver = () => {
        // console.log("WYGRYWA GRACZ: " + this.playerID)
        return this.playerID
    }
}

export { Game };