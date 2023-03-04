<?php

namespace classes;

use classes\FollowSystem\Follow;
use classes\Time;

class Notification
{
    protected $db;
    protected $util;
    protected $avatar;
    protected $time;
    protected $follow;
    protected $group;
    protected $message;
    public function __construct()
    {
        $this->db = new Database();
        $this->util = new Util();
        $this->avatar = new Avatar();
        $this->time = new Time();
        $this->follow = new Follow();
        $this->group = new Group();
        $this->message = new Message();

    }

    public function notifyCount()
    {
        if (isset($_SESSION['id'])) {
            $session = $_SESSION['id'];

            $sql = "SELECT notify_id FROM notifications WHERE notify_to=:session";

            $query = $this->db->prepare($sql);
            $query->execute(array(':session' => $session));

            return $query->rowCount();


        }
    }

        public function getNotificatins() {}
    public function notifyFollow($get)
    {
        $session = $_SESSION['id'];

        $sql = "INSERT INTO notifications (notify_by, notify_to, type, time) VALUES(:session, :get, 'follow', now())";

        $query = $this->db->prepare($sql);
        $query->execute(array(':session' => $session, ':get' => $get));

        echo "<div class='alert alert-success'>You are now following " . $this->util->getDetails($get, 'username') . "</div>";
    }

    public function getNotifications($type) {
        $session = $_SESSION['id'];

        if ($type == "follow") {
            echo "<li class='notify'>
                    <div class='profile'>
                        
                    </div>
                 </li>";
        }

    }
}
