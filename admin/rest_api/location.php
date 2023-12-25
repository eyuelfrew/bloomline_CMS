<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$request_method = $_SERVER["REQUEST_METHOD"];
include('./control.php');
if($request_method === 'POST'){
   $response = addLocation($_POST);
   echo json_encode($response);
}
else if($request_method === 'GET'){
    $response = getLocation();
    echo json_encode($response);
}
else if ($request_method==='DELETE'){
    $response = deleteDataBaseByID('location',$_GET['id']);
    echo json_encode($response);
}
?>