console.log("MAIN")
import { Game } from "../js/Game.js";
import { Net } from "../js/Net.js";
import { Ui } from "../js/Ui.js";

let game;
let net;
let ui;
window.onload = () => {
    game = new Game();
    net = new Net();
    ui = new Ui();

    document.addEventListener("keypress", function (event) {
        console.log(event.keyCode)
        if (event.keyCode == 114) {
            net.showResults()
        }
        if (event.keyCode == 115) {
            game.pieceShuffling()
        }
    });
};

export { game, net, ui }