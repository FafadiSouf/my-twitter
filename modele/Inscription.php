<?php

include("../db/db.php");
if (isset($_POST)) {
    $data = file_get_contents("php://input");
    $user = json_decode($data, true);
    if ($user["password"] != "" && $user["email"] != "" && $user["username"] != "" && $user["birthdate"] != "" && $user["name"] != "") {
        try {
            $inscription = new MyDatabase();
            $inscription->connectToDb();
            $inscription->emailExists($user["email"]);
            $inscription->usernameExists($user["username"]);
            if (isset($user["avatarup"]) && isset($user["bannerup"])) {
                $inscription->inscription($user["username"], $user["name"], $user["birthdate"], $user["email"], $user["password"], $user["avatarup"], $user["bannerup"]);
            } elseif (isset($user["avatarup"])) {
                $inscription->inscription($user["username"], $user["name"], $user["birthdate"], $user["email"], $user["password"], $user["avatarup"]);
            } elseif ($user["bannerup"]) {
                $inscription->inscription($user["username"], $user["name"], $user["birthdate"], $user["email"], $user["password"], "default.jpg", $user["bannerup"]);
            } else {
                $inscription->inscription($user["username"], $user["name"], $user["birthdate"], $user["email"], $user["password"]);
            }
            echo (json_encode($inscription->signupStatus));
        } catch (Exception $e) {
            echo (json_encode("Erreur : " . $e));
        }
    } else {
        echo (json_encode("Info manquante"));
    }
}
