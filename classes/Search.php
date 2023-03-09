<?php

namespace classes;

class Search {
    protected $db;
    protected $dir;
    protected $util;
    protected $avatar;
    protected $mutual;
    protected $group;
    protected $post;
    protected $hashtag;

    public function __construct($db, $dir) {
        $this->db = $db;
        $this->dir = $dir;

        $this->util = new Util();
        $this->avatar = new Avatar();
        $this->mutual = new Mutual();
        $this->group = new Group();
        $this->post = new Post();
        $this->hashtag = new Hashtag();
    }

    public function SearchUser($value) {
        $session = $_SESSION['id'];

        echo "<div class='people-search'><header>People</header><div class='people-list'>";

        $users_sql = "SELECT id, username FROM users HWERE username LIKE :uername ORDER BY id LIMIT 8";

        $users_query = $this->db->prepare($users_sql);
        $users_query->execute([':username' => $value]);

        if ($users_query->rowCount() > 0) {
            while ($user_row = $users_query->fetch(PDO::FETCH_OBJ)) {
                $user_id = $user_row->id;
                $user = $user_row->username;

                echo "
                    <a class='profile' href='{$this->dir}profile/{$user}'>
                    <img src='{$this->avatar->DisplayAvatar($user_id)}' alt='{$user}' />
                    <div class='info'>
                    <span class='name'>".$this->util->nameShortener($user, 30)."</span>
                    <span class='mutual'>".$this->mutual->mutualFriends($user_id)."</span>
                ";
            }
        }

        echo "</div></div>";
    }

    public function SearchGroup($value) {
        $session = $_SESSION['id'];

        echo "<div class='group-search'><header>Groups</header><div class='people-list'>";
    }

    // TODO: fix this query to be able to search for that just the body of the post
    public function SearchPost($value) {
        $sql = "SELECT post_id, user_id, body, likes, comments, time FROM posts WHERE body LIKE :body ORDER BY id DESC LIMIT 8";

        $query = $this->db->prepare($sql);
        $query->execute([':body' => $value]);

    }

    public function SearchTags ($value) {

    }
}
