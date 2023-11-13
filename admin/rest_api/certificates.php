<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET,.DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$request_method = $_SERVER["REQUEST_METHOD"];
include("control.php");
if($request_method == 'POST'){
      $inputData = json_decode(file_get_contents("php://input"), true);
    if(empty($inputData)){
        $response =  uploadCertificates($_POST);
    }else{  
        $response =  uploadCertificates( $inputData);
    }
   
    echo json_encode($response);
}
else if($request_method=='DELETE'){
    if(isset($_GET['id'])){
        $response = deleteCertificate($_GET['id']);
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
if($request_method==='GET'){
    $data = getCertificates();
    echo json_encode($data);
}
?>