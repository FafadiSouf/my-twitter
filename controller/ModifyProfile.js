window.onload = function(){
    let info = {
        "id": localStorage.getItem("id")
    };

    fetch("../modele/showProfileInfo.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("email").innerHTML += data[0].email;
        })
        .catch(error => {
            alert(error);
        });
};