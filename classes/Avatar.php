<?php

namespace classes;

class Avatar {
    protected $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function sessionAvatar () {
        $session = $_SESSION['id'];
        $src = glob("users/$session/avatar/*");
        return $src[0];
    }

    public function getAvatar($get) {
        $src = glob("users/$get/avatar/*");
        return $src[0];
    }

    public function displayAvatar ($get) {
        $src = glob("users/$get/avatar/*");
        return substr($src[0], 5);
    }

    public function deleteAvatar($when , $grp) {
        $session = $_SESSION['id'];

        if ($when == "user") {
            $src = glob("../../users/$session/avatar/*");
        } else if ($when == "group") {
            $src = glob("../../groups/$grp/avatar/*");
        }

        foreach ($src as $key => $value) {
            if (is_file($value)) {
                @unlink($value);
            }
        }
    }


    public function copyAvatar($orig_file, $when, $grp) {
        $session = $_SESSION['id'];

        $ext = pathinfo($orig_file, PATHINFO_EXTENSION);
        $file = substr($_GET['change_avatar'], strpos($_GET['change_avatar'], "/") + 1);
        $new_name = time().".".$ext;

        $from = "../../images/avatars/$file";

        if ($when == "user") {
            $to = "../../users/$session/avatar/$new_name";
        } else if ($when == "group") {
            $to = "../../groups/$grp/avatar/$new_name";

            $sql = "UPDATE groups SET grp_avatar=:name HWERE grp_id=:grp";

            $query = $this->db->prepare($sql);
            $query->execute(array(':name' => $new_name, ':grp' => $grp));
        }

        @copy($from, $to);
        return substr($to, 6);
    }

    public function uploadAndResize () {
        $name = $_FILES['avatar']['name'];
        $temp_name = $_FILES['avatar']['tmp_name'];
        $error = $_FILES['avatar']['error'];

        // TODO: this code has a bug in it. It's not working properly.
//        $ext = strtolower(end(explode('.', $name));
        $allowed = ['jpg', 'png', 'gif', 'jpeg'];
        /*
        if (in_array($ext, $allowed)) {
            if ($error === 0) {
                if ($size < 1000000) {
                    $new_name = time().".".$ext;
                    $destination = "../../images/avatars/$new_name";

                    if (move_uploaded_file($temp_name, $destination)) {
                        $this->resizeImage($destination, $destination, 200, 200);
                        return substr($destination, 6);
                    }
                } else {
                    echo "File is too large";
                }
            } else {
                echo "There was an error uploading your file";
            }
        } else {
            echo "You cannot upload files of this type";
        } */
    }

    public function cropAvatar($when, $group) {

    }
    
    public function getAvatar ($id) {
        $src = glob("users/$id/avatar/*");
        return $src[0];
    }
}
