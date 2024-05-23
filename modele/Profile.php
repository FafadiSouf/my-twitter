<?php

$data = file_get_contents("php://input");
$user = json_decode($data, true);
include("../db/db.php");
if (isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);
    try {
        $profile = new MyDatabase();
        $profile->connectToDb();
        $profile->profile($user["id"]);
        $arr = array('photo_user' => $profile->profileFetch["photo_user"],
        'username' => $profile->profileFetch["username"], 'banner' => $profile->profileFetch["banniere_user"],
         'birthdate' => $profile->profileFetchAge["day"] . "/" . $profile->profileFetchAge["month"]);
        echo (json_encode($arr));
    } catch (Exception $e) {
        echo (json_encode("Erreur : " . $e));
    }
}
