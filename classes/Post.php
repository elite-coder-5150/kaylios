<?php

namespace classes;

class Post {
    protected $db;
    protected $dir;
    public function __construct() {
        $this->db = new Database();
        $this->dir = 'kaylios';
    }

    public function postCount ($id) {
        $sql = "SELECT post_id from posts WHERE user_id=:id AND post_of <> :grp";

        $query = $this->db->prepare($sql);
        $query->execute([':id' => $id, ':grp' => 'group']);

        return $query->rowCount();
    }

    public function getPost ($post, $what) {
        $sql = "SELECT $what FROM post WHERE post_id=:post";

        $query = $this->db->prepare($sql);
        $query->execute([':post' => $post]);

        if ($query->rowCount() > 0) {
            $row = $query->fetch(PDO::FETCH_OBJ);

            return $row->$what;
        }
    }

    public function getLink($link) {
        if ($link != "") {
            include 'classes/simple_html_dom.php';

            $content = file_get_html($link);

            foreach ($content->find('title') as $element) {
                $title = $element->innertext;
            }

            $img = array();
            array_slice($content->find('img'), 0, 15);

            foreach ($content->find('img') as $element) {
               if (filter_var($element->src, FILTER_VALIDATE_URL)) {
                   list($width, $height) = getimagesize($element->src);

                   if ($width > 75 && $height > 75) {
                       $img[] = $element->src;
                   }
               }
            }

            if (sizeof($img) == 0) {
                $img[0] = "{$this->dir}/images/default.png'";
            }
    
        }
    }
}
