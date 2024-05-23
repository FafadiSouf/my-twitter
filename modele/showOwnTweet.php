<?php

include("../db/db.php");
if (isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);
    try {
        $showOwnTweets = new MyDatabase();
        $showOwnTweets->connectToDb();
        echo (json_encode($showOwnTweets->showOwnTweets($user["id"])));
    } catch (Exception $e) {
        echo (json_encode("Erreur : " . $e));
    }
}
