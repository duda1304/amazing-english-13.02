<?php
// 'email' object
class ApprovedEmails{
 
    // database connection and table name
    private $conn;
    private $table_name = "approved_emails";
 
    // object properties
    public $id;
    public $email;
    public $used;
    public $product;

    // constructor
    public function __construct($db){
        $this->conn = $db;
    }
 
// create new account record
function create(){
 
    $query = "INSERT INTO " . $this->table_name . "
            SET
                email = :email,
                product = :product";
 
    $stmt = $this->conn->prepare($query);

    $stmt->bindParam(':email', $this->email);
    $stmt->bindParam(':product', $this->product);
 
    if($stmt->execute()){
        $this->id = $this->conn->lastInsertId();
        return true;
    }
    return false;
}

// check if given email exist in the database
function emailExists(){
 
    $query = "SELECT id, product
            FROM " . $this->table_name . "
            WHERE email = :email AND used = 0 
            LIMIT 0,1";
 
    $stmt = $this->conn->prepare( $query );
    
    $stmt->bindParam(':email', $this->email);
 
    $stmt->execute();
 
    $num = $stmt->rowCount();
 
    if($num>0){
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        $this->product = $row['product'];
       
        return true;
    }
    return false;
}

// check if given email exist in the database
function updateStatus(){
 
    $query = "UPDATE " . $this->table_name . "
            SET
                used = 1
            WHERE email = :email";
 
    $stmt = $this->conn->prepare( $query );
    
    $stmt->bindParam(':email', $this->email);

    if($stmt->execute()){
        return true;
    }
    return false;
}

}