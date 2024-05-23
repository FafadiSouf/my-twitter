
<?php
include("../db/db.php");

$data = file_get_contents("php://input");
$user = json_decode($data, true);

$profileInfo = new MyDatabase();
$profileInfo->connectToDb();
$profileInfo->showProfileInfo($user["id"]);
echo json_encode($profileInfo->accountInfo);
