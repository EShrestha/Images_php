<?php

include_once "DBConnector.php";
echo "1";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');

$myDbConn = Get_DB_Connection();
$dbres = Create_Post($myDbConn, $_POST["title"]);
$result = Get_All_Posts($myDbConn);
if($result){
	$count = mysqli_num_rows($result);
}

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  	SaveImage($count, $_FILES["fileToUpload"]["tmp_name"]);
} 
else {
	echo "File is not an image.";
}

function SaveImage($filename, $file){
	$uploadOk = 1;
	$check = getimagesize($file);
	if($check !== false) {
		file_put_contents($filename, file_get_contents($file));
		echo "File successfully uploaded - " . $check["mime"] . ".";
		$uploadOk = 1;
	}
	return $uploadOk;
}

?>

