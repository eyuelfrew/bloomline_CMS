<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include('control.php'); 
$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod == "POST"){
    $response = addData($_POST);
    echo json_encode($response);
} 
if($requestMethod == "GET"){
    $response = getStatisctic();
    echo json_encode($response);
}
if($requestMethod == "DELETE"){
    $response = deleteDataBaseByID('statistic',$_GET['id']);
    echo json_encode($response);
}
?>