<?php

include("../db/db.php");
if (isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);
    if ($user["password"] != "" && $user["email"]) {
        try {
            $connection = new MyDatabase();
            $connection->connectToDb();
            $connection->dehashPassword($user["email"], $user["password"]);
            $connection->connection($user["email"]);
            echo (json_encode($connection->toEncode));
        } catch (Exception $e) {
            echo (json_encode("Erreur : " . $e));
        }
    } else {
        echo (json_encode("Info manquante"));
    }
}
