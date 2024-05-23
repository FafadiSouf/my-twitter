<?php
if(isset($_FILES["avatar"]["name"])){

    $target_dir = "../images/";
    $target_file = $target_dir . basename($_FILES["avatar"]["name"]);
    $uploadOk = 1;
    $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

    // Check if image file is a actual image or fake image
    if (isset($_POST["submit"])) {
        $check = getimagesize($_FILES["avatar"]["tmp_name"]);
        if ($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["avatar"]["size"] > 500000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if (
        $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif"
    ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["avatar"]["tmp_name"], $target_file)) {
            $extension = explode(".", basename($_FILES["avatar"]["name"]));
            $renamedAv = uniqid() . "." . $extension[1];
            rename($target_file, $target_dir . $renamedAv);
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}
if (isset($_FILES["banner"]["name"])) {
    $target_dir = "../images/";
    $target_file = $target_dir . basename($_FILES["banner"]["name"]);
    $uploadOk = 1;
    $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);

    // Check if image file is a actual image or fake image
    if (isset($_POST["submit"])) {
        $check = getimagesize($_FILES["banner"]["tmp_name"]);
        if ($check !== false) {
            echo "File is an image - " . $check["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }
    }

    // Check if file already exists
    if (file_exists($target_file)) {
        echo "Sorry, file already exists.";
        $uploadOk = 0;
    }

    // Check file size
    if ($_FILES["banner"]["size"] > 500000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Allow certain file formats
    if (
        $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif"
    ) {
        echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

    // Check if $uploadOk is set to 0 by an error
    if ($uploadOk == 0) {
        echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
    } else {
        if (move_uploaded_file($_FILES["banner"]["tmp_name"], $target_file)) {
            $extension = explode(".", basename($_FILES["banner"]["name"]));
            $renamedBan = uniqid() . "." . $extension[1];
            rename($target_file, $target_dir . $renamedBan);
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}
if(isset($_FILES["avatar"]["name"]) && isset($_FILES["banner"]["name"])){
    $arr = array("avatar" => $renamedAv, "banner" => $renamedBan);
    echo (json_encode($arr));
}else if (isset($_FILES["avatar"]["name"])){
    $arr = array("avatar" => $renamedAv);
    echo (json_encode($arr));
}else if (isset($_FILES["banner"]["name"])){
    $arr = array("banner" => $renamedBan);
    echo (json_encode($arr));
}