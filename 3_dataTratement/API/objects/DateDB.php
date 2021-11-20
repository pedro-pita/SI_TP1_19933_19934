<?php
class DateDB{
    public $conn;
    private $table = "dim_date";

    function __construct($db){
        $this->conn = $db;
    }

    function getAll(){
        $query = 'SELECT * FROM ' . $this->table . ' ORDER BY dateKey ASC';

        $stmt = $this->conn->query($query);
        if ($stmt->rowCount() > 0)
            return $stmt->fetchAll();
        return ['status' => 'error', 'message' => 'No data'];
    }
    
    function insert($data){
        $query = "INSERT INTO $this->table (dateKey, date, year, month, monthName, dayOfMonth, dayOfWeek, dayOfWeekName) VALUES (:dateKey, :date, :year, :month, :monthName, :dayOfMonth, :dayOfWeek, :dayOfWeekName)";
        $stmt = $this->conn->prepare($query);
        foreach($data as $item)
        {
            $stmt->bindValue(':dateKey', $item->dateKey);
            $stmt->bindValue(':date', $item->date);
            $stmt->bindValue(':year', $item->year);
            $stmt->bindValue(':month', $item->month);
            $stmt->bindValue(':monthName', $item->monthName);
            $stmt->bindValue(':dayOfMonth', $item->dayOfMonth);
            $stmt->bindValue(':dayOfWeek', $item->dayOfWeek);
            $stmt->bindValue(':dayOfWeekName', $item->dayOfWeekName);

            if(!$stmt->execute()){
                return false;
            }
        }
        return true;
    }
}
?>