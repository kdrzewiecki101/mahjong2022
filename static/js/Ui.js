console.log("UI")
import { game, net, ui } from "../js/Main.js";

class Ui {
    constructor() {
        this.nickname = document.getElementById("nickname")
        this.login = document.getElementById("logBt")
        this.reset = document.getElementById("resetBt")
        this.waiting = document.getElementById("waiting")
        this.loginInterface = document.getElementById("ui")
        this.addiction = document.getElementById("addiction")
        this.changeStatus = document.getElementById("working")

        this.login.onclick = () => {
            // console.log(this.nickname.value)
            net.loginUser()
        }
        this.reset.onclick = () => {
            net.reset()
        }
    }

    wait(login) {
        if (login.added) {
            // console.log("oczekiwanie na drugiego gracza")
            // this.loginInterface.children.remove() //usunięcie UI w celu zablokowania możliwości
            this.changeStatus.innerHTML = `<h2>Waiting for other player...</h2>`
            // console.log("HERE::::: " + game.hasGameStarted)
        }

        else if (login.id == "error") {
            alert("Player with this nickname already exists!")
            return
        }

        else {
            alert("Too many players!")
            return
        }

        if (login.id == 1) {
            console.log("gracz pierwszy")
        }

        if (login.id == 2) {
            console.log("gracz drugi")
        }

        this.interval = setInterval(async () => {
            let check = await net.checkUsers()
            console.log(check.ready)
            if (check.ready) {
                this.afterLogin(login, check.gameboardImagesRandomized)
                // console.log(check.gameboardImagesRandomized)
                //przekazać parametr check.gameboardImagesRandomized do klasy game i na podstawie jego wgenerować dla każdego gracza plansze
                //Dodać później do pliku Game fetcha odpowiedzialnego za reset wszystkih paametrow
                //plansza, obrazki losowe, luje muje dziekie węze
            }
        }
            , 500)
    }

    afterLogin(login, gameboardImagesRandomized) {
        clearInterval(this.interval)
        console.log(login)
        game.start(login, gameboardImagesRandomized) //Odpalenie funkcji mówiącej którym graczem będiesz
        // console.log("ZOBA TU TERA:")
        // console.log(game.hasGameStarted)
        game.hasGameStarted = true;
        // console.log("PO ZMIANIE: ")
        // console.log(game.hasGameStarted)
        this.addiction.remove()
        this.loginInterface.remove()
    }
}

export { Ui }