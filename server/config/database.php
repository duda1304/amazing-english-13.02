<?php
// used to get mysql database connection
class Database{
 
    // specify your own database credentials
    private $host = "dxakekm799.mysql.db";
    private $db_name = "dxakekm799";
    private $username = "dxakekm799";
    private $password = "Jenemesouviensjamais123";
    public $conn;
 
    // private $host = "localhost";
    // private $db_name = "games";
    // private $username = "root";
    // private $password = "bubamara";
    // public $conn;

    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        } catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>

