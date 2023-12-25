<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/x-www-form-urlencoded\r\n,application/json; charset=UTF-8");
header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include('control.php'); 
$requestMethod = $_SERVER["REQUEST_METHOD"];

if($requestMethod === 'DELETE'){
    if(isset($_GET['gallary'])){
        $response = trancateGallary($_GET['gallary']);
        echo json_encode($response);
    }
    else if(isset($_GET['service'])){
        $response = truncateTable($_GET['service']);
        echo json_encode($response);
    }
  
}
?>