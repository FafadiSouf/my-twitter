<?php

include("../db/db.php");
$post = new MyDatabase();
$post->connectToDb();
$post->loadRep();
echo json_encode($post->loadRep());
