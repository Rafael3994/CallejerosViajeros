<?php

require_once('DBAbstractModel.php');

class Categoria extends DBAbstractModel {
	
	private $idCat;
	private $nombre;

	function __construct() {
		$this->db_name = "callejerosViajeros";
	}

	function __toString() {
		return "idCat: " . $this->idCat . ", Nombre: " . $this->nombre . ")";
	}

	function __destruct() {
	}

	public function selectAllCategorias() {
		
		$this->query = "SELECT *
				FROM Categoria";
		$this->get_results_from_query();
		
		if (count($this->rows) > 0) {

			$categorias = array();

			for ($i = 0; $i < count($this->rows); $i++) {

				$idCat = $this->rows[$i]["idCat"];
				$nom = $this->rows[$i]["nom"];
	
				$cat = array(
					"idCat" => $idCat,
					'nom' => $nom
				);
	
				array_push($categorias, $cat);
			}

			return json_encode($categorias);
		} else {
			return json_encode(array('status' => 'FAIL'));
		}
	}

	public function insertCategoria($nom){
		$this->query = "INSERT INTO Categoria (nom) VALUES ('$nom')";
		$this->execute_single_query();
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