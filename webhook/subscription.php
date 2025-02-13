<?php

$responseBody = file_get_contents('php://input');
$json = json_decode($responseBody);

file_put_contents('debug.json', json_encode($json));

?>