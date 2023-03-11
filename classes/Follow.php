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
}
