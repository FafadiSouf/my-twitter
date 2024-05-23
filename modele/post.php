<?php

include("../db/db.php");
$post = new MyDatabase();
$post->connectToDb();
$post->loadtweet();
echo json_encode($post->loadtweet());
