import * as THREE from '../js/three.module.js';
class Button extends THREE.Mesh {
    constructor(buttonID, topMaterialPath) {
        super()
        this.buttonID = buttonID
        this.name = "clickable";
        this.topMaterialPath = topMaterialPath;
        this.geometry = new THREE.BoxGeometry(50, 5, 40);
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
export { Button };