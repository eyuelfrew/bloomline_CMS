<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include('control.php'); 
$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod == "POST"){
    $response = PostProjects($_POST);
    echo json_encode($response);
} 
if($requestMethod == "GET"){
    if($_GET['id']){
       $response = getDataByID('service',$_GET['id']);
       
    }
    else if(empty($_GET['id'])){
        $response = getDataBase('projects');
    }
    echo json_encode($response);
}
if($requestMethod == "DELETE"){
    $response = deleteDataBaseByID('statistic',$_GET['id']);
    echo json_encode($response);
}
?>