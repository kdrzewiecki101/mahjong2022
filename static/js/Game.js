import { OrbitControls } from "../js/OrbitControls";

class Game {
    constructor() {
        this.floor = [];
        this.firstFloor = [];
        this.secondFloor = [];
        this.thirdFloor = [];
        this.fourthFloor = [];
        // scena 3D
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.position.set(100, 100, 0);
        this.camera.lookAt(this.scene.position);
        this.axes = new THREE.AxesHelper(1000)
        this.scene.add(this.axes);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.update();
        this.createFloor();
        this.render();
    }
    createFloor = () => {
        console.log("Sleep on the floor");
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            //map: new THREE.TextureLoader().load('mats/floor.png'),
            wireframe: false,
            transparent: false,
            opacity: 0.3,
            color: 0x000000
        });
        const cube = new THREE.Mesh(geometry, material);
        // cube.position.x = (i * this.size - 35);
        // cube.position.z = (j * this.size - 35);
        cube.scale.set(100, 3, 100)
        this.scene.add(cube);
    }
    render = () => {
        requestAnimationFrame(this.render);
        console.log("render leci")
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

export { Game };