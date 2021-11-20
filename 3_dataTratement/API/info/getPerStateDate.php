<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../db/ConnectionDB.php';
    include_once '../objects/InformationDB.php';
    include_once '../objects/StateDB.php';
    include_once '../objects/DateDB.php';

    // Instace Database
    $db = new ConnectionDB();
    $conn = $db->connect();
    if($conn == null){
        return;
    }
    

    $informationDB = new InformationDB($conn);
    $statesDB = new StateDB($conn);
    $dateDB = new DateDB($conn);

    $response = [
        'info' => $informationDB->getPerStateDate(),
        'states' => $statesDB->getAll(),
        'dates' => $dateDB->getAll()
    ];

    echo json_encode($response);
    
?>