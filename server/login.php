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
include_once 'objects/users.php';

 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$account = new Account($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set property values
$account->email = $data->email;
$email_exists = $account->emailExists();
$password = $data->password;

// generate json web token
include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

if($email_exists && password_verify($password, $account->password)){
    $token = array(
        "iss" => $iss,
        "aud" => $aud,
        "iat" => $iat,
        "nbf" => $nbf,
        "data" => array(
            "id" => $account->id,
            "email" => $account->email
        )
     );
  
     // set response code
     http_response_code(200);
  
     // generate jwt
     $jwt = JWT::encode($token, $key);
 
     // save token in database
     $account->token = $jwt;

     if ($account->saveToken()) {
            echo json_encode(
                array(
                    "message" => "Connexion réussie.",
                    "code" => 200,
                    "jwt" => $jwt,
                    "id" => $account->id,
                    "tempPassword" => $account->tempPassword
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
} else {
     http_response_code(401);

    if (!$email_exists) {
        echo json_encode(
            array(
                "message" => "Email incorrect.",
                "code" => 401
            )
        );
    } else {
        echo json_encode(
            array(
                "message" => "Mot de passe incorrect.",
                "code" => 401
            )
        );
    }
}

?>