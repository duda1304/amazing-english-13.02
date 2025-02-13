<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
$states = json_decode(file_get_contents('data/states.json'), true);

$id = $data->id;

unset($states[$id]);

$jsonString = json_encode($states, JSON_PRETTY_PRINT);
$fp = fopen('data/states.json', 'w');
fwrite($fp, $jsonString);
fclose($fp);

echo json_encode(
            array(
                "code" => 200
            )
        );
?>