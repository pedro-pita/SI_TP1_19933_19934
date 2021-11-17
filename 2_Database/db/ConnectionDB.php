<?php
class ConnectionDB{
    private $servername = "localhost";
    private $dbname = "covid_si";
    private $username = "root";
    private $password = "";
    public $conn;

    function connect(){
        try{
            $this->conn = new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $this->conn;    
        }catch(PDOException $e){
            http_response_code(500);
            return null;
        }
    }

    function close(){
        $this->conn->close();
    }

    function getConnection(){
        return $this->conn;
    }

    function insert(){
        $sql = "INSERT INTO student (nome, numero, email) VALUES (?,?,?)";
        $stmt= $this->conn->prepare($sql);
        $stmt->execute(['pedro', '19933', '19933@gmail.com']);
    }
}
?>