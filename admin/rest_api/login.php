<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST ");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include('control.php'); 
require_once './vendor/autoload.php';
use \Firebase\JWT\JWT;
$jwtSecret = base64_encode(random_bytes(32));
$requestMethod = $_SERVER["REQUEST_METHOD"];
if($requestMethod == "POST"){
    $email = $_POST['email'];
    $password = $_POST['password'];
    $user = authenticateUser($email , $password);
    // echo json_encode($user);
    if ($user) {
    //     echo json_encode(['user_id'=>$user['id'],
    // 'first_name'=> $user['first_name']]);
        $payload = [
            'user_id' => $user['id'],
            'user_email' => $user['email']
        ];
        $jwt = JWT::encode($payload, $jwtSecret, 'HS256');

        echo json_encode(['token' => $jwt,
                        'status' =>1,'message'=>'login success full'] );
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
} 
else{ 
    $data = [
        'status'=> 405,
        'message' => $requestMethod.'MEthod Not Allowed!',

    ];
    header("HTTP/1.0 405 Method Not Allowed");
    echo json_encode($data);
}
?>