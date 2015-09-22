<?php
require_once('bootstrap.php');
$array = array();
$recipeArray = array();

class Food {
    public $name = null;
    public $quantity = null;
    
    public function __construct($nameVar, $quantityVar) {
       $this->name = $nameVar; 
       $this->quantity = $quantityVar;
    }
}

class Recipe {
    public $name = null;
    public $instructions = null;
    public $food = array();
    
    public function __construct($nameVar, $instructionString, $foodArray) {
        $this->name = $nameVar;
        $this->instructions = $instructionString;
        $this->food = $foodArray;
    }
}

$db = new PDO("mysql:host=$hostname;dbname=$dbname", $username, $password);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
try {
    //connect as appropriate as above
    foreach($db->query("SELECT * FROM recipes") as $row) {
        $array[] = $row;
    }
    
    for($i = 0; $i < count($array); $i++) {
        $name = $array[$i]['name'];
        $instructions = $array[$i]['instructions'];
        $foodArray = null;

        $foodString = $array[$i]['food'];
        $tempArray = explode(';', $foodString);
        for($j = 0; $j < count($tempArray); $j++) {
            $subArray = explode(',', $tempArray[$j]); 
            $food = new Food($subArray[0], $subArray[1]);
            $foodArray[] = $food;
        }
        
        $recipeArray[] = (new Recipe($name, $instructions, $foodArray));        
    }
    
    echo json_encode($recipeArray);
} catch(PDOException $ex) {
    echo "An Error occured!"; //user friendly message
}
?>