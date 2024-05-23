window.onload = function () {
    let url = window.location.href.split("?");
    let extension = url[1].split("=");
    let real = extension[1];
    let info = {
        "id": real
    };
    let id = {
        "id": localStorage.getItem("id"),
        "idFollowed": real
    };
    fetch("../modele/Profile.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("profilePic").src = "../" + data.photo_user;
            document.getElementById("name").innerHTML = data.username;
            document.getElementById("birthdate").innerHTML = data.birthdate;
            document.getElementById("banner").src = "../" + data.banner;

            // alert(data);
        })
        .catch(error => {
            alert(error);
        });


    document.getElementById("searchBut").addEventListener("click", function () {
        if (document.getElementById("search").value == "") {
            alert("Veuillez écrire quelque chose");
        } else {
            document.location.replace("result.html?username=" + document.getElementById("search").value);
        }
    });

    document.getElementById("followButton").addEventListener("click", function () {

        fetch("../modele/Follow.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        })
            .then(response => response.json())
            .then(data => {
                alert("Abonnement changé !");
                checkFollow();
            })
            .catch(error => {
                alert(error);
            });
    });

    function checkFollow() {
        fetch("../modele/checkFollow.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(id)
        })
            .then(response => response.json())
            .then(data => {
                if (data == false) {
                    document.getElementById("followButton").innerText = "Follow";
                } else {
                    document.getElementById("followButton").innerText = "Unfollow";
                }
            })
            .catch(error => {
                alert(error);
            });
    }
    checkFollow();

    if(real == localStorage.getItem("id")){
        document.getElementById("followButton").style.display = "none";
        document.getElementById("profset").href = "ModifyProfile.html";
    }
};