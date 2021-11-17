-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2021 at 01:45 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `covid_si`
--

-- --------------------------------------------------------

--
-- Table structure for table `dim_date`
--

CREATE TABLE `dim_date` (
  `dateKey` int(11) NOT NULL,
  `date` date NOT NULL,
  `year` int(11) NOT NULL,
  `month` int(11) NOT NULL,
  `monthName` varchar(100) NOT NULL,
  `dayOfMonth` int(11) NOT NULL,
  `dayOfWeek` int(11) NOT NULL,
  `dayOfWeekName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dim_risk_level`
--

CREATE TABLE `dim_risk_level` (
  `level` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dim_state`
--

CREATE TABLE `dim_state` (
  `stateCode` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `fips` int(11) NOT NULL,
  `population` int(11) NOT NULL,
  `countryCode` int(11) NOT NULL,
  `countryName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `dim_transmission_level`
--

CREATE TABLE `dim_transmission_level` (
  `level` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `fact_information`
--

CREATE TABLE `fact_information` (
  `dateKeyFK` int(11) NOT NULL,
  `stateCodeFK` varchar(50) NOT NULL,
  `transmissionLevelFK` int(11) NOT NULL,
  `riskLevelFK` int(11) NOT NULL,
  `currentCases` int(11) DEFAULT NULL,
  `currentDeaths` int(11) DEFAULT NULL,
  `newCases` int(11) DEFAULT NULL,
  `newDeaths` int(11) DEFAULT NULL,
  `contactTracers` int(11) DEFAULT NULL,
  `testsPositives` int(11) DEFAULT NULL,
  `testsNegatives` int(11) DEFAULT NULL,
  `vaccinesDistributed` int(11) DEFAULT NULL,
  `vaccinesAdministered` int(11) DEFAULT NULL,
  `vaccinesCompleted` int(11) DEFAULT NULL,
  `hospitalCapacity` int(11) DEFAULT NULL,
  `hospitalCurrentUsageTotal` int(11) DEFAULT NULL,
  `hospitalCurrentUsageCovid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `dim_date`
--
ALTER TABLE `dim_date`
  ADD PRIMARY KEY (`dateKey`);

--
-- Indexes for table `dim_risk_level`
--
ALTER TABLE `dim_risk_level`
  ADD PRIMARY KEY (`level`);

--
-- Indexes for table `dim_state`
--
ALTER TABLE `dim_state`
  ADD PRIMARY KEY (`stateCode`);

--
-- Indexes for table `dim_transmission_level`
--
ALTER TABLE `dim_transmission_level`
  ADD PRIMARY KEY (`level`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
