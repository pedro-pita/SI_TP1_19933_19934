<?php
class StateDB{
    public $conn;
    private $table = "dim_state";

    function __construct($db){
        $this->conn = $db;
    }
    
    function insert($data){
        $query = "INSERT INTO $this->table (stateCode, name, fips, population, locationIso2, countryCode, countryName) VALUES (:stateCode, :name, :fips, :population, :locationIso2, :countryCode, :countryName)";
        $stmt = $this->conn->prepare($query);
        foreach($data as $item)
        {
            $stmt->bindValue(':stateCode', $item->stateCode);
            $stmt->bindValue(':name', $item->name);
            $stmt->bindValue(':fips', $item->fips);
            $stmt->bindValue(':population', $item->population);
            $stmt->bindValue(':locationIso2', $item->locationIso2);
            $stmt->bindValue(':countryCode', $item->countryCode);
            $stmt->bindValue(':countryName', $item->countryName);

            if(!$stmt->execute()){
                return false;
            }
        }
        return true;
    }
}
?>