<?php
session_start();

include_once "DBConnector.php";

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');

$myDbConn = Get_DB_Connection();
$dbres = Post_Comment($myDbConn, $_GET['id'], $_GET['comment'], $_SESSION["username"]);

if($dbres){
    echo "POST";
}else{
    echo "NO POST";
}
?>
