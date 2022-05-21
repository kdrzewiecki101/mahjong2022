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
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x483d8b);
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
        this.createFloor();
        this.createBoard();
        this.render();
    }
    createFloor = () => {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            //map: new THREE.TextureLoader().load('../gfx/wind1.png'),
            wireframe: false,
            transparent: true,
            opacity: 1,
            // color: 0x000000
            color: 0xd2d2d2
        });
        const cube = new THREE.Mesh(geometry, material);
        // cube.position.x = (i * this.size - 35);
        // cube.position.z = (j * this.size - 35);
        cube.scale.set(70, 2, 70)
        this.scene.add(cube);
    }
    createBoard = () => {
        console.log(this.board.zeroFloor);
        for (let i = 0; i < this.board.zeroFloor.length; i++) {
            for (let j = 0; j < this.board.zeroFloor[i].length; j++) {
                if (this.board.zeroFloor[i][j] == 1) {
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
                    cube.position.y = (3);
                    cube.position.z = (j * 5 - 32.5);
                    cube.scale.set(4.7, 3, 2.3);
                    this.scene.add(cube);
                }
            }
        }
        for (let i = 0; i < this.board.firstFloor.length; i++) {
            for (let j = 0; j < this.board.firstFloor[i].length; j++) {
                if (this.board.firstFloor[i][j] == 1) {
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
                    cube.position.y = (6.2);
                    cube.position.z = (j * 5 - 32.5);
                    cube.scale.set(4.7, 3, 2.3);
                    this.scene.add(cube);
                }
            }
        }
    }
    render = () => {
        requestAnimationFrame(this.render);
        console.log("render leci")
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

}

export { Game };