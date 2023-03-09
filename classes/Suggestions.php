<?php

namespace classes;

class Suggestions {
    protected $db;
    protected $dir;
    protected $follow;
    protected $util;
    protected $avatar;
    protected $mutual;

    public function __construct($db) {
        $this->db = $db;
        $this->dir = 'kaylios';
        $this->follow = new FollowSystem\Follow;
        $this->util = new Util();
        $this->avatar = new Avatar();
        $this->mutual = new Mutual($db);
    }

    public function HomeSuggestions ($when) {
        $session = $_SESSION['id'];

        $sql = "SELECT id FROM users WHERE id <> :me ORDER BY RAND() LIMIT 5";

        $query = $this->db->prepare($sql);
        $query->execute([':me' => $session]);

        while ($row = $query->fetch(\PDO::FETCH_OBJ)) {
            $id = $row->id;

            if (!$this->follow->isFollowing($id)) {
                echo "<div class='recommendation'><img src='{$this->dir}/' alt='img'>";

                if ($when == 'direct') {
                    echo $this->avatar->getAvatar($id);
                } else if ($when == 'ajax') {
                    echo $this->avatar->displayAvatar($id);
                }

                echo "</div></div>";
            }
        }
    }

    public function userSuggestionCount ($user) {
        $session = $_SESSION['id'];
        $array = [];

        $sql = "SELECT follow_by FROM follow_system WHERE follow_to = :user AND follow_by <> :me";

        $query = $this->db->prepare($sql);
        $query->execute([':user' => $user, ':me' => $session]);

        while ($row = $query->fetch(\PDO::FETCH_OBJ)) {
            $id = $row->follow_by;

            if ($this->follow->isFollowing($id)) {
                $array[] = $id;
            }
        }

        return count($array);
    }

    public function userSuggestions ($user) {
        $session = $_SESSION['id'];

        $sql = "SELECT follow_by FROM follow_system WHERE follow_to = :user AND follow_by <> :me ORDER BY RAND() LIMIT 5";

        $query = $this->db->prepare($sql);
        $query->execute([':user' => $user, ':me' => $session]);

        while ($row = $query->fetch(\PDO::FETCH_OBJ)) {
            $id = $row->follow_by;

            if (!$this->follow->isFollowing($id)) {
                // TODO - Add the rest of the code
                // TODO - use a specific path to the avatar.
                echo "<div class='recommendation'><img src='{$this->dir}/{$$this->avatar->displayAvatar($id)}' alt='img'>";
            }
        }
    }
}
