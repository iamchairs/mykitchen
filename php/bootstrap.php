<?php
    $hostname = 'null';
    $dbname = 'null';
    $username = 'null';
    $password = 'null';
    
    if($dbname) {
        $conn = new mysqli($hostname, $username, $password);
        if($conn->query("CREATE DATABASE $dbname") === true) {
            $conn = new mysqli($hostname, $username, $password, $dbname);
            $sql = "CREATE TABLE food (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(30),
                unit VARCHAR(30),
                quantity int(6)
            )";
            $conn->query($sql);
            $sql = "CREATE TABLE recipes (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(30),
                instructions TEXT,
                food TEXT 
            )";
            $conn->query($sql);
        } 
    }
?>