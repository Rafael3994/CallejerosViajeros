<?php
session_start();
require_once('DBAbstractModel.php');

class Usuario extends DBAbstractModel {
	
	private $nombre;
	private $apellidos;
	private $email;
	private $pass;
	private $isAdmin;

	function __construct() {
		$this->db_name = "callejerosViajeros";
	}

	function __toString() {
		return "Nombre: " . $this->nombre . ", Apellidos: " . $this->apellidos . ", Email " .
			$this->email . ", Pass:" . $this->pass . "isAdmin: " . $this->isAdmin . ")";
	}

	function __destruct() {
	}

	public function doLogin($userEmail = "", $pass) {
		
		$this->query = "SELECT * FROM Usuari WHERE username='$userEmail' AND password='$pass'";
		$this->get_results_from_query();


		if (count($this->rows) == 1) {
			$response = array('status' => 'OK', 'nom' => $this->rows[0]["nom"], 'cognom' => $this->rows[0]["cognom"], 'email' => $this->rows[0]["username"], 'password' => $this->rows[0]["password"], 'isAdmin' => $this->rows[0]["isAdmin"]);
			$_SESSION['nom']=$this->rows[0]["nom"];
			$_SESSION['cognom']=$this->rows[0]["cognom"];
			$_SESSION['username']=$this->rows[0]["username"];
			$_SESSION['password']=$this->rows[0]["password"];
			$_SESSION['isAdmin']=$this->rows[0]["isAdmin"];
			return json_encode($response);
		} else {
			return json_encode(array('status' => 'FAIL'));
		}
	}

	public function doRegister($nom, $cognom, $username, $pass){
		$this->query = "INSERT INTO Usuari (nom, cognom, username, password)
						VALUES ('$nom','$cognom','$username','$pass')";
		$this->execute_single_query();
		if($this->queryExitosa == true){
			return $this->doLogin($username, $pass);
		}
		else{
			return json_encode(array('status' => 'FAIL', 'email' => $username));
		}
	}

	public function mostrarUsuario() {
        $this->query = "SELECT *
                        FROM Usuari";
		$this->get_results_from_query();
		$todosUsuarios = array();
		for($i = 0; $i < count($this->rows); $i++){
			$username = $this->rows[$i]["username"];
			$usuari = array(
				"username" => $username
			);
			array_push($todosUsuarios, $usuari);
		}
		return json_encode($todosUsuarios);
	}
	
	public function deleteUser($username) {
		$this->query = "DELETE FROM Usuari WHERE username ='$username'";
		$this->execute_single_query($this->query);
	}


	
	public function updateInformacionUsuario($username, $nombre, $apellido, $password) {
		$this->query = "UPDATE Usuari 
						SET nom='$nombre', cognom= '$apellido', password='$password' 
        				WHERE username='$username'";
		$exito = $this->execute_single_query($this->query);
		if ($exito){
			return "FAIL";
		} else{
			return "OK";
		}
	}

	public function mostrarTot() {
		$this->query = "SELECT * FROM  contactes;";
		$this->get_results_from_query();
		for ($i = 0; $i < count($this->rows); $i++) {
			echo "<br><br>";
			echo "Email: " . $this->rows[$i]["email"] . "<br>";
			echo "Nom: " . $this->rows[$i]["nom"] . "<br>";
			echo "1r Cognom: " . $this->rows[$i]["cognom1"] . "<br>";
			echo "2n Cognom: " . $this->rows[$i]["cognom2"] . "<br>";
			echo "Telefon: " . $this->rows[$i]["telefon"] . "<br>";
		}
	}

	public function select($userEmail = "") {
		if ($userEmail != "") {
			$this->query = "SELECT *
                    FROM contactes
                    WHERE email='$userEmail'";
			$this->get_results_from_query();
		}
	}

	public function insert($userData = array()) {
		if (array_key_exists("email", $userData)) {
			$this->select($userData["email"]);
			if ($userData["email"] != $this->email) {
				foreach ($userData as $property => $value)
					$$property = $value;
				$this->query = "INSERT INTO contactes (email, nom, cognom1, cognom2, telefon)
					VALUES ('$email', '$nom', '$cognom1', '$cognom2', '$telefon')";
				$this->execute_single_query();
			}
		}
	}

	public function update($userData = array()) {
		foreach ($userData as $property => $value)
			$$property = $value;
		$this->query = "UPDATE contactes SET nom='$nom', cognom1= '$cognom1',
    cognom2 = '$cognom2', telefon = '$telefon' WHERE email='$email'";
		$this->execute_single_query($this->query);
	}

	public function delete($userEmail = "") {
		$this->query = "DELETE FROM contactes WHERE email ='$userEmail'";
		$this->execute_single_query($this->query);
		echo "<br>" . $userEmail . " ha sigut eliminat.";
	}
}

?>