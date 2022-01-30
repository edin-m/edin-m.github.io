-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 30, 2022 at 02:07 AM
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

-- --------------------------------------------------------

--
-- Table structure for table `ocjene`
--

CREATE TABLE `ocjene` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `predmet_id` int(11) NOT NULL,
  `ocjena` int(11) NOT NULL,
  `datum` date NOT NULL,
  `komentar` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ocjene`
--

INSERT INTO `ocjene` (`id`, `student_id`, `predmet_id`, `ocjena`, `datum`, `komentar`) VALUES
(1, 1, 1, 4, '2017-02-01', NULL),
(2, 1, 1, 4, '2017-02-03', NULL),
(3, 1, 2, 5, '2017-03-05', NULL),
(4, 1, 3, 3, '2017-04-11', NULL),
(5, 1, 4, 1, '2017-05-12', NULL),
(6, 1, 5, 4, '2017-03-13', NULL),
(7, 2, 1, 2, '2017-04-01', NULL),
(8, 2, 2, 4, '2017-05-02', NULL),
(9, 2, 3, 3, '2017-03-10', NULL),
(10, 2, 4, 4, '2017-04-01', NULL),
(11, 2, 5, 5, '2017-05-01', NULL),
(12, 1, 1, 4, '2017-02-01', 'dopuna'),
(13, 3, 1, 1, '2017-02-01', 'dopuna'),
(14, 3, 2, 2, '2017-03-01', NULL),
(15, 3, 3, 3, '2017-04-01', NULL),
(16, 3, 4, 4, '2017-05-01', NULL),
(17, 3, 5, 5, '2017-02-01', NULL),
(18, 4, 1, 4, '2017-03-01', NULL),
(19, 4, 2, 3, '2017-04-01', NULL),
(20, 4, 3, 2, '2017-05-01', NULL),
(21, 4, 4, 1, '2017-03-01', NULL),
(22, 4, 5, 3, '2017-04-01', NULL),
(23, 5, 1, 4, '2017-05-01', NULL),
(24, 5, 2, 3, '2017-03-01', NULL),
(25, 5, 3, 5, '2017-04-01', NULL),
(26, 5, 4, 2, '2017-05-01', NULL),
(27, 5, 5, 4, '2017-02-01', NULL),
(28, 6, 1, 1, '2017-03-01', NULL),
(29, 6, 2, 5, '2017-04-01', NULL),
(30, 6, 3, 3, '2017-05-01', NULL);

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
(6, 'Sport', '2022-01-01', '');

-- --------------------------------------------------------

--
-- Table structure for table `studenti`
--

CREATE TABLE `studenti` (
  `id` int(11) NOT NULL,
  `ime` varchar(255) NOT NULL,
  `prezime` varchar(255) NOT NULL,
  `datum_rodjenja` date NOT NULL,
  `upis` date NOT NULL,
  `komentar` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studenti`
--

INSERT INTO `studenti` (`id`, `ime`, `prezime`, `datum_rodjenja`, `upis`, `komentar`) VALUES
(1, 'Alisa', 'Alisovic', '2002-01-04', '2017-01-04', NULL),
(2, 'Alice', 'Alicovic', '2002-01-20', '2017-01-04', 'stranac'),
(3, 'Bakir', 'Bakirovic', '2002-01-18', '2017-01-04', 'stranac'),
(4, 'Branko', 'Kopic', '2002-01-19', '2017-01-04', NULL),
(5, 'Kenan', 'Hadzic', '2002-01-24', '2017-01-04', NULL),
(6, 'Dino', 'Dinovic', '2002-01-04', '2020-01-04', NULL),
(7, 'Alina', 'Alinovic', '2002-01-04', '2020-01-04', NULL);

--
-- Indexes for dumped tables
--

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
-- Indexes for table `studenti`
--
ALTER TABLE `studenti`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kupci`
--
ALTER TABLE `kupci`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `narudzbe`
--
ALTER TABLE `narudzbe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ocjene`
--
ALTER TABLE `ocjene`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `predmeti`
--
ALTER TABLE `predmeti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `studenti`
--
ALTER TABLE `studenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
