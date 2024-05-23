window.onload = function () {
    let result = document.getElementById("result");
    let url = window.location.href.split("?");
    let extension = url[1].split("=");
    let real = extension[1];
    let info = {
        "input": real
    };
    fetch("../modele/search.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                let d = document.createElement("div");
                d.style.border = "2px solid black";
                d.style.marginBottom = "12px";
                let b = document.createElement("img");
                b.src = "../" + element.photo_user;

                //create image ducoup (et div entiere , ou bien prend le template d'Alessia);
                let a = document.createElement("p");
                a.innerHTML = element.username;


                let ahref = document.createElement("a");
                ahref.href = "profile.html?id=" + element.id;
                ahref.innerHTML = "Go to profile";

                d.appendChild(b);
                d.appendChild(a);
                d.appendChild(ahref);
                result.appendChild(d);
            });
        })
        .catch(error => {
            alert(error);
        });
};