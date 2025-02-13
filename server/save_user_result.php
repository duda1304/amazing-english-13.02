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
$users->level = $data->level;
$users->sublevels = $data->sublevels;

// get games json file 
$games = json_decode(file_get_contents('data/games.json'), true);

$games_by_age = array_filter($games, function($result) {
    return $data->age >= $result['age'][0] && $data->age <= $result['age'][1];
});

$user_level = array_filter($games_by_age[0]['levels'], function($result) use($data) {
    return $result['id'] == $data->level;
});

$sublevels = reset($user_level)['sublevels'];

$showCongratsMessage = false;

if (empty(array_diff($sublevels, $users->sublevels))) {
    $users->level = $users->level + 1;
    $showCongratsMessage = true;
}

$users->sublevels = implode(',', $data->sublevels);

if ($users->updateResult()) {
    http_response_code(200);
    echo json_encode(
        array(
            "code" => 200,
            "showCongratsMessage" => $showCongratsMessage
        )
    );
} else {
    // failed
    http_response_code(401);
        echo json_encode(
        array(
            "message" => "Quelque chose s’est mal passé. Réessayez s'il vous plaît.",
            "code" => 401
        )
    );
}

?>