<?php

include("../db/db.php");
if (isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);
    try {
        $showFollowers = new MyDatabase();
        $showFollowers->connectToDb();
        echo (json_encode($showFollowers->showFollowers($user["id"])));
    } catch (Exception $e) {
        echo (json_encode("Erreur : " . $e));
    }
}
