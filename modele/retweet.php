<?php

include("../db/db.php");

if (isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);
    $retweet = new MyDatabase();
    $retweet->connectToDb();
    $retweet->retweet($user["user_id"], $user["post_id"]);
}
