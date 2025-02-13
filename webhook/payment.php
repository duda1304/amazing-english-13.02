<?php

// files needed to connect to database
include_once '../server/config/database.php';
include_once '../server/objects/approved_emails.php';

// get database connection
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$approved_emails = new ApprovedEmails($db);


// if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $data = $_POST['data'];
//     $jObj = json_decode($data);
//     file_put_contents("data.txt", $data);
//     file_put_contents("data.json", $jObj);
// }

$responseBody = file_get_contents('php://input');
$json = json_decode($responseBody);
$product = $json->line_items[0]->title;

//Save in json file
if($json && str_contains($product, 'The Alphabet')){
    $fp = fopen('test.json', 'w');
    fwrite($fp, json_encode($json));
    fclose($fp);
    
    $email = get_object_vars($json)['contact_email'];
    $customer = get_object_vars($json)['customer'];
    // $product = $json->line_items[0]->title;
    
    $approved_emails->email = $email;
    $approved_emails->product = $product;

    if ($approved_emails->create()) {
        // subject
        $subject = "Merci pour votre commande !";
                
        // header
        $headers = array(
            'From' => 'Amazing English - Service client <support@stepforward-education.fr>',
            'Reply-To' => 'support@stepforward-education.fr',
            'MIME-Version' => '1.0',
            'Content-type' => 'text/html; charset=utf-8',
            'X-Mailer' => 'PHP/' . phpversion()
        );

        $replace = array('${user}');
        $with = array(get_object_vars($customer)['first_name']);
        $contents = file_get_contents('initial_email_template.html');
        $html = str_replace($replace, $with, $contents);

        
        $retval = mail($email, $subject, $html, $headers);
    } 
}

?>

