<?php
    include_once "DBConnector.php";

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    
    $myDbConn = Get_DB_Connection();
    
    $dbres = Get_All_Posts($myDbConn);
    
    
    if($dbres){
        $rows = mysqli_fetch_assoc($dbres);
        if (!$rows) {
            echo "No results";
        } else {
            do {
                // Getting information from the row
                $id = $rows['imageID'];
                $title = $rows['title'];
                $viewCount = $rows['viewCount'];
    
                // Adding info to array
                    $result['result'][] = array('ID' => $id, 'title' => $title, 'viewCount' => $viewCount);
            } while ($rows = mysqli_fetch_assoc($dbres));
    
            mysqli_close($myDbConn);
    
            // Converting to JSON and returning 
            echo json_encode($result);
        }
    }else{
        echo "No response form DB";
    }
?>
