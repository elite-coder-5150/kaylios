<?php

namespace classes;

class Relation {
    protected $db;
    protected $error;
    public function __construct() {
        $this->db = new Database();
    }

    // the user has accepted the friend request
    public function acceptRequest()
    {
        $session = $_SESSION['id'];
        $get = $_GET['id'];
        // I need a sql query to insert the user friend into the database
        // I need to update the accepted column to 1
        $sql = "";

        $query = $this->db->prepare($sql);
        $query->execute(array(':get' => $get, ':session' => $session));

    }

    /**
     * I need a function to check if the user has already sent a friend request
     */
    public function alreadyFriends($user_id, $friend_id) {
        $sql = "SELECT * FROM friend_request WHERE sender=:user_id AND receiver=:friend_id AND status='friends'";

        $query = $this->db->prepare($sql);
        $query->execute(array(':user_id' => $user_id, ':friend_id' => $friend_id));

        return $query->rowCount() === 1;
    }

    /**
     * this function checks if the user has already sent a friend request
     *
     * @return void
     */
    public function isPending($user_id, $friend_id) {
       try {
           // I need an squ query that grabs the status of the friend request
              $sql = "SELECT * FROM friend_request WHERE sender=:user_id AND receiver=:friend_id AND status='pending'";

              $query = $this->db->prepare($sql);
              $query->execute(array(':user_id' => $user_id, ':friend_id' => $friend_id));


       } catch (\PDOException $e) {
           die($e->getMessage());
       }
    }

}
