<?php
// 'users' object
class Users{
 
// database connection and table name
private $conn;
private $table_name = "account_users";

// object properties
public $id;
public $account_id;
public $name;
public $age;
public $avatar;
public $token;
public $level;
public $sublevels;
public $points;
public $points_sublevels;
public $points_sublevels_attempts;
public $current_sublevel_progress;
public $challenge_started;

// constructor
public function __construct($db){
    $this->conn = $db;
}

 
// create new account record
function create(){
    $query = "INSERT INTO " . $this->table_name . "
            SET 
                account_id = :account_id,
                name = :name,
                age = :age,
                avatar = :avatar,
                token = :token";
 
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':account_id', $this->account_id);
    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':age', $this->age);
    $stmt->bindParam(':avatar', $this->avatar);
    $stmt->bindParam(':token', $this->token);

    if($stmt->execute()){
        return true;
    }
    return false;
}

function change(){
    $query = "UPDATE " . $this->table_name . "
            SET 
                name = :name,
                avatar = :avatar
            WHERE token = :token";
 
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':name', $this->name);
    $stmt->bindParam(':avatar', $this->avatar);
    $stmt->bindParam(':token', $this->token);

    if($stmt->execute()){
        return true;
    }
    return false;
}

function updateResult(){
    $query = "UPDATE " . $this->table_name . "
            SET 
                level = :level,
                sublevels = :sublevels,
                current_sublevel_progress = 0
            WHERE token = :token";
 
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':level', $this->level);
    $stmt->bindParam(':sublevels', $this->sublevels);
    $stmt->bindParam(':token', $this->token);

    if($stmt->execute()){
        return true;
    }
    return false;
}

function updateSublevelProgress(){
    $query = "UPDATE " . $this->table_name . "
            SET 
                current_sublevel_progress = :current_sublevel_progress
            WHERE token = :token";
 
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':current_sublevel_progress', $this->current_sublevel_progress);
    $stmt->bindParam(':token', $this->token);

    if($stmt->execute()){
        return true;
    }
    return false;
}

function getSublevelProgress(){
    $query = "SELECT current_sublevel_progress FROM " . $this->table_name . "
            WHERE token = :token";
            
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':token', $this->token);

    $stmt->execute();
 
    $num = $stmt->rowCount();

    if($num>0){
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->current_sublevel_progress = $row['current_sublevel_progress'];
    return true;
    }
    return false;
}

function updateChallengeAttempts(){
    $query = "UPDATE " . $this->table_name . "
            SET 
                points_sublevels_attempts = :points_sublevels_attempts,
                challenge_started = 0
            WHERE token = :token";
 
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':points_sublevels_attempts', $this->points_sublevels_attempts);
    $stmt->bindParam(':token', $this->token);

    if($stmt->execute()){
        return true;
    }
    return false;
}

function updatePointChallenge(){
    $query = "UPDATE " . $this->table_name . "
            SET 
                points_sublevels = :points_sublevels,
                points = :points,
                challenge_started = 0
            WHERE token = :token";
 
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':points_sublevels', $this->points_sublevels);
    $stmt->bindParam(':points', $this->points);
    $stmt->bindParam(':token', $this->token);

    if($stmt->execute()){
        return true;
    }
    return false;
}

function getPointsSublevels() {
    $query = "SELECT points_sublevels
    FROM " . $this->table_name . "
    WHERE token = :token";

    $stmt = $this->conn->prepare( $query );

    $stmt->bindParam(':token', $this->token);

    $stmt->execute();

    $num = $stmt->rowCount();

    if($num>0){
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->points_sublevels = ($row['points_sublevels'] !== null) ? array_map('intval', explode(',', $row['points_sublevels'])) : [];
        return true;
    }
    return false;
}

function challengeStarted(){
    $query = "UPDATE " . $this->table_name . "
            SET 
                challenge_started = :challenge_started
            WHERE token = :token";
 
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':challenge_started', $this->challenge_started);
    $stmt->bindParam(':token', $this->token);

    if($stmt->execute()){
        return true;
    }
    return false;
}

function challengeStop(){
    $query = "UPDATE " . $this->table_name . "
            SET 
                challenge_started = 0
            WHERE token = :token";
 
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':token', $this->token);

    if($stmt->execute()){
        return true;
    }
    return false;
}

function delete() {
    $query = "DELETE FROM " . $this->table_name . "
    WHERE
        account_id = :account_id";

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':account_id', $this->account_id);

    if($stmt->execute()){
        return true;
    }
    
    return false;
}

function get(){
    $query = "SELECT name, age, avatar, token
            FROM " . $this->table_name . "
            WHERE account_id = ?";
 
    $stmt = $this->conn->prepare( $query );
    
    $stmt->bindParam(1, $this->account_id);
 
    $stmt->execute();
 
    $num = $stmt->rowCount();

    if($num>0){
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $row;
    }
    return false;
}

function checkToken() {
    $query = "SELECT name, age, avatar, level, sublevels, points, points_sublevels, points_sublevels_attempts, challenge_started
    FROM " . $this->table_name . "
    WHERE token = ?
    LIMIT 0,1";

   $stmt = $this->conn->prepare( $query );

   $stmt->bindParam(1, $this->token);

   $stmt->execute();

   $num = $stmt->rowCount();

   if($num>0){
       $row = $stmt->fetch(PDO::FETCH_ASSOC);
       $this->name = $row['name'];
       $this->age = $row['age'];
       $this->avatar = $row['avatar'];
       $this->level = $row['level'];
       $this->sublevels = ($row['sublevels'] !== null) ? array_map('intval', explode(',', $row['sublevels'])) : [];
       $this->points = $row['points'];
       $this->points_sublevels = ($row['points_sublevels'] !== null) ? array_map('intval', explode(',', $row['points_sublevels'])) : [];
       $this->points_sublevels_attempts = ($row['points_sublevels_attempts'] !== null) ? array_map('intval', explode(',', $row['points_sublevels_attempts'])) : [];
       $this->challenge_started = $row['challenge_started'];
   return true;
   }
   return false;
}

}