<?php

include("../db/db.php");
if (isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);
    try {
        $follow = new MyDatabase();
        $follow->connectToDb();
        $follow->follow($user["id"], $user["idFollowed"]);
        echo (json_encode("good"));
    } catch (Exception $e) {
        echo (json_encode("Erreur : " . $e));
    }
}
