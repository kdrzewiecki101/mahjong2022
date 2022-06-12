import { OrbitControls } from "../js/OrbitControls.js";
import { Board } from "../js/Board.js";
import * as THREE from '../js/three.module.js';
import { Piece } from "../js/Piece.js";


let zmiennaX = 4.6
let zmiennaZ = 3.6

//środkowe klocki zmienna
let specialPositionRow = -0.5


let nowClickedPositionRow
let nowClickedPositionLR
let nowClickedPositionHeight
// let lastClickedPositionRow
// let lastClickedPositionLR

//global helpers
let imageCounterStrike = 0
let lastClickedPieceImageObj = ""
let wasSomethingClicked = false

class Game {
    constructor() {
        this.playerPiecesLeft = [];
        this.hasGameStarted = false;
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
        this.camera.position.set(100, 100, 0);
        this.camera.lookAt(this.scene.position);
        // OrbitControls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enablePan = false;
        this.controls.maxDistance = 80;
        this.controls.update();
        // Raycaster
        this.raycaster = new THREE.Raycaster();
        // Pointer (wskaźnik)
        this.pointer = new THREE.Vector2();
        // Listeners
        //window.addEventListener('pointermove', this.onPointerMove);
        window.addEventListener('click', this.onPointerClick);
        // Functions
        this.createBoard();
        this.scene.add(this.boards);
        this.render();
    }

    start(login, gameboardImagesRandomized) {
        //console.log(login)
        // console.log("AAAAAAAAAAAAAAAAAa")
        this.yourLogin = login
        this.yourGameboardImages = gameboardImagesRandomized
        this.imageCounterStrike = 0
        //console.log(login.id)
        // console.log("YOUR LOGIN: " + this.yourLogin)
        // console.log("Your gameboard:")
        // console.log(this.yourGameboardImages)
        if (login.id == 1) {
            this.imageCounterStrike = 0
            console.log("PIERWSZY")
            this.playerID = 1
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
            this.createFloor(this.board.zeroFloor, this.pieceH, 1);
            this.createFloor(this.board.firstFloor, this.pieceH, 2);
            this.createFloor(this.board.secondFloor, this.pieceH, 3);
            this.createFloor(this.board.thirdFloor, this.pieceH, 4);
            this.createTopPiece(this.pieceH, 5);
            this.createSidewaysPieces(this.pieceH, 1);
        }

        //Wygenerować na podstawie this.gameBoard dla każdego gracza plansze


    }





