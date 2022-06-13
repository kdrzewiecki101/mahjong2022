console.log("NET")
import { game, net, ui } from "../js/Main.js";

class Net {
    loginUser() {
        this.nickname = ui.nickname.value;
        this.addUser()
    }

    addUser = async () => {
        const data = JSON.stringify({
            nickname: this.nickname
        })

        const options = {
            method: "POST",
            body: data,
        };

        let response = await fetch("/addUser", options)

        if (!response.ok)
            return response.status
        else {
            let jsonAdd = await response.json() // response.json
            console.log(jsonAdd)

            ui.wait(jsonAdd)
            return
        }
    }

    checkUsers = async () => {
        let check = false;
        const response = await fetch("/checkLogins")

        if (!response.ok) {
            return response.status
        }
        else {
            let jsonCheck = await response.json() // response.json
            return jsonCheck
        }
    }

    addWinner = async (playerID) => {
        const data = JSON.stringify({
            winnerID: playerID
        })

        const options = {
            method: "POST",
            body: data,
        };

        let response = await fetch("/addWinner", options)

        if (!response.ok)
            return response.status
        else {
            let jsonAdd = await response.json() // response.json
            // console.log(jsonAdd)
            return
        }
    }

    checkForWinner = () => {
        this.interval = setInterval(async () => {
            if (game.hasGameEnded) {
                console.log(game.gameOver())
                clearInterval(this.interval)
                this.addWinner(game.gameOver())
            }
        }, 1000)
    }

    checkWhoWon = async () => {
        this.interval2 = setInterval(async () => {
            const response = await fetch("/checkForWinner")

            if (!response.ok) {
                return response.status
            }
            else {
                let jsonCheck = await response.json() // response.json
                console.log(jsonCheck)
                clearInterval(this.interval2)

                if (game.playerID == jsonCheck.winner)
                    alert("ZWYCIĘZCA")
                else
                    alert("Przegryw")
                return jsonCheck

            }
        }, 1000)
    }


    reset = async () => {
        const response = await fetch("/reset")

        if (!response.ok) {
            return response.status
        }
        else {
            let jsonCheck = await response.json() // response.json
            game.hasGameStarted = false;
            console.log(jsonCheck)
            return jsonCheck
        }
    }

}

export { Net }