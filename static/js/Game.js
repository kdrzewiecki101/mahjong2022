// Koordynaty x, y, z

class Game {
    constructor() {
        this.floor = [];
        this.firstFloor = [];
        this.secondFloor = [];
        this.thirdFloor = [];
        this.fourthFloor = [];
        // scena 3D
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x0066ff);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.position.set(100, 100, 100);
        this.camera.lookAt(this.scene.position);
        this.axes = new THREE.AxesHelper(1000)
        this.scene.add(this.axes);
        this.createFloor();
        this.render();
    }
    createFloor = () => {
        console.log("Sleep on the floor");
    }
    render = () => {


        //w tym miejscu ustalamy wszelkie zmiany w projekcie (obrót, skalę, położenie obiektów)
        //np zmieniająca się wartość rotacji obiektu

        //mesh.rotation.y += 0.01;

        //wykonywanie funkcji bez końca, ok 60 fps jeśli pozwala na to wydajność maszyny

        requestAnimationFrame(render);

        // potwierdzenie w konsoli, że render się wykonuje

        console.log("render leci")

        //ciągłe renderowanie / wyświetlanie widoku sceny naszą kamerą

        renderer.render(scene, camera);
    }
}
