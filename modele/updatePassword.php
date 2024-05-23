<?php

include("../db/db.php");
if (isset($_POST)) {
    try {
        $data = file_get_contents("php://input");
        $user = json_decode($data, true);
        $updatePassword = new MyDatabase();
        $updatePassword->connectToDb();
        $updatePassword->verifyPassword($user["newPassword"], $user["oldPassword"], $user["id"]);
        if ($updatePassword->passwordVerified == true) {
            echo json_encode("good");
        } else {
            echo json_encode("bad");
        }
    } catch (Exception $e) {
        echo json_encode($e);
    }
}
