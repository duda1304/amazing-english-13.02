<?php

$headers = array(
'X-Seal-Token: YOUR_SEAL_TOKEN'
);

$curl = curl_init();
$url = 'https://app.sealsubscriptions.com/shopify/merchant/api/subscription?email=dubravkaspoljaric@gmail.com';
curl_setopt($curl, CURLOPT_URL, $url);          
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($curl, CURLOPT_HTTPGET, true);       
$response = curl_exec($curl);

if ($response !== false) {
    echo josn_encode($response);
}

?>

