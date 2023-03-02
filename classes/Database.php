<?php

namespace classes;
use PDO;

class Database extends PDO{
    protected static $inst;
    protected $dir = 'kaylios';
    protected static $username = 'root';
    protected static $password = 'root';

    public function __construct() {
        try {
            self::$inst = new PDO('mysql:host=localhost;dbname=' . $this->dir, self::$username, self::$password);
            self::$inst->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $e) {
            echo "Error: " . $e->getMessage();
        }

        return self::$inst;
    }
}
