<?php
// 'account' object
class Account{
 
    // database connection and table name
    private $conn;
    private $table_name = "accounts";
 
    // object properties
    public $id;
    public $email;
    public $password;
    public $token;
    public $tempPassword;
    public $admin;
    public $type;

    // constructor
    public function __construct($db){
        $this->conn = $db;
    }
 
// create new account record
function create(){
 
    $query = "INSERT INTO " . $this->table_name . "
            SET
                email = :email,
                password = :password,
                type = :type,
                token = :token";
 
    $stmt = $this->conn->prepare($query);
 
    $this->password=htmlspecialchars(strip_tags($this->password));

    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':token', $this->token);
    $stmt->bindParam(':type', $this->type);
    // hash the password before saving to database
    $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
    $stmt->bindParam(':password', $password_hash);
 
    if($stmt->execute()){
        $this->id = $this->conn->lastInsertId();
        return true;
    }
    return false;
}

function delete() {
    $query = "DELETE FROM " . $this->table_name . "
    WHERE
        token = :token";

    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':token', $this->token);

    if($stmt->execute()){
        return true;
    }

    return false;
}

// check if given email exist in the database
function emailExists(){
 
    $query = "SELECT id,  email, password, tempPassword
            FROM " . $this->table_name . "
            WHERE email = ?
            LIMIT 0,1";
 
    $stmt = $this->conn->prepare( $query );
    
    $stmt->bindParam(1, $this->email);
 
    $stmt->execute();
 
    $num = $stmt->rowCount();
 
    if($num>0){
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
 
        $this->id = $row['id'];
        $this->password = $row['password'];
        $this->tempPassword = $row['tempPassword'];

        return true;
    }
    return false;
}

// save temporary password
function saveTempPassword(){
 
    $query = "UPDATE " . $this->table_name . "
            SET
                password = :password,
                tempPassword = 1
            WHERE email = :email";
 
    $stmt = $this->conn->prepare($query);
 
    $this->password=htmlspecialchars(strip_tags($this->password));
 
    // hash the password before saving to database
    $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
    $stmt->bindParam(':password', $password_hash);
 
    $stmt->bindParam(':email', $this->email);

    if($stmt->execute()){
        return true;
    }
    return false;
}

// edit account email and/or password
function editAccount(){
    
    if ($this->password !== '') {
        $query = "UPDATE " . $this->table_name . "
        SET
            password = :password,
            email = :email
        WHERE token = :token";
        $stmt = $this->conn->prepare($query);
 
        $this->password=htmlspecialchars(strip_tags($this->password));
        // hash the password before saving to database
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
        $stmt->bindParam(':password', $password_hash);
        $stmt->bindParam(':token', $this->token);
        $stmt->bindParam(':email', $this->email);
        
        if($stmt->execute()){
            return true;
        }
        return false;
    } else {
        $query = "UPDATE " . $this->table_name . "
        SET
            email = :email
        WHERE token = :token";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':token', $this->token);
        $stmt->bindParam(':email', $this->email);
        
        if($stmt->execute()){
            return true;
        }
        return false;
    }
}

// new password
function newPassword(){
 
    $query = "UPDATE " . $this->table_name . "
            SET
                password = :password,
                tempPassword = 0
            WHERE token = :token";
 
    $stmt = $this->conn->prepare($query);
 
    $this->password=htmlspecialchars(strip_tags($this->password));
 
    // hash the password before saving to database
    $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
    $stmt->bindParam(':password', $password_hash);
 
    $stmt->bindParam(':token', $this->token);

    if($stmt->execute()){
        return true;
    }
    return false;
}

// check if given code is already in use
// function codeInUse(){
 
//     $query = "SELECT id
//             FROM " . $this->table_name . "
//             WHERE code = ?
//             LIMIT 0,1";
 
//     $stmt = $this->conn->prepare( $query );
    
//     $stmt->bindParam(1, $this->code);
 
//     $stmt->execute();
 
//     $num = $stmt->rowCount();
 
//     if($num>0){
//         return true;
//     }
//     return false;
// }



//save token
function saveToken() {
    $query = "UPDATE " . $this->table_name . "
    SET
        token = :token
    WHERE id = :id";

      $stmt = $this->conn->prepare($query);
 
      $stmt->bindParam(':token', $this->token);
   
      $stmt->bindParam(':id', $this->id);
   
      if($stmt->execute()){
          return true;
      }
      return false;
}

function checkToken() {
     $query = "SELECT id, email, type, admin, tempPassword
     FROM " . $this->table_name . "
     WHERE token = ?
     LIMIT 0,1";

    $stmt = $this->conn->prepare( $query );

    $stmt->bindParam(1, $this->token);

    $stmt->execute();

    $num = $stmt->rowCount();

    if($num>0){
        // check if account already loggedin on other device
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->id = $row['id'];
        $this->email = $row['email'];
        $this->type = $row['type'];
        $this->admin = $row['admin'];
        $this->tempPassword = $row['tempPassword'];
    return true;
    }
    return false;
}

}