window.onload = function () {
    localStorage.removeItem("imgname");
    var inputArray = document.querySelectorAll("input");
    inputArray.forEach(element => {
        element.value = null;
    });

    document.getElementById("avatarup").addEventListener("change", function () {
        var input = document.getElementById("avatarup");
        var fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function (event) {
            var img = document.getElementById("avatar");
            img.src = event.target.result;
        };
    });

    document.getElementById("bannerup").addEventListener("change", function () {
        var input = document.getElementById("bannerup");
        var fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function (event) {
            var img = document.getElementById("banner");
            img.src = event.target.result;
        };
    });


    document.forms.inscriptionForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const email = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        const password = new RegExp(/^(?=.*\d).{8,}$/);


        function insFetch(user) {
            fetch("../modele/Inscription.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
                .then(data => {
                    if (data === "Inscription Réussie") {
                        alert(data);
                        document.location.replace("Connection.html");
                    } else {
                        alert(data);
                    }
                })
                .catch(error => {
                    alert(error);
                    console.error('Error during login request:', error);
                });
        }

        let user = {
            "username": document.getElementById("username").value,
            "name": document.getElementById("name").value,
            "birthdate": document.getElementById("birthdate").value,
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value,
        };

        let inputs = document.querySelectorAll("input");
        let empty = 0;
        inputs.forEach((input) => {
            input.style.border = "transparent";
            if (input.name != "avatar" && input.name != "banner" && input.value === "") {
                input.style.border = "1px solid red";
                empty += 1;
            }
        });
        if (empty > 0) {
            alert("Veuillez compléter ce champ.");
        }

        if (document.getElementById("avatarup").value != "") {
            let UpdatedAvatar = document.getElementById("avatarup").value;
            UpdatedAvatar = UpdatedAvatar.substr(12);
            UpdatedAvatar = "images/" + UpdatedAvatar;
        }
        const today = new Date();
        const minor = new Date(today);
        minor.setFullYear(today.getFullYear() - 15);
        const tooold = new Date(today);
        tooold.setFullYear(today.getFullYear() - 100);
        if (empty === 0) {
            const birthdate = new Date(document.getElementById("birthdate").value);
            if (birthdate > minor || birthdate < tooold) {
                birthdate.style.border = "1px solid red";
                alert("Date de naissance invalide.");
            } else if (email.test(document.getElementById("email").value) == false) {
                document.getElementById("email").style.border = "1px solid red";
                alert("Veuillez entrer un email correcte.");
            } else if (password.test(document.getElementById("password").value) == false) {
                document.getElementById("password").style.border = "1px solid red";
                alert("Veuillez entrer un mot de passe correct (8 caractères et au moins 1 chiffre).");
            } else {
                if(document.getElementById("bannerup").value != "" && document.getElementById("avatarup").value != ""){
                    let form = new FormData(document.forms.inscriptionForm);
                    fetch("../modele/saveImg.php", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json"
                        },
                        body: form
                    })
                        .then(response => response.json())
                        .then(data => {
                            user.avatarup = data.avatar;
                            user.bannerup = data.banner;
                            console.log(user);
                            insFetch(user);
                        });
                } else if (document.getElementById("bannerup").value != "") {
                    let form = new FormData(document.forms.inscriptionForm);
                    fetch("../modele/saveImg.php", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json"
                        },
                        body: form
                    })
                        .then(response => response.json())
                        .then(data => {
                            user.bannerup = data.banner;
                            insFetch(user);
                        });
                } else if(document.getElementById("avatarup").value != ""){
                    let form = new FormData(document.forms.inscriptionForm);
                    console.log(form);
                    fetch("../modele/saveImg.php", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json"
                        },
                        body: form
                    })
                        .then(response => response.json())
                        .then(data => {
                            user.avatarup = data.avatar;
                            insFetch(user);
                        });
                } 
                else {
                    insFetch(user);
                }
            }
        }
    });
};
