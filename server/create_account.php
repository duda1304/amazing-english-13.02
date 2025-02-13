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
include_once 'objects/approved_emails.php';

// include_once 'objects/code.php';

// generate json web token
include_once 'config/core.php';
include_once 'libs/php-jwt-master/src/BeforeValidException.php';
include_once 'libs/php-jwt-master/src/ExpiredException.php';
include_once 'libs/php-jwt-master/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

// get database connection
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$account = new Account($db);
$users = new Users($db);
$approved_emails = new ApprovedEmails($db);
// $code = new Code($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// set property values
$account->password = $data->password;
$account->email = $data->email;
$account->type = $data->type;
// $account->code = $data->code;
// $code->code = $data->code;

// $code_valid = $code->checkCode();
// $code_inuse = $account->codeInUse();
$account_email_exists = $account->emailExists();
$approved_emails->email = $data->email;
$email_exists = $approved_emails->emailExists();

$token = array(
    "iss" => $iss,
    "aud" => $aud,
    "iat" => $iat,
    "nbf" => $nbf,
    "data" => array(
        "email" => $account->email
    )
 );
 // generate jwt
 $jwt = JWT::encode($token, $key);

 $account->token = $jwt;

 function generateRandomString($length=10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[random_int(0, $charactersLength - 1)];
    }
    return $randomString;
}
// if code is already in use
// if(!$code_valid || $code_inuse) {
//     // set response code
//     http_response_code(401);
//     echo json_encode(
//         array(
//             "message" => "Code non valide",
//             "code" => 401
//         )
//     );
// } else 

if ($account_email_exists) {
    http_response_code(401);
    echo json_encode(
        array(
            "message" => "Un compte client utilise déjà cette adresse email.",
            "code" => 401
        )
   );
}
else if (!$email_exists) {
    http_response_code(401);
    echo json_encode(
        array(
            "message" => "Merci de créer un compte client avec la même adresse email que celle de votre achat.",
            "code" => 401
        )
   );
}  
else if ($data->type === 'multi' && str_contains($approved_emails->product, 'unique')) {
    http_response_code(401);
    echo json_encode(
        array(
            "message" => "Veuillez sélectionner l'option compte utilisateur unique.",
            "code" => 401
        )
   );
} else {
    if ($account->create()) {

        $arr = $data->users;
        $users->account_id = $account->id;

        foreach ($arr as &$value) {
            $users->account_id = $account->id;
            $users->name = $value->name;
            $users->age = $value->age;
            $users->avatar = $value->avatar;
            $users->token = generateRandomString();
            $users->create();
        }

        $approved_emails->updateStatus();

         // subject
        $subject = "Welcome !";
        
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
        $contents = file_get_contents('welcome_email_template.html');
        $html = str_replace($replace, $with, $contents);
    
        
        $retval = mail($account->email, $subject, $html, $headers);


        http_response_code(200);
        echo json_encode(
            array(
                "message" => "Compte créé.",
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
}


?>