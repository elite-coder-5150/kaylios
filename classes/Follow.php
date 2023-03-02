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

            $sql = "SELECT follow_to FROM follow_system WHERE follow_by=:session AND follow_to=:get limit 1";

            $query = $this->db->prepare($sql);
            $query->execute(array(':session' => $session, ':get' => $get));


            return $query->rowCount() != 0 || $query->rowCount() != null;
        }
    }

    public function follow($get) {
        $session = $_SESSION['id'];
        $settings = new Settings();
        $notify = new Notification();
        $util = new Util();

        $session_u = $this->util->getDetails($session, 'username');
        $get_u = $this->util->getDetails($get, 'username');
        $this->notify->notifyFollow();

        if (!$this->settings->AmIBlocked($get)) {
            if (!$this->isFollowing($get)) {
                $sql = "INSERT INTO follow_system (follow_by, follow_to, time) VALUES(:session, :get, now())";

                $query = $this->db->prepare($sql);
                $query->execute(array(':session' => $session, ':get' => $get));

                $this->notify->notifyFollow($get, "follow");
            }
        }
    }

    public function unfollow($get) {
        if ($this->isFollowing($get)) {
            $session = $_SESSION['id'];

            $sql = "DELETE FROM follow_system WHERE follow_by=:session AND follow_to=:get LIMIT 1";

            $query = $this->db->prepare($sql);
            $query->execute(array(':session' => $session, ':get' => $get));

            return "ok";
        } 
    }

    public function followers($get) {
        $session = $_SESSION['id'];

        $sql = "SELECT follow_by FROM follow_system WHERE follow_to=:session";


    }
}
