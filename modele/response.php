<?php

include("../db/db.php");

if (isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);
    $tweet = new MyDatabase();
    $tweet->connectToDb();
    $tweet->response($user["body"], $user["user_id"], $user["post_id"]);
}
