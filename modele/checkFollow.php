<?php

include("../db/db.php");
if (isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);
    try {
        $checkFollow = new MyDatabase();
        $checkFollow->connectToDb();
        $checkFollow->checkFollow($user["id"], $user["idFollowed"]);
        echo (json_encode($checkFollow->checkfollow));
    } catch (Exception $e) {
        echo ("Erreur : " . $e);
    }
}
