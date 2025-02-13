<?php


// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/subject_pronouns.php';

// get database connection
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$game = new SubjectPronouns($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));

// set property values
$game->token = $data->token;
$game->column_name = $data->game;
$game->value = $data->result;

$game_status = $game->get();

if ($game_status == false) {
    if ($game->create() == false) {
        http_response_code(401);
        echo json_encode(
        array(
            "message" => "Quelque chose s’est mal passé. Réessayez s'il vous plaît.",
            "code" => 401
        )
        );
    } else {
        if ($game->update() === false) {
            http_response_code(401);
            echo json_encode(
            array(
                "message" => "Quelque chose s’est mal passé. Réessayez s'il vous plaît.",
                "code" => 401
            )
            );
        } else {
            http_response_code(200);
            echo json_encode(
                array(
                    "code" => 200,
                    "status" => 'updated'
                )
            );
        }   
    }
    exit;
}

if ($game_status !== 'already done') {
    if ($game->update() === false) {
        http_response_code(401);
        echo json_encode(
        array(
            "message" => "Quelque chose s’est mal passé. Réessayez s'il vous plaît.",
            "code" => 401
        )
        );
    } else {
        http_response_code(200);
        echo json_encode(
            array(
                "code" => 200,
                "status" => 'updated'
            )
        );
    }   
} else {
    if ($game->update() === false) {
        http_response_code(401);
        echo json_encode(
        array(
            "message" => "Quelque chose s’est mal passé. Réessayez s'il vous plaît.",
            "code" => 401
        )
        );
    } else {
        http_response_code(200);
        echo json_encode(
            array(
                "code" => 200,
                "status" => 'already played'
            )
        );
    }   
}



?>