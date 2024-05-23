//Afficher les tweet 
window.onload = function () {
    fetch("showtweet.php", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(element => {
                let div = document.createElement("div");
                div.innerText = element[1];
                document.body.appendChild(div);
                
                div.classList.add = (array.id); 
            });
        })
        .catch(err => console.log(err))

//Afficher les reponses du tweet
function showRep(){
    $reps = $db->query('SELECT * FROM post INNER JOIN user ON user_id = user.id WHERE body IS NOT NULL AND post_id IS NOT NULL ORDER BY created_at DESC;');
    return $reps;
}
}