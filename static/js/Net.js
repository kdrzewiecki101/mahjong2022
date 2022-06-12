console.log("NET")
import { game, net, ui } from "../js/Main.js";

class Net {
    loginUser() {
        this.nickname = ui.nickname.value;
        // console.log(this.nickname);

        this.addUser()
        // this.staryWstal()
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
            // console.log(response.json)
            let jsonAdd = await response.json() // response.json
            console.log(jsonAdd)

            ui.wait(jsonAdd)
            return
        }
    }

    checkUsers = async () => {
        let check = false;
        const response = await fetch("/check")

        if (!response.ok) {
            return response.status
        }
        else {
            let jsonCheck = await response.json() // response.json
            return jsonCheck
        }

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