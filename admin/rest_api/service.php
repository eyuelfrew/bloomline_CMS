<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/x-www-form-urlencoded\r\n,application/json; charset=UTF-8");
header("Access-Control-Allow-Methods:GET,POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include('control.php'); 
$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod == 'POST'){
    $id = $_GET['id'];
    if(empty($id)){
        $response =  postService($_POST);
    }else if($_GET['id']){  
        $response =  updateService($_POST, $id);
    }
    echo json_encode($response);

}
else if($requestMethod== 'GET'){
    if($_GET['id']){
       $response = getDataByID('service',$_GET['id']);
       
    }
    else if(empty($_GET['id'])){
        $response = getDataBase('service');
    }
    echo json_encode($response);
}

if($requestMethod === 'DELETE'){
   $service_id = $_GET['id'];
   if(!$service_id){
        $response = [
            'status' => 0,
            'message' => "Bad Request!"
        ];
        echo json_encode($response);
   }
   else{
    $response = DeleteWithFiles('service','pic','uploads',$service_id);
    echo json_encode($response);
   } 
}
?>