<?php

namespace classes;

class Mutual {
    protected $db;
    protected $util;

    public function __construct($db) {
        $this->db = $db;
        $this->util = new Util();
    }

    public function mutualFriends($user_id) {
        $session = $_SESSION['id'];

        $sql = "SELECT COUNT(id) AS count FROM friends WHERE (user_one=:user_one AND user_two=:user_two) OR (user_one=:user_two AND user_two=:user_one) AND accepted='1'";

        $query = $this->db->prepare($sql);
        $query->execute(array(':user_one' => $session, ':user_two' => $user_id));

        $row = $query->fetch(\PDO::FETCH_OBJ);

        if ($row->count > 0) {
            return $row->count . " mutual friends";
        } else {
            return "";
        }
    }

    public function getMutual() {

    }
}
