window.onload = function () {
    document.forms.changeEmailForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

        if (email.test(document.getElementById("newEmail").value) == false) {
            alert("Veuillez entrer un email correcte");
        } else {
            if (document.getElementById("oldEmail").value != "" && document.getElementById("newEmail").value != "") {
                let user = {
                    "oldEmail": document.getElementById("oldEmail").value,
                    "newEmail": document.getElementById("newEmail").value,
                    "id": localStorage.getItem("id")
                };

                fetch("../modele/updateEmail.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data === "good") {
                            alert("Email changé");
                            document.location.replace("AccountSettings.html");
                        } else {
                            alert("Mauvais Email entrée");
                        }
                    })
                    .catch(error => {
                        alert(error);
                    });
            }
        }
    });

    document.forms.changePasswordForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const password = new RegExp(/^(?=.*\d).{8,}$/);

        if (password.test(document.getElementById("newPassword").value) == false) {
            alert("Veuillez entrer un mot de passe correct (8 caractère et un chiffre)");
        } else {
            if (document.getElementById("oldPassword").value != "" && document.getElementById("newPassword").value != "") {
                let user = {
                    "oldPassword": document.getElementById("oldPassword").value,
                    "newPassword": document.getElementById("newPassword").value,
                    "id": localStorage.getItem("id")
                };

                fetch("../modele/updatePassword.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data === "good") {
                            alert("Mot de passe changé");
                            document.location.replace("AccountSettings.html");
                        } else {
                            alert("Mauvais mot de passe entrée");
                        }
                    })
                    .catch(error => {
                        alert(error);
                    });
            }
        }
    });
};