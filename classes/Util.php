<?php

namespace classes;

class Util {
    public function isLoggedIn() {
        return (bool)$_SESSION['id'];
    }

    public function getDetails($get_id, $what) {
        $sql = "SELECT $what FROM users WHERE id=:get_id limit 1";

        $query = $this->db->prepare($sql);
        $query->execute(array(':get_id' => $get_id));

        $row = $query->fetch(\PDO::FETCH_OBJ);

        return $row->$what;
    }

    public function nameShortener($name, $limit) {
        if (strlen($name) >= $limit) {
            return substr($name, 0, intval($limit) - 2) . '...';
        } else {
            return $name;
        }
    }

    public function isOnline($user) {
        if (isset($_SESSION['id'])) {
            $session = $_SESSION['id'];

            $sql = "SELECT MAX(login_id) AS get FROM login WHERE user_id=:user LIMIT 1";

            $query = $this->db->prepare($sql);
            $query->execute(array(':user' => $user));

            if ($query->rowCount() > 0) {
                $row = $query->fetch(\PDO::FETCH_OBJ);
                $login = $row->get;

                $logout_sql = "SELECT logout FROM login WHERE login_id=:login LIMIT 1";
                $logout_query = $this->db->prepare($logout_sql);
                $logout_query->execute(array(':login' => $login));

                if ($logout_query->rowCount() > 0) {
                    $logout_row = $logout_query->fetch(\PDO::FETCH_OBJ);
                    $logout = $logout_row->logout;

                    if (substr($logout, 0, 4) == '0000') {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
        }
    }

    public function urlChecker($url) {
        if (filter_var($url, FILTER_VALIDATE_URL)) {
            return true;
        } else {
            return false;
        }
    }
}
