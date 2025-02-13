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

$game_status = $game->getAll();

if ($game->getAll() === false) {
    http_response_code(401);
    echo json_encode(
    array(
        "message" => "Quelque chose s’est mal passé. Réessayez s'il vous plaît.",
        "code" => 401
    )
    );
} else {
    $game->reset();

    if (($game->game1 + $game->game2 + $game->game3 + $game->game4)/4 < 80) {
        $result = ($game->game1 + $game->game2 + $game->game3 + $game->game4)/4;
        http_response_code(200);
        echo json_encode(
            array(
                "code" => 200,
                "status" => 'fail',
                'result' => $result
            )
        );
    } else {
        http_response_code(200);
        echo json_encode(
            array(
                "code" => 200,
                "status" => 'success'
            )
        );
    }
}




?>