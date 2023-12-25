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
//add location to loation database
function addLocation($data){
    global $conn;
    $google_map = $data['location'];
    $query = "SELECT COUNT(*) as total FROM `location`";
     $result = mysqli_query($conn, $query);
     if($result){
        $row = mysqli_fetch_assoc($result);
        if($row['total'] === "0"){
            $qu = "INSERT INTO `location` (`google_map`) VALUES ('{$google_map}')";
            $res = mysqli_query($conn, $qu);
            if($res){
                $response = [
                    'status' => 1,
                    'message' => "Map Saved"
                ];
                return $response;
            }
        }
        else{
            $response =  [
                'status' =>0,
                'Message' =>'Only one map link is supported'
            ];
            return $response;
        }
     }
}


//get location 
function getLocation(){
    global $conn;
    $query = "SELECT COUNT(*) as total FROM `location`";
    $result = mysqli_query($conn, $query);
    if($result){
        $row = mysqli_fetch_assoc($result);
        if($row['total'] > 0){
            $query = "SELECT * FROM `location`";
            $result = mysqli_query($conn, $query);
            if($result){
                $data = mysqli_fetch_assoc($result);
                $response = [
                    'status' =>1,
                    'map' => $data['google_map'],
                    'id' => $data['id']
                ];
                return $response;
            }
        }
        else{
            $response = [
                'status'=>0,
                'message' => 'No map available!'
            ];
            return $response;
        }

    }
}
/*
 for Statistic data
*/
function addData($data){
    global $conn;
    $cli = $data['cli'];
    $emp = $data['emp'];
    $query = "SELECT COUNT(*) as total FROM `statistic`";
     $result = mysqli_query($conn, $query);
     if($result){
        $row = mysqli_fetch_assoc($result);
        if($row['total'] === "0"){
            $qu = "INSERT INTO `statistic` (`emp`, `cli`) VALUES ('{$emp}', '{$cli}')";
            $res = mysqli_query($conn, $qu);
            if($res){
                $response = [
                    'status' => 1,
                    'message' => "Data Stored!"
                ];
                return $response;
            }
        }
        else{
            $response =  [
                'status' =>0,
                'Message' =>'Data is aleardy stored, delete to add new!'
            ];
            return $response;
        }
     }
}
function getStatisctic(){
    global $conn;
    $query = "SELECT COUNT(*) as total FROM `statistic`";
    $result = mysqli_query($conn, $query);
    if($result){
        $row = mysqli_fetch_assoc($result);
        if($row['total'] > 0){
            $query = "SELECT * FROM `statistic`";
            $result = mysqli_query($conn, $query);
            if($result){
                $data = mysqli_fetch_assoc($result);
                $response = [
                    'status' =>1,
                    'data' => $data
                ];
                return $response;
            }
        }
        else{
            $response = [
                'status'=>0,
                'message' => 'No Data available!'
            ];
            return $response;
        }

    }
}

//post Data in to gallary Data base
function postGallary($data){
       global $conn;
    $disc = $data['disc'];
    $option = $data['option'];
    $imageName  = $_FILES["image"]["name"];
    $tmpName = $_FILES["image"]["tmp_name"];
    $img_extension = explode('.',$imageName);
    $name = $img_extension[0]; 
    $newImageName = $name.'-'.uniqid().'.'.$img_extension[1];
    move_uploaded_file($tmpName, './gallary/'.$newImageName);
    $query = "INSERT INTO gallary (image, discription, type)
            VALUES ('$newImageName', '$disc', '$option')";
    $result = mysqli_query($conn, $query);
    if($result){
        $response = ['status'=>1,
        'message'=>'New Image Stored!'];
        return $response;
        
    }
    else{
        $response = [
            'status'=>0,
        ];
        return $response;
    }
}

