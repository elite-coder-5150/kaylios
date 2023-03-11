<?php

namespace classes\FollowSystem;

use classes\Database;
use classes\Util;
use classes\Notification;
use classes\Settings;

class Follow {
    protected $db;
    protected $util;
    protected $notify;
    protected $settings;
    public function __construct() {
        $this->db = new Database();
        $this->util = new Util();
        $this->notify = new Notification();
        $this->settings = new Settings();
    }

    public function isFollowing($get) {
        if (isset($_SESSION['id'])) {
            $session = $_SESSION['id'];

            $sql = "SELECT follow_to FROM follow_system
                    WHERE follow_from = :session 
                    AND follow_to = :get
                    LIMIT 1";

            $query = $this->db->prepare($sql);
            $query->execute([
                ':session' => $session,
                ':get' => $get
            ]);

            return $query->rowCount() == 1;
        }
    }

    public function follow($get) {
        $session = $_SESSION['id'];
        $session_u = $this->util->getDetails($session, 'username');
        $get_u = $this->util->getDetails($get, 'username');

        if (!$this->settings->AmIBlocked($get)) {
            if (!$this->isFollowing($get)) {
                $sql = "INSERT INTO follow_system (follow_from, follow_to)
                        VALUES (:session, :get)
                    ";

                $query = $this->db->prepare($sql);
                $query->execute([
                    ':session' => $session,
                    ':get' => $get
                ]);

                $this->notify->notifyFollow($get, $session_u, $get_u);
                return "ok";
            } else {
                return "You are already following this user";
            }
        }
    }

    public function unfollow($get) {
        if ($this->isFollowing($get)) {
            $session = $_SESSION['id'];

            $sql = "DELETE FROM follow_system
                    WHERE follow_by = :session
                    AND follow_to = :get
                    LIMIT 1
                ";

            $query = $this->db->prepare($sql);
            $query->execute([
                ':session' => $session,
                ':get' => $get
            ]);
        }
    }
}
