<?php

include("../db/db.php");
if (isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);
    $like = new MyDatabase();
    $like->connectToDb();
    $like->like($user["user_id"], $user["post_id"]);
}
