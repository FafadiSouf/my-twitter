<?php

include("../db/db.php");
if (isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);
    try {
        $showFollowed = new MyDatabase();
        $showFollowed->connectToDb();
        echo (json_encode($showFollowed->showFollowed($user["id"])));
    } catch (Exception $e) {
        echo (json_encode("Erreur : " . $e));
    }
}
