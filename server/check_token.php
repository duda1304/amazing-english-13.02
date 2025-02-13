<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/account.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$account = new Account($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set property values
$account->token = $data->token;
$token_exists = $account->checkToken();

if ($token_exists) {
    http_response_code(200);
    echo json_encode(
        array(
            "message" => "Connexion réussie.",
            "code" => 200,
            "tempPassword" => $account->tempPassword,
            "id" => $account->id,
            "email" => $account->email,
            "type" => $account->type
        )
    );
} else {
    // login failed
    http_response_code(401);
            echo json_encode(
            array(
                "message" => "Données de connexion erronées.",
                "code" => 401
            )
        );
}

?>