function trancateGallary($tableName){
    global $conn;
    $query = "SELECT COUNT(*) FROM {$tableName}";
    $result = mysqli_query($conn, $query);
    if ($result) {
        $row = mysqli_fetch_array($result);
        $rowCount = $row[0];
        if ($rowCount > 0) {
            $query = "SELECT * FROM `gallary` ";
            $result = mysqli_query($conn, $query);
            while($row = $result->fetch_assoc()){
                $gallarys[] = $row['image'];
            }
            foreach($gallarys as $gallary){
                $full_path = './gallary/'.$gallary;
                unlink($full_path);
            }
            $query = "TRUNCATE TABLE $tableName";
            $result = mysqli_query($conn, $query);
            return [
                'status'=>1,
                'msg'=>"Table Cleard!"
            ];
        } 
       else {
            $response = [
                'status'=>0,
                'msg'=>'Table is empty'
                ];
            return $response;
         }
    }
    else{
        $response =[
            'status'=>0,
            'message'=>'Server Error'
        ];
        return $response;
    }
}
//post service
function postService($data){
    global $conn;
    $title = $data['title'];
    $disc = $data['disc'];
    $imageName  = $_FILES["pic"]["name"];
    $tmpName = $_FILES["pic"]["tmp_name"];
    $img_extension = explode('.',$imageName);
    $name = $img_extension[0]; 
    $newImageName = $name.'-'.uniqid().'.'.$img_extension[1];
    move_uploaded_file($tmpName, './uploads/'.$newImageName);
    $query = "INSERT INTO service (pic, title, disc)
            VALUES ('$newImageName', '$title','$disc')";
    $result = mysqli_query($conn, $query);
    if($result){
        $response = ['status'=>1,
        'message'=>'Service Add!'];
        return $response;
        
    }
    else{
        $response = [
            'status'=>0,
            'message'=>"Server Error!"
        ];
        return $result;
    }
    
}

//truncate service data base
function truncateTable($tableName){
    global $conn;
    $query = "SELECT COUNT(*) FROM {$tableName}";
    $result = mysqli_query($conn, $query);
    if ($result) {
        $row = mysqli_fetch_array($result);
        $rowCount = $row[0];
        if ($rowCount > 0) {
            $query = "SELECT * FROM `service` ";
            $result = mysqli_query($conn, $query);
            while($row = $result->fetch_assoc()){
                $pics[] = $row['pic'];
            }
            foreach($pics as $pic){
                $full_path = './uploads/'.$pic;
                unlink($full_path);
            }
            $query = "TRUNCATE TABLE service";
            $result = mysqli_query($conn, $query);
            return [
                'status'=>1,
                'msg'=>"Table Cleard!"
            ];
        } 
       else {
            $response = [
                'status'=>0,
                'msg'=>'Table is empty'
                ];
            return $response;
         }
    }
    else{
        $response =[
            'status'=>0,
            'message'=>'Server Error'
        ];
        return $response;
    }
}

