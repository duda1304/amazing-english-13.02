<?php
ini_set('log_errors', 1);
ini_set('display_errors', 1);

echo 'ok';
$headers = array(
    'Content-Type: application/json',
    'X-Seal-Token: seal_token_7ug5dzia15kkjrdd7j0cgytpw6242bk85ipiu8vs'
);

$curl = curl_init();
$url = 'https://app.sealsubscriptions.com/shopify/merchant/api/subscriptions?email=dubravkaspoljaric@gmail.com';
curl_setopt($curl, CURLOPT_URL, $url);          
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_HTTPGET, true);       
$response = curl_exec($curl);

if ($response !== false) {
    echo json_encode($response); 
}

?>

