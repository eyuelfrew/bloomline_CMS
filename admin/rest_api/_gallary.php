<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Allow specific HTTP methods

header("Content-Type: application/x-www-form-urlencoded\r\n,application/json; charset=UTF-8");
header("Access-Control-Allow-Methods:GET,POST,PUT,DELET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include('control.php'); 
$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod === 'POST'){
    $resposne = postGallary($_POST);
    echo json_encode($resposne);
}
else if($requestMethod== 'GET'){
    if($_GET['id']){
       $response = getDataByID('gallary',$_GET['id']);
       
    }
    else if(empty($_GET['id'])){
        $response = getDataBase('gallary');
    }
    echo json_encode($response);
}
if($requestMethod === 'DELETE'){
    $gall_id = $_GET['id'];
    if(isset($_GET['id'])){
        $response = DeleteWithFiles('gallary','image','gallary',$gall_id);
        echo json_encode($response);
    }
    else{
        $response = [
            'status' => 0,
            'message'=>"There is no id available!"
        ];
        echo json_encode($response);
    }
}

?>