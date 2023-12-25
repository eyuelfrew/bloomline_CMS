<?php
global $conn;



$to = "eyuelfrew430@gmail.com"; // Change this email to your //
$subject = "test";
$body = "You have received a new message from your website contact form.\n\n";
$header = "From: eyumanfrew@gmail.com";
$header .= "Reply-To: eyuelfrew430@gmail.com";	

if(!mail($to, $subject, $body, $header))
  http_response_code(500);
?>