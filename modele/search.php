<?php

include("../db/db.php");
if (isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);
    try {
        $search = new MyDatabase();
        $search->connectToDb();
        echo (json_encode($search->search($user["input"])));
    } catch (Exception $e) {
        echo (json_encode("Erreur : " . $e));
    }
}
