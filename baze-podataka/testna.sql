-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2022 at 03:29 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testna`
--

-- --------------------------------------------------------

--
-- Table structure for table `dobavljaci`
--

CREATE TABLE `dobavljaci` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL,
  `grad` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dobavljaci`
--

INSERT INTO `dobavljaci` (`id`, `naziv`, `grad`) VALUES
(1, 'Robot', 'Sarajevo'),
(2, 'Konzum', 'Mostar'),
(3, 'Peni', 'Sarajevo'),
(4, 'Bingo', 'Banja Luka'),
(5, 'Amko', 'Tuzla'),
(6, 'Genelec', 'Tuzla'),
(7, 'Imtec', 'Mostar'),
(8, 'Target', 'Sarajevo');

-- --------------------------------------------------------

--
-- Table structure for table `kupci`
--

CREATE TABLE `kupci` (
  `id` int(11) NOT NULL,
  `ime` varchar(255) NOT NULL,
  `prezime` varchar(255) NOT NULL,
  `adresa` varchar(255) NOT NULL,
  `kontakt` varchar(255) DEFAULT NULL,
  `grad` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kupci`
--

INSERT INTO `kupci` (`id`, `ime`, `prezime`, `adresa`, `kontakt`, `grad`) VALUES
(1, 'Alisa', 'Alisovic', 'Ulica 1', NULL, 'Sarajevo'),
(2, 'Alice', 'Alicovic', 'Ulica 2', NULL, 'Sarajevo'),
(3, 'Bakir', 'Bakirovic', 'Ulica 3', NULL, 'Sarajevo'),
(4, 'Branko', 'Kopic', 'Ulica 4', '123-123', 'Zenica'),
(5, 'Kenan', 'Hadzic', 'Ulica 5', '123-456', 'Mostar'),
(6, 'Dino', 'Dinovic', 'Ulica 1', '234-456', 'Mostar'),
(7, 'Alina', 'Alinovic', 'Ulica 6', NULL, 'Zenica'),
(8, 'Alisa', 'Alisovic', 'Ulica 6', NULL, 'Sarajevo');

-- --------------------------------------------------------

--
-- Table structure for table `narudzbe`
--

CREATE TABLE `narudzbe` (
  `id` int(11) NOT NULL,
  `kupac_id` int(11) NOT NULL,
  `uposlenik_id` int(11) NOT NULL,
  `datum` date NOT NULL,
  `artikal_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `narudzbe`
--

INSERT INTO `narudzbe` (`id`, `kupac_id`, `uposlenik_id`, `datum`, `artikal_id`) VALUES
(1, 3, 2, '2022-01-11', 4);

-- --------------------------------------------------------

--
-- Table structure for table `ocjene`
--

CREATE TABLE `ocjene` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `predmet_id` int(11) NOT NULL,
  `profesor_id` int(11) NOT NULL,
  `ocjena` int(11) NOT NULL,
  `datum` date NOT NULL,
  `komentar` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ocjene`
--

INSERT INTO `ocjene` (`id`, `student_id`, `predmet_id`, `profesor_id`, `ocjena`, `datum`, `komentar`) VALUES
(1, 1, 1, 1, 4, '2017-02-01', NULL),
(2, 1, 1, 1, 4, '2017-02-03', NULL),
(3, 1, 2, 1, 5, '2017-03-05', NULL),
(4, 1, 3, 1, 3, '2017-04-11', NULL),
(5, 1, 4, 1, 1, '2017-05-12', NULL),
(6, 1, 5, 1, 4, '2017-03-13', NULL),
(7, 2, 1, 1, 2, '2017-04-01', NULL),
(8, 2, 2, 2, 4, '2017-05-02', NULL),
(9, 2, 3, 1, 3, '2017-03-10', NULL),
(10, 2, 4, 2, 4, '2017-04-01', NULL),
(11, 2, 5, 1, 5, '2017-05-01', NULL),
(12, 1, 1, 1, 4, '2017-02-01', 'dopuna'),
(13, 3, 1, 2, 1, '2017-02-01', 'dopuna'),
(14, 3, 2, 1, 2, '2017-03-01', NULL),
(15, 3, 3, 1, 3, '2017-04-01', NULL),
(16, 3, 4, 3, 4, '2017-05-01', NULL),
(17, 3, 5, 3, 5, '2017-02-01', NULL),
(18, 4, 1, 1, 4, '2017-03-01', NULL),
(19, 4, 2, 1, 3, '2017-04-01', NULL),
(20, 4, 3, 1, 2, '2017-05-01', NULL),
(21, 4, 4, 1, 1, '2017-03-01', NULL),
(22, 4, 5, 1, 3, '2017-04-01', NULL),
(23, 5, 1, 1, 4, '2017-05-01', NULL),
(24, 5, 2, 1, 3, '2017-03-01', NULL),
(25, 5, 3, 1, 5, '2017-04-01', NULL),
(26, 5, 4, 1, 2, '2017-05-01', NULL),
(27, 5, 5, 1, 4, '2017-02-01', NULL),
(28, 6, 1, 1, 1, '2017-03-01', NULL),
(29, 6, 2, 1, 5, '2017-04-01', NULL),
(30, 6, 3, 1, 3, '2017-05-01', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `predmeti`
--

CREATE TABLE `predmeti` (
  `id` int(11) NOT NULL,
  `naziv` varchar(255) NOT NULL,
  `skgod` date NOT NULL,
  `komentar` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `predmeti`
--

INSERT INTO `predmeti` (`id`, `naziv`, `skgod`, `komentar`) VALUES
(1, 'Baze Podataka', '2022-01-01', ''),
(2, 'Napredna Informatika', '2022-01-01', ''),
(3, 'Obicna Informatika', '2022-01-01', ''),
(4, 'Matematika', '2022-01-01', ''),
(5, 'Hemija', '2022-01-01', ''),
(6, 'Sport', '2022-01-01', ''),
(7, 'Fizika', '2022-02-03', '');

-- --------------------------------------------------------

--
-- Table structure for table `profesori`
--

CREATE TABLE `profesori` (
  `id` int(11) NOT NULL,
  `ime` varchar(45) NOT NULL,
  `prezime` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profesori`
--

INSERT INTO `profesori` (`id`, `ime`, `prezime`) VALUES
(1, 'Neko 1', 'Nekic 1'),
(2, 'Neko 2', 'Nekic 2'),
(3, 'Neko 3', 'Nekic 3'),
(4, 'Neko 4', 'Nekic 4'),
(5, 'Neko 5', 'Nekic 5'),
(6, 'Neko 6', 'Nekic 6');

-- --------------------------------------------------------

--
-- Table structure for table `studenti`
--

CREATE TABLE `studenti` (
  `id` int(11) NOT NULL,
  `ime` varchar(255) NOT NULL,
  `prezime` varchar(255) NOT NULL,
  `grad` varchar(255) NOT NULL,
  `datum_rodjenja` date NOT NULL,
  `upis` date NOT NULL,
  `komentar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studenti`
--

INSERT INTO `studenti` (`id`, `ime`, `prezime`, `grad`, `datum_rodjenja`, `upis`, `komentar`) VALUES
(1, 'Alisa', 'Alisovic', 'Sarajevo', '2006-01-31', '2017-01-04', NULL),
(2, 'Alice', 'Alicovic', 'Zenica', '2002-01-20', '2017-01-04', '  stranac  '),
(3, 'Bakir', 'Bakirovic', 'Sarajevo', '2005-01-18', '2017-01-04', 'stranac'),
(4, 'Branko', 'Kopic', 'Zenica', '2004-01-19', '2017-01-04', NULL),
(5, 'Kenan', 'Hadzic', 'Sarajevo', '2003-01-24', '2017-01-04', NULL),
(6, 'Dino', 'Dinovic', 'Mostar', '2002-01-04', '2020-01-04', NULL),
(7, 'Alina', 'Alinovic', 'Sarajevo', '2002-01-04', '2020-01-04', NULL),
(8, 'Alisa', 'Alisovic', 'Mostar', '2002-01-04', '2017-03-04', NULL),
(101, 'Bakir', 'Kadic', 'Zenica', '2002-03-04', '2017-01-04', NULL),
(102, 'Bakir', 'Kadric', 'Zenica', '2002-01-20', '2020-01-04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `uposlenici`
--

CREATE TABLE `uposlenici` (
  `id` int(11) NOT NULL,
  `ime` varchar(255) NOT NULL,
  `prezime` varchar(255) NOT NULL,
  `pozicija` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `uposlenici`
--

INSERT INTO `uposlenici` (`id`, `ime`, `prezime`, `pozicija`) VALUES
(1, 'Zana', 'Zanic', 'Direktor'),
(2, 'Amir', 'Amiric', 'Komercijalista'),
(3, 'Dinko', 'Dinkic', 'Komercijalista'),
(4, 'Senada', 'Senadic', 'Komercijalista'),
(5, 'Zlatan', 'Zlatanic', 'Komercijalista');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dobavljaci`
--
ALTER TABLE `dobavljaci`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kupci`
--
ALTER TABLE `kupci`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `narudzbe`
--
ALTER TABLE `narudzbe`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ocjene`
--
ALTER TABLE `ocjene`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `predmeti`
--
ALTER TABLE `predmeti`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `profesori`
--
ALTER TABLE `profesori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `studenti`
--
ALTER TABLE `studenti`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `uposlenici`
--
ALTER TABLE `uposlenici`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dobavljaci`
--
ALTER TABLE `dobavljaci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `kupci`
--
ALTER TABLE `kupci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `narudzbe`
--
ALTER TABLE `narudzbe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `ocjene`
--
ALTER TABLE `ocjene`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `predmeti`
--
ALTER TABLE `predmeti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `profesori`
--
ALTER TABLE `profesori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `studenti`
--
ALTER TABLE `studenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `uposlenici`
--
ALTER TABLE `uposlenici`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
