import * as THREE from '../js/three.module.js';
class Piece extends THREE.Mesh {
    constructor(playerID, pieceID, topMaterialPath, positionLR, positionRow, positionHeight) {
        super() //wywołanie konstruktora klasy
        this.playerID = playerID
        this.pieceID = pieceID
        this.name = "clickable";
        this.topMaterialPath = topMaterialPath;
        this.positionLR = positionLR;
        this.positionRow = positionRow;
        this.positionHeight = positionHeight;
        this.geometry = new THREE.BoxGeometry(4.5, 2, 3.15); //potencjalnie wrzucić w zmienne wielkości
        this.material = [];
        this.material.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('./gfx/side2.png') }));
        this.material.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('./gfx/side2.png') }));
        this.material.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load(`${this.topMaterialPath}`) })); //zamiast ścieżki, zmienna przekazana
        this.material.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('./gfx/side3.png') }));
        this.material.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('./gfx/side3.png') }));
        this.material.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load('./gfx/side3.png') }));
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }
}
export { Piece }

//ŁAJCIOR 2115s