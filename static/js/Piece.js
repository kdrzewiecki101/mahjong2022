import * as THREE from '../js/three.module.js';
class Piece extends THREE.Mesh {
    constructor(playerID, pieceID) {

        super() //wywołanie konstruktora klasy
        this.playerID = playerID
        this.pieceID = pieceID
        this.geometry = new THREE.BoxGeometry(4.5, 2, 3.5); //potencjalnie wrzucić w zmienne wielkości

        // this.material = new THREE.MeshBasicMaterial({
        //     // side: THREE.DoubleSide,
        //     //map: new THREE.TextureLoader().load('../gfx/wind1.png'),
        //     wireframe: true,
        //     transparent: true,
        //     opacity: 1,
        //     color: 0x000000
        // });

        this.material = new THREE.MeshNormalMaterial({});

        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}

export { Piece } 