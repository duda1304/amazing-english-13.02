<?php
class SubjectPronouns{
 
// database connection and table name
private $conn;
private $table_name = "subject_pronouns";

// object properties
public $token;
public $game1;
public $game2;
public $game3;
public $game4;
public $column_name;
public $value;

// constructor
public function __construct($db){
    $this->conn = $db;
}

 
// create new account record
function create(){
    $query = "INSERT INTO " . $this->table_name . "
            SET 
                token = :token";
 
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':token', $this->token);

    if($stmt->execute()){
        return true;
    }
    return false;
}

function update(){
    $query = "UPDATE " . $this->table_name . "
            SET " .
                $this->column_name ." = :value
            WHERE token = :token";
 
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':value', $this->value);
    $stmt->bindParam(':token', $this->token);

    if($stmt->execute()){
        return true;
    }
    return false;
}


function get(){
    $query = "SELECT " . $this->column_name . " FROM " . $this->table_name . "
            WHERE token = :token";
            
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':token', $this->token);

    $stmt->execute();
 
    $num = $stmt->rowCount();

    if($num>0){
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($row[$this->column_name] !== null) {
            return "already done";
        } else {
            return "update this game";
        }
    }
    return false;
}

function getAll(){
    $query = "SELECT * FROM " . $this->table_name . "
            WHERE token = :token";
            
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':token', $this->token);

    $stmt->execute();
 
    $num = $stmt->rowCount();
   
    if($num>0){
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->game1 = $row['game1'];
        $this->game2 = $row['game2'];
        $this->game3 = $row['game3'];
        $this->game4 = $row['game4'];
        return true;
    }
    return false;
}

function reset() {
    $query = "DELETE FROM " . $this->table_name . "
    WHERE token = :token";

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':token', $this->token);

    if($stmt->execute()){
    return true;
    }
    return false;
}

}