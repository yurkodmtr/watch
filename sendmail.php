<?php
$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
$address = isset($_POST['address']) ? $_POST['address'] : '';

if(empty($name) || empty($email) || empty($phone) || empty($address) ){
    header('HTTP/1.1 500 Internal Server Booboo');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode(array('message' => 'Some field is empty', 'code' => 500)));
}

$headers = 'From: ' . $name . '<' . $email . '>' . "\r\n" .
    'Content-type: text/html;' .
    'Reply-To: ' . $email . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

    $message = '
        <table border="1">
            <tr>
                <td>Name:</td>
                <td>' . $name . '</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>' . $email . '</td>
            </tr>
            <tr>
                <td>Phone:</td>
                <td>' . $phone . '</td>
            </tr>
            <tr>
                <td>Address:</td>
                <td>' . $address . '</td>
            </tr>
        </table>
    ';

    $subject = empty($_POST['subject']) || !isset($_POST['subject']) ? "Spacework website" : $_POST['subject'];
    
  $mail = mail( "4au.4au.4au@gmail.com", $subject, $message, $headers );


  if($mail){
    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode(array('message' => 'Message send successful', 'code' => 200)));
  }

?>