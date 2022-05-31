import { OrbitControls } from "../js/OrbitControls.js";
import { Board } from "../js/Board.js";
import * as THREE from '../js/three.module.js';
import { Piece } from "../js/Piece.js";
import { images, imagesLeft, startImages } from "../js/images.js"


//checkImagesLeft()




// console.log(images.length)
// console.log(images)

let zmiennaX = 4.6
let zmiennaZ = 3.6
let imageCounterStrike = 0

class Game {
    constructor() {
        this.hasGameStarted = false;
        this.yourLogin
        this.floor = [];
        this.board = new Board();
        this.firstFloor = this.board.zeroFloor;
        this.secondFloor = [];
        this.thirdFloor = [];
        this.fourthFloor = [];
        this.pieceH = 2.2;
        this.boards = new THREE.Group();
        // Scena3D
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.axes = new THREE.AxesHelper(1000)
        this.scene.add(this.axes);
        // Renderer
        this.renderer = new THREE.WebGLRenderer();
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
        this.createFloor(this.board.zeroFloor, this.pieceH * 1);
        this.createFloor(this.board.firstFloor, this.pieceH * 2);
        this.createFloor(this.board.secondFloor, this.pieceH * 3);
        this.createFloor(this.board.thirdFloor, this.pieceH * 4);
        this.createTopPiece(this.pieceH * 5);
        this.createSidewaysPieces(this.pieceH * 1);
        this.scene.add(this.boards);
        this.render();
    }

    start(login) {
        this.yourLogin = login.id
        console.log(login.id)
        console.log("YOUR LOGIN: " + this.yourLogin)
        if (login.id == 1) {
            console.log("PIERWSZY")
        }

        else {
            console.log("DRUGA")
        }


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



    createFloor = (floor, pieceH) => {
        for (let i = -4; i < Number(floor.length - 4); i++) {

            //console.log(floor)
            //console.log(floor[Number(i + 4)].length)

            for (let j = -7; j < Number(floor[i + 4].length); j++) {

                if (floor[i + 4][j + 7] == 1) {
                    let playerID = 3
                    console.log(j * i + i)
                    let imageOnTopName = startImages()[imageCounterStrike]
                    let topMaterialPath = `./gfx/${imageOnTopName}.png`;
                    let pieceID = imageOnTopName
                    console.log("TOP MATERIAL PATH: " + topMaterialPath)
                    const piece = new Piece(playerID, pieceID, topMaterialPath);
                    // console.log(piece);
                    piece.position.x = (i * zmiennaX + 0.5 * zmiennaX);
                    piece.position.y = (pieceH); //pieceH + 3

                    piece.position.z = (j * zmiennaZ + 0.5 * zmiennaZ);
                    // piece.scale.set(4.7, 3, 2.3);
                    this.scene.add(piece);
                    imageCounterStrike++
                }
            }
        }
        console.log(imageCounterStrike)
    }

    createTopPiece = (pieceH) => {
        let playerID = 3
        let imageOnTopName = startImages()[imageCounterStrike]
        let topMaterialPath = `./gfx/${imageOnTopName}.png`;
        let pieceID = imageOnTopName
        imageCounterStrike++
        const piece = new Piece(playerID, pieceID, topMaterialPath);
        piece.position.x = (0); //3.5 * 5 - 17.5
        piece.position.y = (pieceH);
        piece.position.z = (6.5 * 5 - 32.5);
        this.scene.add(piece);
    }
    createSidewaysPieces = (pieceH) => {
        let playerID = 3
        let imageOnTopNameL = startImages()[imageCounterStrike]
        let topMaterialPathL = `./gfx/${imageOnTopNameL}.png`;
        let pieceIDL = imageOnTopNameL
        imageCounterStrike++
        const leftPiece = new Piece(playerID, pieceIDL, topMaterialPathL)
        leftPiece.position.x = (0); //3.5 * 5 - 17.5
        leftPiece.position.y = (pieceH);
        leftPiece.position.z = (6 * zmiennaZ + 0.5 * zmiennaZ);
        this.scene.add(leftPiece);

        let imageOnTopNameR = startImages()[imageCounterStrike]
        let topMaterialPathR = `./gfx/${imageOnTopNameR}.png`;
        let pieceIDR = imageOnTopNameR
        imageCounterStrike++
        const rightPiece = new Piece(playerID, pieceIDR, topMaterialPathR)
        rightPiece.position.x = (0); //3.5 * 5 - 17.5
        rightPiece.position.y = (pieceH);
        rightPiece.position.z = (-7 * zmiennaZ + 0.5 * zmiennaZ);
        this.scene.add(rightPiece);
        let imageOnTopNameR2 = startImages()[imageCounterStrike]
        let topMaterialPathR2 = `./gfx/${imageOnTopNameR2}.png`;
        let pieceIDR2 = imageOnTopNameR
        imageCounterStrike++
        const rightPiece2 = new Piece(playerID, pieceIDR2, topMaterialPathR2)
        rightPiece2.position.x = (0); //3.5 * 5 - 17.5
        rightPiece2.position.y = (pieceH);
        rightPiece2.position.z = (-8 * zmiennaZ + 0.5 * zmiennaZ);
        this.scene.add(rightPiece2);
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
        console.log(intersects.length);
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
        this.raycaster.setFromCamera(this.pointer, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);
        // console.log(intersects.length)
        console.log(intersects[0].object.pieceID);
        //console.log(intersects[0].object)
        for (let i = 0; i < intersects.length; i++) {
            if (intersects.length > 0 && intersects[0].object.name == "clickable") {
                // console.log(intersects[0].object.id)
                intersects[0].object.material = new THREE.MeshBasicMaterial({
                    color: 0x00ff00, transparent: false,
                    opacity: 1,
                });
                //console.log(intersects[0].object);
            }
        }
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