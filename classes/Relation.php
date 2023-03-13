<?php

namespace classes\FriendRequestSystem;

use classes\Database;

class Relation {
    protected $db;
    protected $sql;

    public $error;
    public function __construct() {
        $this->db = new Database();
    }

    /**
     * i need a method to send a friend request
     * @param $from
     * @param $to
     * @return true
     */
    public function request($from, $to) {
        if ($this->alreadyFriends($from, $to)) {
            $this->error = 'already friends';

        } else if ($this->isPending($from, $to)) {
            $this->error = 'request is pending';
        } else {
            $this->sql = "INSERT INTO relations (from, to , status)
                          VALUES (:from, :to, 'pending')";

            $query = $this->db->prepare($this->sql);
            $query->execute([
                ':from:' => $from,
                ':to' => $to
            ]);
        }

        return true;
    }
    private function alreadyFriends($from, $to) {
        $this->sql = 'SELECT * FROM relation
                      WHERE from=:from
                      AND to=:to
                      AND status = "friend"
        ';

        $query = $this->db->prepare($this->sql);
        $query->execute([
            ':from' => $from,
            ':to' => $to
        ]);

        if ($query->rowCount() == 1) {
            //$this->error = 'already friends';
            return false;
        }
    }

    public function isPending($from, $to) {
        $this->sql = "SELECT * FROM relation
                      WHERE (
                          status='pending'
                          AND from=:from
                          AND to=:to
                      ) OR (
                          status='pending'
                          AND from=:to
                          AND to=:to
                      )
        ";

        $query = $this->db->prepare($this->sql);
        $query->execute([
            ':from' => $from,
            ':to' => $to,
            ':from' => $to,
            ':to' => $from
        ]);

        if ($query->rowCount() == 1) {
            $this->error = 'pending friend request';
            return false;
        }
    }
}
