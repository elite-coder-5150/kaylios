<?php

namespace classes\FriendRequestSystem;

use classes\Database;
use classes\Util;
use classes\Notification;

class Relation {
    protected $db;
    protected $sql;

    protected $notify;
    protected $util;

    public $error;
    public function __construct() {
        $this->db = new Database();
        $this->notify = new Notification();
        $this->util = new Util();
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

    public function didIInviteHimTo($grp, $user) {
        $session = $_SESSION['id'];

        $this->sql = "SELECT inviteGrpId from group_invites
                      WHERE by=:by
                      AND to=:to
                      AND grp=:grp";

        $query = $this->db->prepare($this->sql);
        $query->execute([
            ':by' => $session,
            ':to' => $user,
            ':grp' => $grp
        ]);

        $count = $query->rowCount();

        if ($count == 0) {
            return false;
        } else if ($count > 0) {
            return true;
        }
    }

    public function groupInvite($to, $grp) {
        $by = $_SESSION['id'];

        if (!$this->didIInviteHimTo($grp, $to)) {
            $this->sql = "INSERT INTO group_invites (by, to, grp)
                          VALUES (:by, :to, :grp)";

            $query = $this->db->prepare($this->sql);
            $query->execute([
                ':by' => $by,
                ':to' => $to,
                ':grp' => $grp
            ]);

            $this->notify->getNotifications($to);

            return "Invited ".$this->util->getDetails($to, 'username');
        } else {
            return "You already invited him to this group";
        }
    }

    public function pendingGroupInvites($user, $group) {
        $this->sql = "SELECT * FROM group_invites
                      WHERE to=:user
                      AND grp=:grp
                      AND status='pending'
        ";

        $query = $this->db->prepare($this->sql);
        $query->execute([
            ':user' => $user,
            ':grp' => $group
        ]);

        if ($query->rowCount() == 1) {
            $this->error = 'pending group invite';
            return true;
        } else {
            return false;
        }
    }
}
