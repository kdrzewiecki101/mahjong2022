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
            net.loginUser()
        }
        this.reset.onclick = () => {
            net.reset()
        }
    }

    wait(login) {
        if (login.added) {
            this.changeStatus.innerHTML = `<h2>Waiting for other player...</h2>`
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
            // console.log(check.ready)
            if (check.ready) {
                this.afterLogin(login, check.gameboardImagesRandomized)
            }
        }, 500)
    }

    afterLogin(login, gameboardImagesRandomized) {
        clearInterval(this.interval)
        game.start(login, gameboardImagesRandomized) //Odpalenie funkcji mówiącej którym graczem będiesz
        game.hasGameStarted = true;
        this.addiction.remove()
        this.loginInterface.remove()

        //Rozpoczęcie sprawdzania, czy ktoś nie wygrał
        //To można całe do net.js chyba wrzucić

        this.interval = setInterval(async () => {
            console.log("Wygrał ktoś?")
            if (game.hasGameEnded) {
                console.log("WYGRANA UI")
                // console.log(game.gameOver(game.playerID))
                game.gameOver(game.playerID) //Zakończenie gry
                clearInterval(this.interval)
            }
        }, 1000)

    }
}

export { Ui }