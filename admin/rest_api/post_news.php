<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/x-www-form-urlencoded\r\n,application/json; charset=UTF-8");
header("Access-Control-Allow-Methods:GET,POST,PUT,DELET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include('control.php'); 
$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod == 'POST'){
      $inputData = json_decode(file_get_contents("php://input"), true);
    if(empty($inputData)){
        $response =  postNews($_POST);
    }else{  
        $response =  postNews( $inputData);
    }
    echo $response;
}
else if($requestMethod== 'GET'){
    $response = getNews();
    echo $response;
}
 if($requestMethod === 'PUT'){
    $news_id = $_GET['id'];
    $news_data = json_decode(file_get_contents('php://input'), true);
   if(!$news_id || !$news_data){
    $response = ['status'=>0,'message'=>"bad request!"];
    echo json_encode($response);
   }
   else{
        $response = updateNews($news_id, $news_data);
        echo json_encode($response);
   }
}
if($requestMethod === 'DELETE'){
   $news_id = $_GET['id'];
   if(!$news_id){
        $response = [
            'status' => 0,
            'message' => "Bad Request!"
        ];
        echo json_encode($response);
   }
   else{
    $response = deleteNews($news_id);
    echo json_encode($response);
   } 
}
?>