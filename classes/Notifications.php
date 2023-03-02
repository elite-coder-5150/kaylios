<?php

namespace classes;

use classes\Util;

class Notification {
    protected $db;
    protected $util;

    public function __construct() {
        $this->db = new Database();
        $this->util = new Util();
    }

    public function notifyFollow ($get) {
        $session = $_SESSION['id'];

        $sql = "INSERT INTO notifications (notify_by, notify_to, type, time) VALUES(:session, :get, 'follow', now())";

        $query = $this->db->prepare($sql);
        $query->execute(array(':session' => $session, ':get' => $get));

        echo "<div class='alert alert-success'>You are now following " . $this->util->getDetails($get, 'username') . "</div>";
    }
}
