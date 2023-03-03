<?php

namespace classes\FriendRequestSystem;

class Relation {
    protected $db;
    public $error;
    public function __construct() {
        $this->db = new Database();
    }

    /**
     * send a friend request
     *
     * @param $from
     * @param $to
     * @return void
     */
    public function request($from, $to) {
        if ($this->alreadyFriend($from, $to)) {
            $this->error = "You are already friends with this user";
        } else if ($this->isPending($from, $to)) {
            $this->error = "You have already sent a friend request to this user";
        } else {
            $sql = "INSERT INTO `relation` (`from`, `to`, `status`, `time`) VALUES (:from, :to, 0, now())";
            $query = $this->db->prepare($sql);
            $query->execute([':from' => $from, ':to' => $to]);
        }
    }

    /**
     * accept a friend request
     * @param $from
     * @param $to
     * @return void
     */
    public function accept($from, $to) {
        if ($this->isPending($from, $to)) {
            $sql = "UPDATE `relation` SET `status` = 1 WHERE (`from` = :from AND `to` = :to) OR (`from` = :to AND `to` = :from)";
            $query = $this->db->prepare($sql);
            $query->execute([':from' => $from, ':to' => $to]);
        }

        $sql = "INSERT INTO `relations` (`from`, `to`, `time`) VALUES (:from, :to, now())";

        $query = $this->db->prepare($sql);
        $query->execute([':from' => $from, ':to' => $to]);
    }

    public function
    private function alreadyFriend($from, $to) {
        $sql = "SELECT * FROM `relation` WHERE `from` = :from AND `to` = :to";

        $query = $this->db->prepare($sql);
        $query->execute([':from' => $from, ':to' => $to]);

        if ($query->rowCount() == 1) {
            return true;
        } else {
            return false;
        }
    }

    private function isPending($from, $to) {
        $sql = "SELECT * FROM `relation` WHERE ( (`from` = :from AND `to` = :to) OR (`from` = :to AND `to` = :from)) AND `status` = 0";

        $query = $this->db->prepare($sql);
        $query->execute([':from' => $from, ':to' => $to]);

        if ($query->rowCount() == 1) {
            return true;
        } else {
            return false;
        }
    }

    public function block($from, $to) {
        $sql = "INSERT INTO `relation` (from, to, status, time) VALUES (:from, :to, 'friends', now())";

        $query = $this->db->prepare($sql);
        $query->execute([':from' => $from, ':to' => $to]);
    }

    public function getFriends($user_id) {
        $friends = ["f" => [], "b" => []];

        $sql = "SELECT * FROM `relations` WHERE `status` AND from=:user_id";

        $query = $this->db->prepare($sql);
        $query->execute([':user_id' => $user_id]);

        while ($row = $query->fetch()) {
            $friends["f"][$row["to"]] = $row["since"];
        }

        if ($this->isBlocked($user_id)) {
            $friends["b"][$row["to"]] = $row["since"];
        }
    }

    // check to see if a user is blocked
    public function isBlocked($user_id) {
        $sql = "SELECT user_id FROM `blocked` WHERE user_id=:user_id";

        $query = $this->db->prepare($sql);
        $query->execute([':user_id' => $user_id]);

        while ($row = $query->fetch()) {
            $friends["blocked"][$row["to"]] = $row["since"];

        }
    }
    public function getBlockedUsers($id) {
        $sql = "SELECT * FROM `relation` WHERE `from` = :id AND `status` = 'blocked'";

        $query = $this->db->prepare($sql);
        $query->execute([':id' => $id]);

        return $query->fetchAll();
    }
}
