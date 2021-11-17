<?php
class InformationDB{
    public $conn;
    private $table = "fact_information";

    function __construct($db){
        $this->conn = $db;
    }
    
    function insert($data){
        $query = "INSERT INTO $this->table (dateKeyFK, stateCodeFK, transmissionLevelFK, riskLevelFK, currentCases, currentDeaths, newCases, newDeaths, contactTracers, testsPositives, testsNegatives, vaccinesDistributed, vaccinesAdministered, vaccinesCompleted, hospitalCapacity, hospitalCurrentUsageTotal, hospitalCurrentUsageCovid) VALUES (:dateKeyFK, :stateCodeFK, :transmissionLevelFK, :riskLevelFK, :currentCases, :currentDeaths, :newCases, :newDeaths, :contactTracers, :testsPositives, :testsNegatives, :vaccinesDistributed, :vaccinesAdministered, :vaccinesCompleted, :hospitalCapacity, :hospitalCurrentUsageTotal, :hospitalCurrentUsageCovid)";
        $stmt = $this->conn->prepare($query);
        foreach($data as $state)
        {
            foreach($state as $item){
                $stmt->bindValue(':dateKeyFK', $item->dateKeyFK);
                $stmt->bindValue(':stateCodeFK', $item->stateCodeFK);
                $stmt->bindValue(':transmissionLevelFK', $item->transmissionLevelFK);
                $stmt->bindValue(':riskLevelFK', $item->riskLevelFK);
                $stmt->bindValue(':currentCases', $item->currentCases);
                $stmt->bindValue(':currentDeaths', $item->currentDeaths);
                $stmt->bindValue(':newCases', $item->newCases);
                $stmt->bindValue(':newDeaths', $item->newDeaths);
                $stmt->bindValue(':contactTracers', $item->contactTracers);
                $stmt->bindValue(':testsPositives', $item->testsPositives);
                $stmt->bindValue(':testsNegatives', $item->testsNegatives);
                $stmt->bindValue(':vaccinesDistributed', $item->vaccinesDistributed);
                $stmt->bindValue(':vaccinesAdministered', $item->vaccinesAdministered);
                $stmt->bindValue(':vaccinesCompleted', $item->vaccinesCompleted);
                $stmt->bindValue(':hospitalCapacity', $item->hospitalCapacity);
                $stmt->bindValue(':hospitalCurrentUsageTotal', $item->hospitalCurrentUsageTotal);
                $stmt->bindValue(':hospitalCurrentUsageCovid', $item->hospitalCurrentUsageCovid);

                if(!$stmt->execute()){
                    return false;
                }
            }
        }
        return true;
    }
}
?>