window.onload = function () {

    document.forms.connectionForm.addEventListener("submit", function (e) {
        e.preventDefault();
        let user = {
            "email": document.getElementById("email").value,
            "password": document.getElementById("password").value
        }

        fetch("../modele/Connection.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                if (data["loginStatus"] === "Connection Réussie") {
                    localStorage.setItem("token", data["token"]);
                    localStorage.setItem("id", data["id"]);
                    document.location.replace("../view/Home.html");
                } else {
                    alert(data["loginStatus"]);
                }
            })
            .catch(error => {
                alert(error);
                console.error('Error during login request:', error);
            });

    })
}
