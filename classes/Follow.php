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
                    WHERE follow_by=:session
                    AND follow_to=:to,
                    LIMIT 1
                ";

            $query = $this->db->prepare($sql);
            $query->execute([
                ':session' => $session,
                ':to' => $get
            ]);

            return $query->rowCount() != 0 || $query->rowCount() != null;
        }
    }
}
