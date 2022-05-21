import { OrbitControls } from "../js/OrbitControls.js";
import { Board } from "../js/Board.js";
import * as THREE from '../js/three.module.js';

class Game {
    constructor() {
        this.floor = [];
        this.board = new Board();
        this.firstFloor = this.board.zeroFloor;
        this.secondFloor = [];
        this.thirdFloor = [];
        this.fourthFloor = [];
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
        this.createFloor(this.board.zeroFloor, 0);
        this.createFloor(this.board.firstFloor, 3.2);
        this.createFloor(this.board.secondFloor, 6.4);
        this.createFloor(this.board.thirdFloor, 9.6);
        this.createTopPiece();
        this.createSidewaysPieces();
        this.render();
    }
    createBoard = () => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
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
        // cube.position.x = (i * this.size - 35);
        // cube.position.z = (j * this.size - 35);
        cube.scale.set(75, 3, 75)
        this.scene.add(cube);
    }
    createFloor = (floor, h) => {
        for (let i = 0; i < floor.length; i++) {
            for (let j = 0; j < floor[i].length; j++) {
                if (floor[i][j] == 1) {
                    const geometry = new THREE.BoxGeometry(1, 1, 2);
                    // const material = new THREE.MeshBasicMaterial({
                    //     side: THREE.DoubleSide,
                    //     //map: new THREE.TextureLoader().load('../gfx/wind1.png'),
                    //     wireframe: true,
                    //     transparent: true,
                    //     opacity: 1,
                    //     color: 0x000000
                    // });
                    const material = new THREE.MeshNormalMaterial({});
                    const cube = new THREE.Mesh(geometry, material);
                    cube.position.x = (i * 5 - 17.5);
                    cube.position.y = (3 + h);
                    cube.position.z = (j * 5 - 32.5);
                    cube.scale.set(4.7, 3, 2.3);
                    this.scene.add(cube);
                }
            }
        }
    }
    createTopPiece = () => {
        const geometry = new THREE.BoxGeometry(1, 1, 2);
        const material = new THREE.MeshNormalMaterial({});
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = (3.5 * 5 - 17.5);
        cube.position.y = (15.8);
        cube.position.z = (6.5 * 5 - 32.5);
        cube.scale.set(4.7, 3, 2.3);
        this.scene.add(cube);
    }
    createSidewaysPieces = () => {
        const geometry = new THREE.BoxGeometry(1, 1, 2);
        const material = new THREE.MeshNormalMaterial({});
        const cube = new THREE.Mesh(geometry, material);
        cube.position.x = (3.5 * 5 - 17.5);
        cube.position.y = (3);
        cube.position.z = (0 * 5 - 32.5);
        cube.scale.set(4.7, 3, 2.3);
        this.scene.add(cube);
        const cube1 = new THREE.Mesh(geometry, material);
        cube1.position.x = (3.5 * 5 - 17.5);
        cube1.position.y = (3);
        cube1.position.z = (13 * 5 - 32.5);
        cube1.scale.set(4.7, 3, 2.3);
        this.scene.add(cube1);
    }
    render = () => {
        requestAnimationFrame(this.render);
        console.log("render leci")
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

}

export { Game };