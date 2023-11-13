<?php
$host = "localhost";
$username = "root";
$passoword = "";
$dbname = "bloomline";
$conn = mysqli_connect($host,$username,$passoword,$dbname);
if(!$conn){
die("Connection Faild: ".mysqli_connect_error());
}

?>