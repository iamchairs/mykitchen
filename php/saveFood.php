<?php
require_once('bootstrap.php');
$data = json_decode(file_get_contents('php://input'),true);
$db = new PDO("mysql:host=$hostname;dbname=$dbname;", $username, $password);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
for($i = 0; $i < count($data); $i++) {
    $id = $data[$i]['id'];
    $name = $data[$i]['name'];
    $quantity = $data[$i]['quantity'];
    $unit = $data[$i]['unit'];
     try{
         $prepared = $db->prepare("SELECT * FROM food WHERE id=?");
         $prepared->execute(array($id));
         if($prepared->rowCount()) {
            // if a record of this food ALREADY exists
            $prepared = $db->prepare("UPDATE food SET name=?, quantity=?, unit=? WHERE id = ?");
            $prepared->execute(array($name, $quantity, $unit, $id));
         } else {
            // if a record of this food DOESNT exists
            $prepared = $db->prepare("INSERT INTO food (name, quantity, unit) VALUES (?,?,?)");
            $prepared->execute(array($name, $quantity, $unit));
            echo "doesn't exist";
         }
          echo 'no error';
     } catch (PDOException $error) {
         echo "nooooo!.." . $error; 
     }
}
    
?>