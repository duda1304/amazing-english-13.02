<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/users.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$users = new Users($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set property values
$users->token = $data->token;
$token_exists = $users->checkToken();

if ($token_exists) {
    http_response_code(200);
    echo json_encode(
        array(
            "code" => 200,
            "id" => $users->id,
            "name" => $users->name,
            "age" => $users->age,
            "avatar" => $users->avatar,
            "level" => $users->level,
            "sublevels" => $users->sublevels,
            "points" => $users->points,
            "points_sublevels" => $users->points_sublevels,
            "points_sublevels_attempts" => $users->points_sublevels_attempts,
            "challenge_started" => $users->challenge_started
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