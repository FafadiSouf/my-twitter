<?php

class MyDatabase
{
    protected $db;
    protected $emailExist;
    protected $usernameExist;
    protected $isPasswordGood;
    protected $htagword;
    public $loginStatus;
    public $signupStatus;
    public $toEncode;
    public $isTokenGood;
    public $info;
    public $post;
    public $accountInfo;
    public $emailVerified;
    public $passwordVerified;
    public $exists;
    public $checkfollow;
    public $profileFetch;
    public $profileFetchAge;

    public function connectToDb()
    {
        $this->db = new PDO('mysql:host=localhost;dbname=my_twitter;charset=utf8', 'twit', 'twit');
    }

    public function emailExists($email)
    {
        $myquery = $this->db->query('SELECT email from user where email = "' . $email . '";');
        $myfetch = $myquery->fetch();
        if ($myfetch == "") {
            $this->emailExist = false;
        } else {
            $this->emailExist = true;
            $this->signupStatus = "Email déjà enregistré";
        }
    }

    public function usernameExists($username)
    {
        $myquery = $this->db->query('SELECT username from user where username = "' . $username . '";');
        $myfetch = $myquery->fetch();
        if ($myfetch == "") {
            $this->usernameExist = false;
        } else {
            $this->usernameExist = true;
            $this->signupStatus = "Nom d'utilisateur déjà enregistré";
        }
    }

    public function hashPassword($password)
    {
        $salt = "vive le projet tweet_academy";
        $user_input = $password;
        $hashed = crypt($user_input, $salt);
        $secondHash = hash('ripemd160', $hashed);
        $phash = password_hash($secondHash, PASSWORD_DEFAULT);
        return $phash;
    }

    public function dehashPassword($email, $password)
    {
        $myquery = $this->db->query('SELECT pass FROM user WHERE email = "' . $email . '"');
        $myfetch = $myquery->fetch();
        $phash = $myfetch["pass"];
        $salt = "vive le projet tweet_academy";
        if (password_verify(hash('ripemd160', crypt($password, $salt)), $phash) == true) {
            $this->isPasswordGood = true;
        } else {
            $this->isPasswordGood = false;
        }
    }



    public function inscription($u, $n, $b, $e, $p, $a = "default.jpg", $ban = "defaultbanner.jpg")
    {
        try {
            $upAvatar = "images/" . $a;
            $upBanner = "images/" . $ban;
            if ($this->emailExist != true && $this->usernameExist != true) {
                $myquery = $this->db->query('INSERT into user(username,name,photo_user,banniere_user
                ,birthdate,email,pass,created_at,status)values("' . $u . '","' . $n . '","' . $upAvatar . '"
                , "' . $upBanner . '","' . $b . '","' . $e . '","' . $this->hashPassword($p) . '",NOW(),"ACTIVE");');
                $this->signupStatus = "Inscription Réussie";
            }
        } catch (Exception $e) {
            return $e;
        }
    }

    public function connection($email)
    {
        if ($this->isPasswordGood == true) {
            $myquery = $this->db->query('SELECT id FROM user WHERE email = "' . $email . '"');
            $myfetch = $myquery->fetch();

            $this->loginStatus = "Connection Réussie";
            $connectionToken = password_hash(crypt("token", $myfetch["id"]), PASSWORD_DEFAULT);
            $this->toEncode = array("loginStatus" => $this->loginStatus, "token" => $connectionToken,
             "id" => $myfetch["id"]);
        } else {
            $this->loginStatus = "Connection échoué";
            $connectionToken = "";
            $myfetch["id"] = "";
            $this->toEncode = array("loginStatus" => $this->loginStatus, "token" => $connectionToken, $myfetch["id"]);
        }
    }

    public function verifyToken($id, $token)
    {
        if (password_verify(crypt("token", $id), $token) == true) {
            $this->isTokenGood = true;
        } else {
            $this->isTokenGood = false;
        }
    }

