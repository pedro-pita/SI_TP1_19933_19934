<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../db/ConnectionDB.php';
    include_once '../objects/InformationDB.php';

    // Instace Database
    $db = new ConnectionDB();
    $conn = $db->connect();
    if($conn == null){
        return;
    }
    

    $informationDB = new InformationDB($conn);

    $response = $informationDB->getPerStateDate();

    echo json_encode($response);
    
?>