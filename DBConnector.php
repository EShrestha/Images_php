<?php

DEFINE ("DB_USER", "phpa");
DEFINE ("DB_PWD", "testing123");
DEFINE ("DB_SERVER", "localhost");
//DEFINE ("DB_SERVER", "10.0.0.28");
DEFINE ("DB_NAME", "myDB");
DEFINE ("DB_PORT", "3306");

// Returns a connection to the data base
function Get_DB_Connection(){
    $dbConnection = @mysqli_connect(DB_SERVER, DB_USER, DB_PWD, DB_NAME, DB_PORT)
    OR die('Failed to connect to MySQL ' . DB_SERVER . '::' . DB_NAME . ' : ' . mysqli_connect_error());
    return $dbConnection;
}

// Tries to prevent any SQL injection
function SANITIZE($q){
    return str_replace(";", "", $q);
}

function Get_All_Posts($dbConnection){
    $q = "SELECT * FROM Images";
    return @mysqli_query($dbConnection, $q);
}

function Get_User($dbConnection, $username, $password){
    $q = "SELECT * FROM Users WHERE username LIKE '{$username}' AND  pwd LIKE '{$password}'";
    return @mysqli_query($dbConnection, $q);
}

function Create_Post($dbConnection, $title){
    $q = SANITIZE("INSERT INTO Images (title) VALUES ('{$title}')");
    return @mysqli_query($dbConnection, $q);
}

function Delete_Post($dbConnection, $imageID){
    $q = "DELETE FROM Images WHERE imageID = {$imageID}";
    return @mysqli_query($dbConnection, $q);
}

function Get_Post($dbConnection, $imageID){
    $q = "SELECT * FROM Images WHERE imageID = {$imageID}";
    $q2 = "UPDATE Images SET viewCount = viewCount + 1";
    @mysqli_query($dbConnection, $q2);
    return @mysqli_query($dbConnection, $q);
}

function Post_Comment($dbConnection, $belongsTo, $comment)
{
    $q = "INSERT INTO Comments (belongsTo, comment) VALUES ({$belongsTo}, '{$comment}')";
    return @mysqli_query($dbConnection, $q);
}

function Get_Comments($dbConnection, $imageID){
    $q = "SELECT * FROM Comments WHERE belongsTo = {$imageID}";
    return @mysqli_query($dbConnection, $q);
}

?>
