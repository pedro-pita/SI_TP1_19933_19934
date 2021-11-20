<?php
class InformationDB{
    public $conn;
    private $table = "fact_information";

    function __construct($db){
        $this->conn = $db;
    }
    
    function getPerStateDate() {
        $query = 'SELECT * FROM ' . $this->table . ' as fi
            INNER JOIN dim_state as ds ON fi.stateCodeFK = ds.stateCode
            INNER JOIN dim_date as dd ON fi.dateKeyFK = dd.dateKey
            INNER JOIN dim_transmission_level as dtl ON fi.transmissionLevelFK = dtl.level
            INNER JOIN dim_risk_level as drl ON fi.riskLevelFK = drl.level
            GROUP BY fi.stateCodeFK, fi.dateKeyFK
            ORDER BY fi.stateCodeFK ASC, fi.dateKeyFK ASC'
        ;

        $stmt = $this->conn->query($query);
        if ($stmt->rowCount() > 0)
            return $stmt->fetchAll();
        return ['status' => 'error', 'message' => 'No data'];
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