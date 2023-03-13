<?php

namespace classes;

class Bookmark {
    protected $db;

    public function __construct() {
        $this->db = new Database();
    }

    public function isBookmarked($get) {
        if (isset($_SESSION['id'])) {
            $session = $_SESSION['id'];

            $sql = "SELECT bookmark_id FROM bookmark
                    WHERE bookmark_by=:by
                    AND bookmark_to=:to
                ";

            $query = $this->db->prepare($sql);
            $query->execute([
                ':by' => $session,
                ':to' => $get
            ]);

            $count = $query->rowCount();

            return $count == 1;
        }
    }

    public function bookmark($post) {
        $session = $_SESSION['id'];

        if (!$this->isBookmarked($post)) {
            $this->sql = "INSERT INTO bookmark (bookmark_by, bookmark_to)
                          VALUES (:by, :to)";

            $query = $this->db->prepare($this->sql);
            $query->execute([
                ':by' => $session,
                ':to' => $post
            ]);
        }
    }

    public function unbookmark($post) {
        $session = $_SESSION['id'];

        if ($this->isBookmarked($post)) {
            $this->sql = "DELETE FROM bookmark
                          WHERE bookmark_by=:by
                          AND bookmark_to=:to";

            $query = $this->db->prepare($this->sql);
            $query->execute([
                ':by' => $session,
                ':to' => $post
            ]);
        }
    }
}
