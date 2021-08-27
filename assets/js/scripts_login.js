// Importations
const axios = require("axios");
const { shell, ipcMain } = require("electron");
const ipc = require("electron").ipcRenderer;
const os = require('os');
const SHA256 = require("crypto-js/sha256");
// --------------------

// Avertissement console 
console.log("%c⚠ Attends !", "color: red; font-size: 28px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5)");
console.log("%cNe tape rien ici à moins que tu sois sûr(e) de ce que tu fais !", "color: red; font-size: 17px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);");
console.log("%cCopier-coller quelque chose dictée par un inconnu risque fortement d'être une arnaque !", "color: red; font-size: 17px; font-weight: 500; font-family: 'Roboto', sans-serif; text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5)");
// --------------------

// Var HTML
const emailInput = document.getElementById("email")
const passInput = document.getElementById("password")
const loginButton = document.getElementById("login-button")
// --------------------

// Clic sur le bouton Connexion ou Entrer
document.addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        login()
    }
})
loginButton.addEventListener("click", () => {
    login()
})
// --------------------

// Connexion
function login() {

    var login = {
        url: "https://www.undercrafts.eu/auth/getDataLauncher?username=" + emailInput.value + "&password=" + SHA256(passInput.value),
        method: "GET",
        // timeout: 0,
        // data: {
        //     pseudo: emailInput.value,
        //     password: SHA256(passInput.value)
        // }
    }

    if (emailInput.value && passInput.value) {

        loginButton.disabled = true
        loginButton.innerHTML = "Connexion en cours..."

        axios(login)
            .then(function (response) {

                if (response.data != "error_password") {

                    console.log("%c[Launcher]" + "%c [Connexion]" + "%c Connexion successful!", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");

                    console.log(response);

                    localStorage.setItem("password", SHA256(passInput.value));
                    localStorage.setItem("username", response.data.pseudo);
                    localStorage.setItem("email", response.data.email);
                    localStorage.setItem("uuid", response.data.uuid);

                    ipc.send("login")

                } else if (response.data == "error_password") {

                    console.log("%c[Launcher]" + "%c [Connexion]" + "%c Cannot connect: " + error, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");

                    document.getElementById("error-modal").style.display = "block"
                    document.getElementById("error-text").innerHTML = "Identifiants invalides !"

                    document.getElementById("close-modal-button").addEventListener("click", () => {
                        document.getElementById("error-modal").style.display = "none"
                        loginButton.disabled = false
                        loginButton.innerHTML = "Connexion"
                    })

                }

            })
            .catch(function (error) {
                console.log("%c[Launcher]" + "%c [Connexion]" + "%c Cannot connect: " + error, "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100");
                document.getElementById("error-modal").style.display = "block"
                if (error.response) {
                    document.getElementById("error-text").innerHTML = error.response
                } else {
                    document.getElementById("error-text").innerHTML = error
                }
                document.getElementById("close-modal-button").addEventListener("click", () => {
                    document.getElementById("error-modal").style.display = "none"
                    loginButton.disabled = false
                    loginButton.innerHTML = "Connexion"
                })
            })

    } else {

        console.log("%c[Launcher]" + "%c [Connexion]" + "%c Cannot connect: Empty credentials", "color: blue; font-weight: 1000", "color: black; font-weight: 700", "color: black; font-weight: 100")

        document.getElementById("error-modal").style.display = "block"
        document.getElementById("error-text").innerHTML = "Veuillez remplire tous les champs !"

        document.getElementById("close-modal-button").addEventListener("click", () => {
            document.getElementById("error-modal").style.display = "none"
            loginButton.disabled = false
            loginButton.innerHTML = "Connexion"
        })

    }

}
// --------------------

// Voir le MdP
var eye = 0
const eyeButton = document.getElementById("view-pwd")
eyeButton.addEventListener("click", () => {

    if (eye === 0) {
        eyeButton.innerHTML = "<i class='far fa-eye-slash'></i>"
        passInput.type = "text"
        eye = 1
    } else {
        eyeButton.innerHTML = "<i class='far fa-eye'></i>"
        passInput.type = "password"
        eye = 0
    }

})
// --------------------

// Ouverture liens
const buyButton = document.getElementById('buy-button');
buyButton.addEventListener('click', () => {
    shell.openExternal("https://www.undercrafts.eu/");
})

// const fpwLink = document.getElementById('fpw-link');
// fpwLink.addEventListener('click', () => {
//     shell.openExternal("https://www.minecraft.net/fr-fr/password/forgot");
// })
// --------------------