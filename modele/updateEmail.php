<?php

include("../db/db.php");
if (isset($_POST)) {
    try {
        $data = file_get_contents("php://input");
        $user = json_decode($data, true);
        $updateEmail = new MyDatabase();
        $updateEmail->connectToDb();
        $updateEmail->verifyEmail($user["newEmail"], $user["oldEmail"], $user["id"]);
        if ($updateEmail->emailVerified == true) {
            echo json_encode("good");
        } else {
            echo json_encode("bad");
        }
    } catch (Exception $e) {
        echo json_encode($e);
    }
}
