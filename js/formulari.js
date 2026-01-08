/*************************************************************/
/* Formulari - Programació d’Aplicacions a Internet          */
/*************************************************************/
console.log("JS PUTO CARREGAT")
// Quan la pàgina s'ha carregat
document.addEventListener("DOMContentLoaded", function () {

    // Accés als elements del formulari
    let formulari = document.getElementById("formulari");

    let nom = document.getElementById("nom");
    let edat = document.getElementById("edat");
    let cp = document.getElementById("cp");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let password2 = document.getElementById("password2");
    let privacitat = document.getElementById("privacitat");

    let resultat = document.getElementById("resultat");

    /**************** FUNCIONS DE VALIDACIÓ *******************/

    function validaNom() {
        let text = nom.value.trim();
        if (text === "") {
            mostraError("errorNom", "Camp obligatori");
            return false;
        }

        let paraules = text.split(" ");
        for (let i = 0; i < paraules.length; i++) {
            if (paraules[i].length > 0) {
                paraules[i] =
                    paraules[i][0].toUpperCase() +
                    paraules[i].substring(1).toLowerCase();
            }
        }
        nom.value = paraules.join(" ");
        mostraError("errorNom", "");
        return true;
    }

    function validaEdat() {
        if (edat.value === "") {
            mostraError("errorEdat", "Selecciona una opció");
            return false;
        }
        mostraError("errorEdat", "");
        return true;
    }

    function validaCP() {
        let text = cp.value;
        if (text.length !== 5) {
            mostraError("errorCP", "Han de ser 5 dígits");
            return false;
        }

        for (let i = 0; i < text.length; i++) {
            if (text[i] < '0' || text[i] > '9') {
                mostraError("errorCP", "Només números");
                return false;
            }
        }
        mostraError("errorCP", "");
        return true;
    }

    function validaEmail() {
        let text = email.value;
        let arroves = 0;
        let punt = false;

        for (let i = 0; i < text.length; i++) {
            if (text[i] === "@") arroves++;
            if (arroves === 1 && text[i] === ".") punt = true;
        }

        if (arroves !== 1 || !punt) {
            mostraError("errorEmail", "Email incorrecte");
            return false;
        }
        mostraError("errorEmail", "");
        return true;
    }

    function validaPassword() {
        let text = password.value;
        let maj = 0, min = 0, dig = 0, esp = 0;
        let especials = "!@#$%^&*()_+[]-={};:\\|,.<>/?";

        if (text.length < 8) {
            mostraError("errorPassword", "Mínim 8 caràcters");
            return false;
        }

        for (let i = 0; i < text.length; i++) {
            let c = text[i];
            if (c >= 'A' && c <= 'Z') maj++;
            else if (c >= 'a' && c <= 'z') min++;
            else if (c >= '0' && c <= '9') dig++;
            else if (especials.includes(c)) esp++;
        }

        if (maj < 1 || min < 1 || dig < 2 || esp < 1) {
            mostraError("errorPassword", "Contrasenya no vàlida");
            return false;
        }

        mostraError("errorPassword", "");
        return true;
    }

    function validaPassword2() {
        if (password.value !== password2.value) {
            mostraError("errorPassword2", "No coincideixen");
            return false;
        }
        mostraError("errorPassword2", "");
        return true;
    }

    function validaPrivacitat() {
        if (!privacitat.checked) {
            mostraError("errorPrivacitat", "Cal acceptar-la");
            return false;
        }
        mostraError("errorPrivacitat", "");
        return true;
    }

    function mostraError(id, text) {
        document.getElementById(id).innerText = text;
    }

    /**************** EVENTS **********************************/

    nom.addEventListener("blur", validaNom);
    edat.addEventListener("change", validaEdat);

    cp.addEventListener("input", validaCP);
    cp.addEventListener("blur", validaCP);

    email.addEventListener("input", validaEmail);
    email.addEventListener("blur", validaEmail);

    password.addEventListener("input", validaPassword);
    password.addEventListener("blur", validaPassword);

    password2.addEventListener("input", validaPassword2);
    password2.addEventListener("blur", validaPassword2);

    privacitat.addEventListener("change", validaPrivacitat);

    /**************** SUBMIT **********************************/

    formulari.addEventListener("submit", function (e) {
        e.preventDefault();

        let okNom = validaNom();
        let okEdat = validaEdat();
        let okCP = validaCP();
        let okEmail = validaEmail();
        let okPass = validaPassword();
        let okPass2 = validaPassword2();
        let okPriv = validaPrivacitat();

        if (okNom && okEdat && okCP && okEmail && okPass && okPass2 && okPriv) {
            resultat.innerHTML =
                "<h3>Formulari correcte</h3>" +
                "<p><b>Nom:</b> " + nom.value + "</p>" +
                "<p><b>Edat:</b> " + edat.value + "</p>" +
                "<p><b>CP:</b> " + cp.value + "</p>" +
                "<p><b>Email:</b> " + email.value + "</p>";
        } else {
            resultat.innerHTML = "<h3>Formulari incorrecte</h3>";
        }
    });

});

