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

        $row = $query->fetch(PDO::FETCH_OBJ);

        return $row->$what;
    }
}
