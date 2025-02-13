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
$account->password = $data->password;
$account->email = $data->email;
$account->token = $data->token;


if ($account->editAccount()) {
    http_response_code(200);
    echo json_encode(
        array(
            "message" => "Compte modifié.",
            "code" => 200
        )
    );

} else {
    http_response_code(401);
    echo json_encode(
        array(
            "message" => "Quelque chose s’est mal passé. Réessayez s'il vous plaît.",
            "code" => 404
        )
    );
}


?>