    public function account($id)
    {
        if ($this->isTokenGood == true) {
            $myqueryage = $this->db->query('SELECT DAY(birthdate) as "day" ,MONTH(birthdate)
             as "month" FROM user WHERE id = "' . $id . '"');
            $myfetchage = $myqueryage->fetch();
            $myquery = $this->db->query('SELECT photo_user,banniere_user,username,birthdate 
            FROM user WHERE id = "' . $id . '"');
            $myfetch = $myquery->fetch();
            $this->info = array('username' => $myfetch["username"], 'banniere' => $myfetch["banniere_user"]
            , 'birthdate' => $myfetchage["day"] . "/" . $myfetchage["month"], 'pic' => $myfetch["photo_user"]);
            return $this->info;
        }
    }

    public function tweet($body, $id)
    {
        $this->exists = false;
        try {
            if (str_contains($body, "#")) {
                $arr = explode(" ", $body);
                foreach ($arr as $k => $word) {
                    if (str_contains($word, "#")) {
                        $this->htagword = $word;
                        $this->exists = true;
                    }
                }
            }
            $this->db->query('INSERT INTO post (body, user_id,status, created_at) VALUES
             ("' . $body . '", "' . $id . '","ACTIVE", NOW());');

            if ($this->exists === true) {
                $query = $this->db->query('SELECT id from post order by id DESC limit 1;');
                $myfetch = $query->fetch();
                $id = $myfetch["id"];
                $queryhtag = $this->db->query('SELECT body from htag where body = "' . $this->htagword . '";');
                $fetchtag = $queryhtag->fetch();
                if ($fetchtag == "") {
                    print("empty");
                    $this->db->query('INSERT INTO htag (body) VALUES ("' . $this->htagword . '");');
                }
                $queryid = $this->db->query('SELECT id from htag where body = "' . $this->htagword . '";');
                $fetchid = $queryid->fetch();
                $this->db->query('INSERT INTO joinhtag (htag_id, post_id) VALUES 
                ("' . $fetchid["id"] . '", "' . $id . '");');
            }
        } catch (Exception $e) {
            return $e;
        }
    }

    public function loadtweet()
    {
        $myquery = $this->db->query('SELECT * FROM post INNER JOIN user ON post.user_id
         = user.id WHERE body IS NOT NULL AND post.status = "ACTIVE" AND post.post_id IS 
         NULL ORDER BY post.created_at DESC;');
        $myfetch = $myquery->fetchAll();
        $this->post = $myfetch;
        return $this->post;
    }

    public function showProfileInfo($id)
    {
        $myquery = $this->db->query('SELECT * from user where id = "' . $id . '"');
        $myfetch = $myquery->fetchAll();
        $this->accountInfo = $myfetch;
        return $myfetch;
    }

    public function verifyEmail($emailUpdate, $email, $id)
    {
        $myquery = $this->db->query('SELECT email FROM user where id = "' . $id . '"');
        $myfetch = $myquery->fetch();
        if ($myfetch["email"] === $email) {
            $this->emailVerified = true;
            $this->updateEmail($emailUpdate, $id);
        } else {
            $this->emailVerified = false;
            return "False email";
        }
    }

    public function updateEmail($email, $id)
    {
        $myquery = $this->db->query('UPDATE user SET email = "' . $email . '" where id = "' . $id . '"');
    }

    public function verifyPassword($passwordUpdate, $password, $id)
    {
        $myquery = $this->db->query('SELECT pass FROM user where id = "' . $id . '"');
        $myfetch = $myquery->fetch();
        $phash = $myfetch["pass"];
        $salt = "vive le projet tweet_academy";
        if (password_verify(hash('ripemd160', crypt($password, $salt)), $phash) == true) {
            $this->passwordVerified = true;
            $this->updatePassword($passwordUpdate, $id);
        } else {
            $this->passwordVerified = false;
            return "False password";
        }
    }

    public function updatePassword($password, $id)
    {
        $salt = "vive le projet tweet_academy";
        $user_input = $password;
        $hashed = crypt($user_input, $salt);
        $secondHash = hash('ripemd160', $hashed);
        $phash = password_hash($secondHash, PASSWORD_DEFAULT);

        $myquery = $this->db->query('UPDATE user SET pass = "' . $phash . '" where id = "' . $id . '"');
    }

    public function like($userid, $postid)
    {
        try {
            $this->db->query('INSERT INTO likes (user_id, post_id, created_at) 
            VALUES ("' . $userid . '","' . $postid . '", NOW());');
        } catch (Exception $e) {
            return $e;
        }
    }

    public function retweet($userid, $postid)
    {

        try {
            $this->db->query('INSERT INTO post (user_id, post_id, status, created_at) 
            VALUES ("' . $userid . '", "' . $postid . '","ACTIVE", NOW());');
        } catch (Exception $e) {
            return $e;
        }
    }

    public function response($body, $userid, $postid)
    {

        try {
            $this->db->query('INSERT INTO post (body, user_id, post_id, status, created_at) 
            VALUES ("' . $body . '", "' . $userid . '", "' . $postid . '","ACTIVE", NOW());');
        } catch (Exception $e) {
            return $e;
        }
    }

    public function loadRep()
    {
        $myquery = $this->db->query('SELECT * FROM post INNER JOIN user ON post.user_id 
        = user.id WHERE body IS NOT NULL AND post.status = "ACTIVE" AND post.post_id IS NOT
         NULL ORDER BY post.created_at ASC;');
        $myfetch = $myquery->fetchAll();
        $this->post = $myfetch;
        return $this->post;
    }

    public function checkFollow($id, $followed)
    {
        $queryfollow = $this->db->query("SELECT * from follow where follower_user_id 
        = '" . $id . "' AND followed_user_id = '" . $followed . "';");
        $fetch = $queryfollow->fetch();
        $this->checkfollow = $fetch;
    }

    public function follow($id, $followed)
    {
        $queryfollow = $this->db->query("SELECT * from follow where follower_user_id
         = '" . $id . "' AND followed_user_id = '" . $followed . "';");
        $fetch = $queryfollow->fetch();

        if ($fetch == "") {
            $query = $this->db->query('INSERT INTO follow(follower_user_id, 
            followed_user_id, followed_created_at) VALUES ("' . $id . '","' . $followed . '"
            ,NOW());');
        } else {
            $querydel = $this->db->query('DELETE FROM follow where follower_user_id
             =  "' . $id . '" AND followed_user_id = "' . $followed . '";');
        }
    }

    public function profile($id)
    {
        $query = $this->db->query("select banniere_user,photo_user,username from user where id = '" . $id . "';");
        $queryage = $this->db->query('SELECT DAY(birthdate) as "day" ,MONTH(birthdate) 
        as "month" FROM user WHERE id = "' . $id . '"');
        $fetchage = $queryage->fetch();
        $fetch = $query->fetch();
        $this->profileFetch = $fetch;
        $this->profileFetchAge = $fetchage;
    }

    public function search($input)
    {
        $query = $this->db->query("select id,photo_user,username from user where username like '" . $input . "%';");
        return $query->fetchAll();
    }

    public function showFollowed($id)
    {
        $query = $this->db->query("select followed_user_id from follow where follower_user_id = '" . $id . "%';");
        $fetch = $query->fetchAll();
        $arr = array();
        foreach ($fetch as $element) {
            $queryfollowed = $this->db->query("select photo_user,id,username from user 
            where id = '" . $element["followed_user_id"] . "';");
            $fetchfollow = $queryfollowed->fetchAll();
            foreach ($fetchfollow as $elem) {
                array_push($arr, $elem);
            }
        }
        return $arr;
    }

    public function showFollowers($id)
    {
        $query = $this->db->query("select follower_user_id from follow where followed_user_id = '" . $id . "%';");
        $fetch = $query->fetchAll();
        $arr = array();
        foreach ($fetch as $element) {
            $queryfollowed = $this->db->query("select photo_user,id,username from
             user where id = '" . $element["follower_user_id"] . "';");
            $fetchfollow = $queryfollowed->fetchAll();
            foreach ($fetchfollow as $elem) {
                array_push($arr, $elem);
            }
        }
        return $arr;
    }


    public function showOwnTweets($id)
    {
        $myquery = $this->db->query('SELECT * FROM post INNER JOIN user ON post.user_id 
        = user.id WHERE body IS NOT NULL AND post.status = "ACTIVE" AND post.post_id IS 
        NULL AND post.user_id = "' . $id . '" ORDER BY post.created_at DESC;');
        $myfetch = $myquery->fetchAll();
        $this->post = $myfetch;
        return $this->post;
    }
}