//update service
function updateService($data, $_id){
    global $conn;
    $title = $data['title'];
    $disc = $data['disc'];
    $query = "SELECT pic FROM service WHERE id ='{$_id}'";
    $result = mysqli_query($conn, $query);
    if($result){
        $pic_name =mysqli_fetch_assoc($result);
        $pic_directory = './uploads/';
        $full_path = $pic_directory.$pic_name['pic'];
        if(file_exists($full_path)){
            if(unlink($full_path)){
                $imageName  = $_FILES["pic"]["name"];
                $tmpName = $_FILES["pic"]["tmp_name"];
                $img_extension = explode('.',$imageName);
                $name = $img_extension[0]; 
                $newImageName = $name.'-'.uniqid().'.'.$img_extension[1];
                move_uploaded_file($tmpName, './uploads/'.$newImageName);
                $sql = "UPDATE service SET pic=?, title=?, disc=? WHERE id=?";
                $stmt = $conn->prepare($sql);
                $stmt->bind_param('sssi', $newImageName, $title, $disc, $_id);
                if($stmt->execute()){
                    $response = [
                        'status'=>1,
                        'msg'=>'Data Updated!'
                    ];
                    return $response;
                }else{
                    $response = [
                        'status' => 0,
                        'msg'=>'Server Error'
                    ];
                    return $response;
                }
            }else{
                return "Un linkd Faild";
            }
        }else{
            return "no such file";
        }
    }else{
        $response = [
            'status'=>1,
            'message'=>'error deleting'
        ];
        return $response;
    }
}
//get recent blogs
function getTop3RecentNews() {
    global $conn;
    $query = "SELECT * FROM news ORDER BY post_date,id DESC LIMIT 3";
    $result = mysqli_query($conn, $query);
    $rows = array();
    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            $data = array();
            while ($row = mysqli_fetch_assoc($result)) {
                    $data[] = $row;
                }

    // Free the result set
    mysqli_free_result($result);
        }
        // return mysqli_free_result($result);
    } else {
        echo "<p>Error: " . mysqli_error($conn) . "</p>";
    }
    return $data;
}
//get data base on table name
function getDataBase($tableName){
     global $conn;
    $query = "SELECT * FROM $tableName";
    $result = mysqli_query($conn,$query);
    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            $data[] = $row;
        }
        $response = [
            'status' =>1,
            'data'=>$data
        ];
        return $response;
    }
    else{
        $response = ['status'=>0,
        'Message'=>'No Images Available!'];
        return $response;
    }
}
//get data by id from database
function getDataByID($table_name,$_ID){
    global $conn;
    $query = "SELECT * FROM $table_name WHERE id ='$_ID'";
    $result = mysqli_query($conn, $query);
    
    if($result){
        $response = [
            'status'=>1,
            "data"=>mysqli_fetch_assoc($result)
        ];
        return $response;
    }else{
        $response = [
            'status'=>0,
            'message'=>'Server Error!'
        ];
        return $response;
    }

}
//delete data from data base by id
function deleteDataBaseByID($table_name,$id){
    global $conn;
    $qury = "DELETE FROM $table_name WHERE id = '{$id}'";
    $result = mysqli_query($conn, $qury);
 
    if($result){
        $response = [
            'status' => 1,
            'message' => "Data Has Been Deleted"
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
//deleting data with files
function DeleteWithFiles($table_name,$col,$path,$data_id){
    global $conn;
    $query = "SELECT $col FROM $table_name WHERE id = {$data_id}";
    $result = mysqli_query($conn, $query);
    if($result){
        if(mysqli_num_rows($result)>0){
            $certif = [];
            // while($row = mysqli_fetch_assoc($result)){
            //     $certif[] = $row;
            // }
            $pic_name =mysqli_fetch_assoc($result);
            $pic_directory ='./' . $path . '/';
            $full_path = $pic_directory.$pic_name[$col];
            if(file_exists($full_path)){
                if(unlink($full_path)){
                    $query = "DELETE FROM $table_name WHERE id={$data_id}";
                    $res = mysqli_query($conn,$query);
                    if($res){
                        $response = [
                            'status' => 1,
                            'message'=>"Data Deleted!"
                        ];
                        return $response;
                    }
                }
                else{
                    $response = [
                        'status'=>0,
                        'message'=>'File does not exsist'
                    ];
                    return $response;
                }
            }
        }
    else{
        $res = [
            'status'=>0,
            "message"=>"No data available!"
        ];
        return $res;
    }
    }
}
//upload projects
function PostProjects($data){
    global $conn;
    $project_name = $data['project_name'];
    $project_type = $data['project_type'];
    $location = $data['location'];
    $project_field = $data['project_field'];
    $porject_status = intval($data['status']);
    $imageName  = $_FILES["project_image"]["name"];
    $tmpName = $_FILES["project_image"]["tmp_name"];
    $img_extension = explode('.',$imageName);
    $name = $img_extension[0]; 
    $newImageName = $name.'-'.uniqid().'.'.$img_extension[1];
    move_uploaded_file($tmpName, './projects/'.$newImageName);
    $query = "INSERT INTO projects (image, project_field, project_name, project_type, status,location)
            VALUES ('$newImageName', '$project_field','$project_name', '$project_type', '$porject_status', '$location')";
    $result = mysqli_query($conn, $query);
    if($result){
        $response = ['status'=>1,
        'message'=>'Project Add!'];
        return $response;
        
    }
    else{
        $response = [
            'status'=>0,
            'message'=>"Server Error!"
        ];
        return $result;
    }
    
}
?>