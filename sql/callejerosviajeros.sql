-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-01-2022 a las 21:01:03
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `callejerosviajeros`
--
CREATE DATABASE IF NOT EXISTS `callejerosViajeros`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idCat` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCat`, `nom`) VALUES
(1, 'Aventuras'),
(2, 'Educativa'),
(3, 'Familiar'),
(4, 'Historico'),
(5, 'Romantico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `experiencia`
--

CREATE TABLE `experiencia` (
  `idExp` int(11) NOT NULL,
  `titol` varchar(200) NOT NULL,
  `data` date NOT NULL,
  `text` mediumtext NOT NULL,
  `imatge` varchar(50) NOT NULL,
  `coordenades` varchar(100) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `estat` enum('publicada','rebutjada','esborrany') NOT NULL,
  `idCat` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `reportat` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `experiencia`
--

INSERT INTO `experiencia` (`idExp`, `titol`, `data`, `text`, `imatge`, `coordenades`, `likes`, `dislikes`, `estat`, `idCat`, `username`, `reportat`) VALUES
(1, 'Viatge Albania en grup', '2020-10-07', 'Es el pais de las sonrisas, de la amabilidad y de la tolerancia religiosa. He vuelto sorprendida y encantada. Solo espero y deseo que el turismo, que no tardara demasiado en acudir en masa, no les cambie.', 'Albania.jpg', '40.724327, 19.586418', 0, 0, 'publicada', 1, 'admin', 0),
(2, 'Viatge Tanzania Safari Nord', '2019-06-12', 'Es el pais de las sonrisas, de la amabilidad y de la tolerancia religiosa. He vuelto sorprendida y encantada. Solo espero y deseo que el turismo, que no tardara demasiado en acudir en masa, no les cambie.', 'descarga.jpg', '-2.450819, 32.902157', 0, 0, 'publicada', 2, 'admin', 0),
(3, 'Viatge Costa Rica en grup', '2020-10-07', 'Es el pais de las sonrisas, de la amabilidad y de la tolerancia religiosa. He vuelto sorprendida y encantada. Solo espero y deseo que el turismo, que no tardara demasiado en acudir en masa, no les cambie.', 'CostaRica.jpg', '9.381387, -84.145301', 0, 0, 'publicada', 2, 'admin', 0),
(4, 'Viatge Liban Classic 10 Dies', '2020-10-07', 'Es el pais de las sonrisas, de la amabilidad y de la tolerancia religiosa. He vuelto sorprendida y encantada. Solo espero y deseo que el turismo, que no tardara demasiado en acudir en masa, no les cambie.', 'Libano.jpg', '33.902952, 35.492856', 0, 0, 'publicada', 3, 'admin', 0),
(5, 'Liban Trekking 8 Dies', '2020-06-19', 'Es el pais de las sonrisas, de la amabilidad y de la tolerancia religiosa. He vuelto sorprendida y encantada. Solo espero y deseo que el turismo, que no tardara demasiado en acudir en masa, no les cambie.', 'Libano.jpg', '34.438768, 36.012988', 0, 0, 'rebutjada', 3, 'user', 0),
(6, 'Viatge Grecia en grup', '2020-10-07', 'Es el pais de las sonrisas, de la amabilidad y de la tolerancia religiosa. He vuelto sorprendida y encantada. Solo espero y deseo que el turismo, que no tardara demasiado en acudir en masa, no les cambie.', 'Grecia.jpg', '37.971790, 23.726150', 0, 0, 'publicada', 4, 'user', 1),
(7, 'Viatge Serbia en grup', '2020-10-07', 'Es el pais de las sonrisas, de la amabilidad y de la tolerancia religiosa. He vuelto sorprendida y encantada. Solo espero y deseo que el turismo, que no tardara demasiado en acudir en masa, no les cambie.', 'Serbia.jpg', '44.817852, 20.445447', 0, 0, 'esborrany', 4, 'user', 0),
(8, 'Viatge al Raval en grup', '2020-10-07', 'Es el pais de las sonrisas, de la amabilidad y de la tolerancia religiosa. He vuelto sorprendida y encantada. Solo espero y deseo que el turismo, que no tardara demasiado en acudir en masa, no les cambie.', 'Raval.jpg', '41.378704, 2.170521', 0, 0, 'publicada', 1, 'user', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuari`
--

CREATE TABLE `usuari` (
  `nom` varchar(50) NOT NULL,
  `cognom` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuari`
--

INSERT INTO `usuari` (`nom`, `cognom`, `username`, `password`, `isAdmin`) VALUES
('admin', 'admin', 'admin', 'admin', 1),
('user', 'user', 'user', 'user', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCat`);

--
-- Indices de la tabla `experiencia`
--
ALTER TABLE `experiencia`
  ADD PRIMARY KEY (`idExp`),
  ADD KEY `idCat` (`idCat`),
  ADD KEY `username` (`username`);

--
-- Indices de la tabla `usuari`
--
ALTER TABLE `usuari`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `experiencia`
--
ALTER TABLE `experiencia`
  MODIFY `idExp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `experiencia`
--
ALTER TABLE `experiencia`
  ADD CONSTRAINT `Experiencia_ibfk_1` FOREIGN KEY (`idCat`) REFERENCES `categoria` (`idCat`),
  ADD CONSTRAINT `Experiencia_ibfk_2` FOREIGN KEY (`username`) REFERENCES `usuari` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
