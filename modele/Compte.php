<?php

include("../db/db.php");
if (isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);
    $compte = new MyDatabase();
    $compte->connectToDb();
    $compte->verifyToken($user["id"], $user["password"]);
    $compte->account($user["id"]);
    echo (json_encode($compte->account($user["id"])));
}
