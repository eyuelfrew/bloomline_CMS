<?php
require './../inc/db_con.php';
//create or add  admins
function storeNewAdmins($new_admin){
    global $conn;
    $first_name = mysqli_real_escape_string($conn,$new_admin['first_name']);
    $last_name = mysqli_real_escape_string($conn,$new_admin['last_name']);
    $email = mysqli_real_escape_string($conn,$new_admin['email']);
    $password = password_hash(
        mysqli_real_escape_string($conn,$new_admin['password']), 
        PASSWORD_DEFAULT);
    $checkEmail = "SELECT COUNT(*) as count FROM users WHERE email = '$email'";
    $stored_emails = mysqli_query($conn, $checkEmail);
    $num_of_emails = mysqli_fetch_assoc($stored_emails);
    $emailExistes = $num_of_emails['count'] > 0;
    if($emailExistes){
        $response = [
            'status'=>409,
            'message'=>'Email exists.  please check your email!'
        ];
        header("HTTP/1.0 409 Email Exists");
        return json_encode($response);
    }else{
        $query = "INSERT INTO users (first_name, last_name, email, password)
                VALUES ('$first_name', '$last_name', '$email','$password')";
        $result = mysqli_query($conn, $query);
        if($result){
            $response = [
                'status'=>201,
                'message'=>'New admin created!'
            ];
            header("HTTP/1.0 201 Created");
            return json_encode($response);
        } 
        else{
        $response = [
            'status' => 500,
            'message' =>'Internal Server Error!'
        ];
        header("HTTP/1.0 500 Internal Server Error!");
        return json_encode($response);
    }
    }
}
//admins auth and login
function authenticateUser($email, $password){
    global $conn;
   
    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($conn, $query);
    $user = mysqli_fetch_assoc($result);

    if ($user && password_verify($password, $user['password'])) {
        return $user;
    }

    return false;
}
//get users from the data base
function getUsersList(){
    global $conn;
    $query = "SELECT * FROM users";
    $query_run = mysqli_query($conn, $query);
    if($query_run){
        if(mysqli_num_rows($query_run)>0){
            $res = mysqli_fetch_all($query_run, MYSQLI_ASSOC);
            $data = [
            'status'=> 200,
            'message' => 'users featched successfully!',
            'data'=>$res

        ];
        header("HTTP/1.0 200 OK");
        return json_encode($data);
        }else{
            $data = [
            'status'=> 404,
            'message' => 'No users Available!',

        ];
        header("HTTP/1.0 500 No users Available");
        return json_encode($data);
        }

    }else{
        $data = [
            'status'=> 500,
            'message' => 'Internal Serve Error!',

        ];
        header("HTTP/1.0 500 Internal Server Error");
        return json_encode($data);
    }
}
//post news api
function postNews( $data){
    global $conn;
    $news_title = $data['news_title'];
    $news_disc = $data['news_disc'];
    $post_date = $data['post_date'];
    $post_time = $data['post_time'];
    $news_intro = $data['news_intro'];
    $imageName  = $_FILES["news_image"]["name"];
    $tmpName = $_FILES["news_image"]["tmp_name"];
    $img_extension = explode('.',$imageName);
    $name = $img_extension[0]; 
    $newImageName = $name.'-'.uniqid().'.'.$img_extension[1];
    // $newImageName .= '.'.$img_extension;
    move_uploaded_file($tmpName, './uploads/'.$newImageName);
    $query = "INSERT INTO news (news_title, news_disc, post_date, post_time, news_img, news_intro)
            VALUES ('$news_title', '$news_disc', '$post_date','$post_time','$newImageName','$news_intro')";
    $result = mysqli_query($conn, $query);
    // return $data;
    if($result){
        $response = ['status'=>1,
        'message'=>'News has been posted!'];
        return json_encode($response);
        
    }
    else{
        return json_decode($result);
    }
   
}
//get all news 
function getNews(){
    global $conn;
    $query = "SELECT * FROM news";
    $result = mysqli_query($conn,$query);
    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            $news[] = $row;
        }
        return json_encode($news);
    }
    else{
        $response = ['status'=>0,
        'Message'=>'No news available!'];
        return  json_encode($response);
    }
    
}
//update postes or news
function updateNews($news_id, $data){
    global $conn;
    $news_title  = $data['news_title'];
    $news_intro = $data['news_intro'];
    $news_disc = $data['news_disc'];
    $post_date = $data['post_date'];
    $post_time = $data['post_time'];
    $query = "UPDATE news SET news_title='{$news_title}', news_intro='{$news_intro}',
            news_disc='{$news_disc}', post_date='{$post_date}', post_time='{$post_time}'
            WHERE id='{$news_id}'";
    $run_query = mysqli_query($conn, $query);
    if($run_query){
        $response = [
            'status'=>1,
            'message'=> 'News has been updated!'
        ];
        return $response;
    }
    else{
        $response = [
            'status'=> 0,
            'message'=>"Server Problem!"
        ];
        return $response;
    }
}
//Delete single news
function deleteNews($news_id){
    global $conn;
    $qury = "DELETE FROM news WHERE id = '{$news_id}'";
    $result = mysqli_query($conn, $qury);
 
    if($result){
        $response = [
            'status' => 1,
            'message' => "News Has Been Deleted"
        ];
        return $response;
    }else{
        $response = [
            'status'=>1,
            'message'=>"Server Problem!"
        ];
        return $response;
    }
}
//upload certificates 
function uploadCertificates($data){
    global $conn;
    $disc = $data['disc'];
    $certi_name = $_FILES['cert_img']['name'];
    $temp_name = $_FILES['cert_img']['tmp_name'];
    $extension = explode('.', $certi_name);
    $img_name = $extension[0];
    $new_img_name = $img_name.'-'.uniqid().'.'.$extension[1];
    move_uploaded_file($temp_name,'./certificates/'.$new_img_name);
    $query = "INSERT INTO `certificates` (`disc`, `certificates`) 
    VALUES ('{$disc}', '{$new_img_name}')";
    $result = mysqli_query($conn, $query);
    if($result){
        $response =[
            'status'=>200,
            'message'=>"Certification Uploaded Well!"
        ];
        return $response;
    }
    else{
        $response = [
            'status' => 405,
            'message'=>'Server Error!'
        ];
        return $response;
    }
}
//update certificates contenet
function deleteCertificate($cert_id){
    global $conn;
    $query = "SELECT certificates FROM certificates WHERE id = {$cert_id}";
    $result = mysqli_query($conn, $query);
    if($result){
        if(mysqli_num_rows($result)>0){
            $certif = [];
            // while($row = mysqli_fetch_assoc($result)){
            //     $certif[] = $row;
            // }
            $pic_name =mysqli_fetch_assoc($result);
            $pic_directory = './certificates/';
            $full_path = $pic_directory.$pic_name['certificates'];
            if(file_exists($full_path)){
                if(unlink($full_path)){
                    $query = "DELETE FROM certificates WHERE id={$cert_id}";
                    $res = mysqli_query($conn,$query);
                    if($res){
                        $response = [
                            'status' => 1,
                            'message'=>"Certificate Deleted!"
                        ];
                        
                    }
                }
                else{
                    $response = [
                        'status'=>0
                    ];
                }
            }
        return $response;
        }
    else{
        $res = [
            'status'=>0,
            "message"=>"Bad Request!"
        ];
        return $res;
    }
    }
}
//get all Certificates
function getCertificates(){
    global $conn;
    $query = "SELECT * FROM certificates";
    $result = mysqli_query($conn, $query);
    if($result){
        if(mysqli_num_rows($result) > 0){
            $certificates = [];
            while($rows = mysqli_fetch_assoc($result)){
            $certificates[] = $rows;
            }
            return $certificates;
        }
    }
}
?>