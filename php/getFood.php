<?php
require_once('bootstrap.php');
$array = array();
$db = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
try {
    //connect as appropriate as above
    foreach($db->query("SELECT * FROM food") as $row) {
        $array[] = $row;
    }
    echo json_encode($array);
} catch(PDOException $ex) {
    echo "An Error occured!"; //user friendly message
}
?>
