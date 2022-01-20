<?php
require_once('DBAbstractModel.php');

class Experiencia extends DBAbstractModel {
	private $img;
	private $titulo;
	private $descripcion;
	private $likes;
	private $dislikes;

	private $num_experiencias_por_pagina = 4;

	function __construct() {
		$this->db_name = "callejerosViajeros";
	}

	function __destruct() {
	}


	public function getExperiencias($categoria) {
		$experiencias = array();
		if ($categoria!="Todas"){
			$this->query = "SELECT * FROM Experiencia WHERE idCat = (SELECT idCat FROM Categoria WHERE nom = '$categoria') LIMIT 0, ".$this->num_experiencias_por_pagina;
		} else {
			$this->query = 'SELECT * FROM Experiencia LIMIT 0, '.$this->num_experiencias_por_pagina;
		}

		$this->get_results_from_query();
		for ($i = 0; $i < count($this->rows); $i++) {
			$idCat = $this->rows[$i]["idCat"];
			$exp = array(
				"idExp" => $this->rows[$i]["idExp"],
				'titol' => $this->rows[$i]["titol"],
				'data' =>  $this->rows[$i]["data"],
				'text' => $this->rows[$i]["text"],
				'imatge' => $this->rows[$i]["imatge"],
				'coordenades' => $this->rows[$i]["coordenades"],
				'likes' => $this->rows[$i]["likes"],
				'dislikes' => $this->rows[$i]["dislikes"],
				'estat' => $this->rows[$i]["estat"],
				'idCat' => $this->rows[$i]["idCat"],
				'username' => $this->rows[$i]["username"],
				'reportat' => $this->rows[$i]["reportat"],
				'nomCategoria' => $this->getNomCategoria($idCat)
			);
			array_push($experiencias, $exp);
		}
		return json_encode($experiencias);
	}

	public function getTotalExperiences($categoria){
		if($categoria!="Todas"){
			$this->query = "SELECT COUNT(*) as total_experiencias FROM Experiencia WHERE idCat = (SELECT idCat FROM Categoria WHERE nom = '$categoria')";
		}
		else{
			$this->query = 'SELECT COUNT(*) as total_experiencias FROM Experiencia';
		}
		
		$this->get_results_from_query();
		return $this->rows[0]["total_experiencias"];
	}


	public function setNavegadorPaginas($categoria){
		$navegador = "";
		$numTotalExperiencias = $this->getTotalExperiences($categoria);
		$num_paginas = ceil($numTotalExperiencias / $this->num_experiencias_por_pagina);

		if ($num_paginas > 1) {
			$navegador = '<div class="row">';
			$navegador .= '<div class="col-lg-12">';
			$navegador .= '<nav aria-label="Page navigation example">';
			$navegador .= '<ul class="pagination justify-content-end">';

			for ($i=1;$i<=$num_paginas;$i++) {
				$class_active = '';
				if ($i == 1) {
					$class_active = 'active';
				}
				$navegador .= '<li class="page-item '.$class_active.'"><a class="page-link" data="'.$i.'">'.$i.'</a></li>';
			}

			$navegador .= '</ul>';
			$navegador .= '</nav>';
			$navegador .= '</div>';
			$navegador .= '</div>';
		}
		return $navegador;
	}


	public function muestraOtraPagina($page, $categoria){
		$experiencias = array();
		
		$rowsPerPage = $this->num_experiencias_por_pagina;
		$offset = ($page - 1) * $rowsPerPage;
		sleep(1);

		if($categoria!="Todas"){
			$this->query = "SELECT * FROM Experiencia WHERE idCat = (SELECT idCat FROM Categoria WHERE nom = '$categoria') LIMIT ".$offset.", ".$rowsPerPage;
		}
		else{
			$this->query = 'SELECT * FROM Experiencia LIMIT '.$offset.', '.$rowsPerPage;
		}
		
		
		$this->get_results_from_query();

		for ($i = 0; $i < count($this->rows); $i++) {

			$idCat = $this->rows[$i]["idCat"];

			$exp = array(
				"idExp" => $this->rows[$i]["idExp"],
				'titol' => $this->rows[$i]["titol"],
				'data' =>  $this->rows[$i]["data"],
				'text' => $this->rows[$i]["text"],
				'imatge' => $this->rows[$i]["imatge"],
				'coordenades' => $this->rows[$i]["coordenades"],
				'likes' => $this->rows[$i]["likes"],
				'dislikes' => $this->rows[$i]["dislikes"],
				'estat' => $this->rows[$i]["estat"],
				'idCat' => $this->rows[$i]["idCat"],
				'username' => $this->rows[$i]["username"],
				'reportat' => $this->rows[$i]["reportat"],
				'nomCategoria' => $this->getNomCategoria($idCat)
			);

			array_push($experiencias, $exp);
		}
		return json_encode($experiencias);
	}


