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
};