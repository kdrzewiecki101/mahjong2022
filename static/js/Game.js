import { OrbitControls } from "../js/OrbitControls.js";
import { Board } from "../js/Board.js";
import * as THREE from '../js/three.module.js';
import { Piece } from "../js/Piece.js";

class Game {
    constructor() {
        this.floor = [];
        this.board = new Board();
        this.firstFloor = this.board.zeroFloor;
        this.secondFloor = [];
        this.thirdFloor = [];
        this.fourthFloor = [];
        this.pieceH = 3.2
        // scena 3D
        this.scene = new THREE.Scene();
        this.scene.background = "../gfx/forest.jpg";
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x483d8b);
        this.renderer.setClearAlpha(0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.position.set(100, 100, 0);
        console.log(this.camera);
        this.camera.lookAt(this.scene.position);
        this.axes = new THREE.AxesHelper(1000)
        this.scene.add(this.axes);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enablePan = false;
        this.controls.maxDistance = 80;
        this.controls.update();
        this.createBoard();
        this.createFloor(this.board.zeroFloor, this.pieceH * 0);
        this.createFloor(this.board.firstFloor, this.pieceH * 1);
        this.createFloor(this.board.secondFloor, this.pieceH * 2);
        this.createFloor(this.board.thirdFloor, this.pieceH * 3);
        this.createTopPiece();
        this.createSidewaysPieces();
        this.render();
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
            console.log(floor)
            console.log(floor[Number(i + 4)].length)
            for (let j = -7; j < Number(floor[i + 4].length); j++) {
                if (floor[i + 4][j + 7] == 1) {
                    let playerID = 3
                    let pieceID = j + "a" + i
                    const piece = new Piece(playerID, pieceID)
                    piece.position.x = (i * 5 + 2.5);
                    piece.position.y = (pieceH + 3); //pieceH + 3
                    console.log(pieceH)
                    piece.position.z = (j * 5 + 2.5);
                    // piece.scale.set(4.7, 3, 2.3);
                    this.scene.add(piece);
                }
            }
        }
    }
    createTopPiece = () => {
        let playerID = 3
        let pieceID = "bandit"
        const piece = new Piece(playerID, pieceID)
        piece.position.x = (3.5 * 5 - 17.5);
        piece.position.y = (15.8);
        piece.position.z = (6.5 * 5 - 32.5);
        // piece.scale.set(4.7, 3, 2.3);
        this.scene.add(piece);
    }
    createSidewaysPieces = () => {
        let playerID = 3
        let pieceIDL = "LeftBanditos"
        const leftPiece = new Piece(playerID, pieceIDL)
        leftPiece.position.x = (3.5 * 5 - 17.5);
        leftPiece.position.y = (3);
        leftPiece.position.z = (13 * 5 - 32.5);
        // leftPiece.scale.set(4.7, 3, 2.3);
        this.scene.add(leftPiece);

        let pieceIDR = "RightBanditos"
        const rightPiece = new Piece(playerID, pieceIDR)
        rightPiece.position.x = (3.5 * 5 - 17.5);
        rightPiece.position.y = (3);
        rightPiece.position.z = (0 * 5 - 32.5);
        // rightPiece.scale.set(4.7, 3, 2.3);
        this.scene.add(rightPiece);
    }
    render = () => {
        requestAnimationFrame(this.render);
        console.log("render leci")
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

}

export { Game };