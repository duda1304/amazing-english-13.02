<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
$games = json_decode(file_get_contents('data/games.json'), true);

$games_by_age = array_filter($games, function($result) {
    return $data->age >= $result['age'][0] && $data->age <= $result['age'][1];
});

$levels = array();

for ($i = 1; $i <= $data->level; $i++) {
    $user_level = array_filter($games_by_age[0]['levels'], function($result) use($i) {
        return $result['id'] == $i;
    });
    
    $levels = array_merge($levels, $user_level);
}

echo json_encode(
            array(
                "code" => 200,
                "levels" => $levels
            )
        );


?>