	public function mostrarEsbozos(){
		$experiencias = array();
		$this->query = "SELECT * FROM  Experiencia WHERE estat='esborrany';";
		$this->get_results_from_query();
		for ($i = 0; $i < count($this->rows); $i++) {
			$idCat = $this->rows[$i]["idCat"];
			$exp = array(
				"idExp" => $this->rows[$i]["idExp"],
				'titol' => $this->rows[$i]["titol"],
				'data' =>  $this->rows[$i]["data"],
				'text' => $this->rows[$i]["text"],
				'imatge' => $this->rows[$i]["imatge"],
				'coordenades' => $this->rows[$i]["coordenades"],
				'likes' => $this->rows[$i]["likes"],
				'dislikes' => $this->rows[$i]["dislikes"],
				'estat' => $this->rows[$i]["estat"],
				'idCat' => $this->rows[$i]["idCat"],
				'username' => $this->rows[$i]["username"],
				'reportat' => $this->rows[$i]["reportat"],
				'nomCategoria' => $this->getNomCategoria($idCat)
			);

			array_push($experiencias, $exp);
		}
		return json_encode($experiencias);
	}

	public function mostrarReportadas(){
		$experiencias = array();
		$this->query = "SELECT * FROM  Experiencia WHERE reportat = '1';";
		$this->get_results_from_query();
		for ($i = 0; $i < count($this->rows); $i++) {
			$idCat = $this->rows[$i]["idCat"];
			$exp = array(
				"idExp" => $this->rows[$i]["idExp"],
				'titol' => $this->rows[$i]["titol"],
				'data' =>  $this->rows[$i]["data"],
				'text' => $this->rows[$i]["text"],
				'imatge' => $this->rows[$i]["imatge"],
				'coordenades' => $this->rows[$i]["coordenades"],
				'likes' => $this->rows[$i]["likes"],
				'dislikes' => $this->rows[$i]["dislikes"],
				'estat' => $this->rows[$i]["estat"],
				'idCat' => $this->rows[$i]["idCat"],
				'username' => $this->rows[$i]["username"],
				'reportat' => $this->rows[$i]["reportat"],
				'nomCategoria' => $this->getNomCategoria($idCat)
			);
			array_push($experiencias, $exp);
		}
		return json_encode($experiencias);
	}

	public function getNomCategoria($idCat) {
		$this->query = "SELECT nom FROM Categoria WHERE idCat = $idCat;";
		$this->get_results_from_query();
		return $this->rows[0]["nom"];
	}

	public function updateLikes($idExp, $likes, $dislikes) {
		$this->query = "UPDATE Experiencia SET likes='$likes', dislikes= '$dislikes'
        WHERE idExp='$idExp'";
		$this->execute_single_query();
		if ($this->queryExitosa == 0) {
			return "FAIL";
		} else {
			return "OK";
		}
	}

	public function rebutjarExperiencia($idExp) {
		$this->query = "UPDATE Experiencia SET estat='rebutjada' WHERE idExp='$idExp'";
		$this->execute_single_query();
		if ($this->queryExitosa == 0) {
			return "FAIL";
		} else {
			return "OK";
		}
	}

	public function updateEstado($idExp){
		$this->query = "UPDATE Experiencia SET estat='publicada' WHERE idExp='$idExp'";
		$this->execute_single_query();
		if ($this->queryExitosa == 0) {
			return "FAIL";
		} else {
			return "OK";
		}
	}

	public function updateReporte($idCard){
		$this->query = "UPDATE Experiencia SET reportat = 0 WHERE idExp='$idCard'";
		$this->execute_single_query();
		if ($this->queryExitosa == 0) {
			return "FAIL";
		} else {
			return "OK";
		}
	}

	public function updateExperiencia($idExp, $newTitulo, $newFecha, $newTexto, $newImg) {
		$this->query = "UPDATE Experiencia SET titol='$newTitulo', data='$newFecha', text='$newTexto', imatge='$newImg'
        WHERE idExp='$idExp'";
		$this->execute_single_query();
		if ($this->queryExitosa == 0) {
			return "FAIL";
		} else {
			return "OK";
		}
	}

	public function eliminarExperiencia($idCard) {
		$this->query = "DELETE FROM Experiencia WHERE idExp ='$idCard'";
		$this->execute_single_query();
		if ($this->queryExitosa == 0) {
			return "FAIL";
		} else {
			return "OK";
		}
	}

	public function	reportarExperiencia($idCard) {
		$this->query = "UPDATE Experiencia SET reportat='1'
        WHERE idExp='$idCard'";
		$this->execute_single_query();
		if ($this->queryExitosa == 0) {
			return "FAIL";
		} else {
			return "OK";
		}
	}

	public function anadirExp($titol, $text, $imatge, $coordenades, $idCat, $username) {
		$this->query = "INSERT INTO Experiencia (titol, data, text, imatge, coordenades, likes, dislikes, estat, idCat, username, reportat) VALUES ('$titol', CURDATE(), '$text', '$imatge', '$coordenades', 0, 0, 'esborrany', $idCat, '$username', false)";
		$this->execute_single_query($this->query);
		return "ALGO" . $imatge;
	}
}