    createBoard = () => {
        const geometry = new THREE.BoxGeometry(75, 3, 75);
        const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            // map: new THREE.TextureLoader().load('../gfx/diamond.png'),
            wireframe: false,
            transparent: true,
            opacity: 1,
            // color: 0x000000
            color: 0xd2d2d2
        });
        const cube = new THREE.Mesh(geometry, material);

        this.scene.add(cube);
    }



    createFloor = (floor, pieceH, level) => {
        for (let i = -4; i < Number(floor.length - 4); i++) {

            //console.log(floor)
            //console.log(floor[Number(i + 4)].length)

            for (let j = -7; j < Number(floor[i + 4].length); j++) {

                if (floor[i + 4][j + 7] == 1) {
                    // let playerID = 3
                    let imageOnTopName = this.yourGameboardImages[imageCounterStrike]
                    let topMaterialPath = `./gfx/${imageOnTopName}.png`;
                    let pieceID = imageOnTopName
                    // console.log(this.playerID)
                    // console.log(imageCounterStrike)
                    //console.log("TOP MATERIAL PATH: " + topMaterialPath)

                    //Tablica aktualnej planszy gracza na start:

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

        // console.log("LEWY 1:")
        // console.log(imageOnTopNameL + " " + topMaterialPathL + " " + pieceIDL)

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
        const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            // map: new THREE.TextureLoader().load('../gfx/diamond.png'),
            wireframe: false,
            transparent: true,
            opacity: 1,
            // color: 0x000000
            color: 0xd2d2d2
        });
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
        //console.log(intersects.length);
        for (let i = 0; i < intersects.length; i++) {
            if (intersects.length > 0 && intersects[0].object.name == "clickable") {
                intersects[0].object.material = new THREE.MeshBasicMaterial({
                    color: 0xff0000, transparent: false,
                    opacity: 1,
                });
                //console.log(intersects[0].object);
            }
        }
    }
    clickPieces = () => {
        if (lastClickedPieceImageObj != undefined)
            console.log("ostatnio kliknięty: " + lastClickedPieceImageObj.pieceID)
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        // console.log(intersects.length)
        console.log("teraz clicknięty: " + intersects[0].object.pieceID);
        // console.log(intersects[0].object)

        if (lastClickedPieceImageObj != undefined) {

            let correctPieces = this.scene.children.filter(function (el) { return el.name == "clickable" })
            this.playerPiecesLeft = correctPieces

            //console.log("Position:")
            nowClickedPositionLR = intersects[0].object.positionLR
            nowClickedPositionRow = intersects[0].object.positionRow
            nowClickedPositionHeight = intersects[0].object.positionHeight
            console.log(nowClickedPositionLR + " " + nowClickedPositionRow + " " + nowClickedPositionHeight)

            // console.log("positionLR:")
            // console.log(nowClickedPositionLR)

            // console.log("positionRow:")
            // console.log(nowClickedPositionRow)

            // console.log("positionHeight:")
            // console.log(nowClickedPositionHeight)

            // let controlRow = nowClickedPositionRow

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

            // console.log("sameRowElements:")
            // console.log(sameRowElements)

            let maxInControlRow = -10
            let minInControlRow = 10

            for (let i = 0; i < sameRowElements.length; i++) {
                // console.log(sameRowElements[i].positionLR)
                if (sameRowElements[i].positionLR > maxInControlRow)
                    maxInControlRow = sameRowElements[i].positionLR
                if (sameRowElements[i].positionLR < minInControlRow)
                    minInControlRow = sameRowElements[i].positionLR
            }

            // console.log("max: ")
            // console.log(maxInControlRow)

            // console.log("min: ")
            // console.log(minInControlRow)

            if (nowClickedPositionLR == maxInControlRow || nowClickedPositionLR == minInControlRow) { //Jeżeli skrajne w swoim rzędzie
                console.log("MOŻNA KLIKAĆ")
                //Good Normal Match

                if (intersects.length > 0 && intersects[0].object.name == "clickable" && lastClickedPieceImageObj.pieceID == intersects[0].object.pieceID && lastClickedPieceImageObj.id != intersects[0].object.id) {

                    intersects[0].object.removeFromParent()
                    lastClickedPieceImageObj.removeFromParent()

                    // intersects[0].object.material = new THREE.MeshBasicMaterial({
                    //     color: 0x00ff00, transparent: false,
                    //     opacity: 1,
                    // });

                    // lastClickedPieceImageObj.material = new THREE.MeshBasicMaterial({
                    //     color: 0x00ff00, transparent: false,
                    //     opacity: 1,
                    // })

                    // console.log(lastClickedPieceImageObj.id)
                    // console.log(intersects[0].object.id)

                    wasSomethingClicked = true
                }

                if (intersects[0].object != undefined)
                    lastClickedPieceImageObj = intersects[0].object
                else
                    lastClickedPieceImageObj = ""
            }


            else {
                console.log("Ruch jest blokowany")
                return
            }




            // lastClickedPositionLR = intersects[0].object.positionLR
            // lastClickedPositionRow = intersects[0].object.positionRow
        }




        //nadpisanie na undefined'a, jeżeli ten if sie wykonał
        if (wasSomethingClicked == true)
            lastClickedPieceImageObj = "" //w celu uniknięcia 3ciego kliku psującego
        wasSomethingClicked = false
        // console.log(lastClickedPieceImageObj)

    }

    pieceShuffling = () => {
        let receivedImages = []
        let receivedPositions = []
        console.log("SHUFFLING")
        let correctPieces = this.scene.children.filter(function (el) { return el.name == "clickable" })
        this.playerPiecesLeft = correctPieces
        // console.log(this.playerPiecesLeft)

        for (let i = 0; i < this.playerPiecesLeft.length; i++) {

            //nazwa zdjecia
            receivedImages.push(this.playerPiecesLeft[i].pieceID)

            //miejsce płytki
            let positionsObj = {
                positionLR: this.playerPiecesLeft[i].positionLR,
                positionRow: this.playerPiecesLeft[i].positionRow,
                positionHeight: this.playerPiecesLeft[i].positionHeight
            }
            receivedPositions.push(positionsObj)
            // console.log(positionsObj)

        }
        // console.log(receivedImages)
        // console.log(receivedPositions)

        this.abortAllPieces()
        this.rebuildBoard(receivedImages, receivedPositions)
    }

    abortAllPieces = () => {
        wasSomethingClicked = false
        lastClickedPieceImageObj = "" //errorDodge
        for (let i = this.scene.children.length; i > 0; i--) {
            let child = this.scene.children[i];
            // console.log(obj)
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
            // console.log(piece)
            piece.position.x = (positionRow * zmiennaX + 0.5 * zmiennaX);
            piece.position.y = (this.pieceH * positionHeight);
            piece.position.z = (positionLR * zmiennaZ + 0.5 * zmiennaZ);
            this.scene.add(piece)
        }

        // let positionLR = j
        // let positionRow = i

        // const piece = new Piece(this.playerID, pieceID, topMaterialPath, positionLR, positionRow, level);
        // // console.log(piece);
        // piece.position.x = (i * zmiennaX + 0.5 * zmiennaX);
        // piece.position.y = (pieceH * level); //pieceH + 3
        // piece.position.z = (j * zmiennaZ + 0.5 * zmiennaZ);
        // this.scene.add(piece);
        // imageCounterStrike++
    }

    render = () => {
        //console.log("render leci")        
        this.controls.update();

        //skalowanie renderera i kamery
        // console.log(window.innerHeight, window.innerWidth)

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render);
    }
}

export { Game };