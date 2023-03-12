<?php

namespace classes;

class Settings {
    protected $db;

    public function __construct() {
        $this->db = new Database();
    }
    public function AmIBlocked ($get) {
        $session = $_SESSION['id'];

        $sql = "SELECT block_id FROM block
                WHERE block_by=:by
                AND block_to=:to
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
