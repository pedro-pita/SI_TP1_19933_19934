<?php
class RiskLevelDB{
    public $conn;
    private $table = "dim_risk_level";

    function __construct($db){
        $this->conn = $db;
    }
    
    function insert($data){
        $query = "INSERT INTO $this->table (level, description) VALUES (:level, :description)";
        $stmt = $this->conn->prepare($query);
        foreach($data as $item)
        {
            $stmt->bindValue(':level', $item->level);
            $stmt->bindValue(':description', $item->description);

            if(!$stmt->execute()){
                return false;
            }
        }
        return true;
    }
}
?>