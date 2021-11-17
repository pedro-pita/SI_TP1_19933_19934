<?php
include_once './db/ConnectionDB.php';
include_once './objects/DateDB.php';
include_once './objects/InformationDB.php';
include_once './objects/RiskLevelDB.php';
include_once './objects/StateDB.php';
include_once './objects/TransmissionLevelDB.php';

$db = new ConnectionDB();
$conn = $db->connect();
if($conn == null){
    return;
}

/*$dates = json_decode(file_get_contents('../1_DataExportAndTreatment/TreatedData/dates.json', true));
$dateDB = new DateDB($conn);
$dateDB->insert($dates->dates);*/

$information = json_decode(file_get_contents('../1_DataExportAndTreatment/TreatedData/information.json', true));
$informationDB = new InformationDB($conn);
$informationDB->insert($information->information);

/*$riskLevel = json_decode(file_get_contents('../1_DataExportAndTreatment/TreatedData/riskLevel.json', true));
$riskLevelDB = new RiskLevelDB($conn);
$riskLevelDB->insert($riskLevel->riskLevel);

$states = json_decode(file_get_contents('../1_DataExportAndTreatment/TreatedData/states.json', true));
$statesDB = new StateDB($conn);
$statesDB->insert($states->states);

$transmissionLevel = json_decode(file_get_contents('../1_DataExportAndTreatment/TreatedData/trasmissionLevel.json', true));
$transmissionLevelDB = new TransmissionLevelDB($conn);
$transmissionLevelDB->insert($transmissionLevel->transmissionLevel);
echo 'ok';*/

?>