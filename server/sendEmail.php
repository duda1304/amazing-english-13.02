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
$account->email = $data->email;
$email_exists = $account->emailExists();

if ($email_exists) {
    $tempPassword = getRandomString(8);
    $account->password = $tempPassword;
    $saveTempPassword = $account->saveTempPassword();

    if ($saveTempPassword) {
        // subject
        $subject = "Réinitialisation de	votre mot de passe";
        
        // header
        $headers = array(
            'From' => 'Amazing English - Service client <support@stepforward-education.fr>',
            'Reply-To' => 'support@stepforward-education.fr',
            'MIME-Version' => '1.0',
            'Content-type' => 'text/html; charset=utf-8',
            'X-Mailer' => 'PHP/' . phpversion()
        );

        $replace = array('{$tempPassword}');
        $with = array($tempPassword);
        $contents = file_get_contents('password_recovery_email_template.html');
        $html = str_replace($replace, $with, $contents);
    
        
        // send email
        $retval = mail($data->email, $subject, $html, $headers);
                
        if($retval) {
            echo json_encode(
                array(
                    "code" => 200,
                    "message" => "Un email pour réinitialiser votre	mot	de passe a été envoyé à	l'adresse email	renseignée.",
                )
            );
        }else {
            echo json_encode(
                array(
                    "code" => 500,
                    "message" => "Quelque chose s’est mal passé. Réessayez s'il vous plaît."
                )
            );
        }    
    } else {
        echo json_encode(
            array(
                "code" => 500,
                "message" => "Quelque chose s’est mal passé. Réessayez s'il vous plaît."
            )
        );
    }
} else {
    echo json_encode(
        array(
            "code" => 401,
            "message" => "Ce compte n'existe pas."
        )
    );
}

function getRandomString($n) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
 
    for ($i = 0; $i < $n; $i++) {
        $index = rand(0, strlen($characters) - 1);
        $randomString .= $characters[$index];
    }
 
    return $randomString;
}

?>