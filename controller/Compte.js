window.onload = function () {
    if (localStorage.getItem("token") === null || localStorage.getItem("id") === null) {
        document.location.href = "Connection.html";
    } else {
        let signout = document.getElementById("signtoggle");
        signout.addEventListener("click", (e) => {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            location.reload();
            document.location.href = "Connection.html";
        });
    }

    let user = {
        "password": localStorage.getItem("token"),
        "id": localStorage.getItem("id")
    };

    fetch("../modele/Compte.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById("name").innerHTML = data.username;
            document.getElementById("birthdate").innerHTML = data.birthdate;
            document.getElementById("profilePic").src = "../" + data.pic;
            document.getElementById("banner").src = "../" + data.banniere;

        })
        .catch(error => {
            alert(error);
            console.error('Error during login request:', error);
        });

    document.getElementById("searchBut").addEventListener("click", function () {
        if (document.getElementById("search").value == "") {
            alert("Veuillez écrire quelque chose");
        } else {
            document.location.replace("result.html?username=" + document.getElementById("search").value);
        }
    });

    document.getElementById("personalBut").addEventListener("click", function () {
        document.getElementById("bottombox").innerHTML = "";
        fetch("../modele/showOwnTweet.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("bottombox").innerHTML = "";
                data.forEach(array => {
                    document.getElementById("bottombox").innerHTML += `<div class="onewholetweet w-1/2 py-1">
    <div class="inline-flex flex-col h-fit rounded bg-gray-50 dark:bg-gray-700 w-full p-2">
        <div class="flex border-b border-slate-300 align-middle max-h-1/4 max-w-1/4 pb-1">
            <img class="avatar rounded-full max-w-10 max-h-fit border dark:border-gray-50 border-gray-800"
                src="../` +
                    array.photo_user + 
                    `" alt="profile picture">
            <p class="username tweetid-` + array["0"] + ` self-center dark:text-white text-gray-900 pl-3 text-lg"><a href="Profil.html/id=` + array.user_id + `">@` + array.username + `</a></p>
            <p class="date self-center ml-auto dark:text-gray-300 text-gray-700 text-sm">` + new Date(array[5]).toDateString() + ` ` + new Date(array[5]).getHours() + `:` + new Date(array[5]).getMinutes() + `</p>
        </div>
        <div class="">
            <p class="tweetbody tweetid-` + array["0"] + ` dark:text-white text-gray-900">` + array.body + `</p>` +
                    // <img class="tweetbodyimg" src="` + array["image"] + `">
                    `</div>
    </div>
    <form name="response tweetid-` + array["0"] + `">
        <label for="chat" class="sr-only">Écrivez votre réponse...</label>
        <div class="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div
                class="flex relative p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                <label for="addresponseimg" class="w-5 h-5">
                <svg class="absolute top-auto left-auto w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 20 18">
                    <path fill="currentColor"
                        d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                </svg>
                </label>
                <input type="file" accept="image/*" class="addresponseimg tweetid-` + array["0"] + ` h-5 w-5 cursor-pointer z-10 opacity-0 absolute top-auto left-auto">
                <span class="sr-only">Ajouter une image</span>
            </div>
            <button type="button"
                class="like tweetid-` + array["0"] + ` p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
                <span class="sr-only">Liker</span>
            </button>
            <button type="button"
                class="retweet tweetid-` + array["0"] + ` p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
                <span class="sr-only">Rechanter</span>
            </button>
            <textarea rows="1"
                class="responsetext tweetid-` + array["0"] + ` block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Écrivez votre réponse..."></textarea>
            <button
                class="sendresponse tweetid-` + array["0"] + ` inline-flex justify-center p-2 text-gray-500 rounded-full cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor" viewBox="0 0 18 20">
                    <path
                        d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                </svg>
                <span class="sr-only">Envoyez le message</span>
            </button>
        </div>
    </form>
    <div class="showrep tweetid-` + array["0"] + ` flex-col h-fit rounded bg-gray-50 dark:bg-gray-700 w-full hidden">
    <p class="self-center dark:text-white text-gray-900 text-lg">Réponses</p>
    </div>
</div>`;

                });
            })
            .catch(error => {
                alert(error);
            });
    });
    document.getElementById("followedBut").addEventListener("click", function () {
        document.getElementById("bottombox").innerHTML = "";
        fetch("../modele/showFollowed.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("bottombox").innerHTML = "";
                data.forEach(element => {
                    let d = document.createElement("div");
                    d.style.border = "2px solid black";
                    d.style.margin = "8px";
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
                    document.getElementById("bottombox").appendChild(d);
                });
            })
            .catch(error => {
                alert(error);
            });
    });
    document.getElementById("followersBut").addEventListener("click", function () {
        document.getElementById("bottombox").innerHTML = "";
        fetch("../modele/showFollowers.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("bottombox").innerHTML = "";
                data.forEach(element => {
                    let d = document.createElement("div");
                    d.style.border = "2px solid black";
                    d.style.margin = "8px";
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
                    document.getElementById("bottombox").appendChild(d);
                });
            })
            .catch(error => {
                alert(error);
            });
    });
    document.getElementById("likesBut").addEventListener("click", function () {
        document.getElementById("bottombox").innerHTML = "dd";
    });
};