-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: Joule
-- ------------------------------------------------------
-- Server version	5.7.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee`
--
DROP DATABASE IF EXISTS joule2;
CREATE DATABASE joule2;
use joule2;
DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee` (
  `username` varchar(45) NOT NULL,
  `password_hashes` varchar(65) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `employee_num` int(11) NOT NULL,
  `department_name` varchar(45) NOT NULL,
  `position` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `employer` varchar(45) NOT NULL,
  `location` varchar(45) NOT NULL,
  PRIMARY KEY (`employee_num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_review`
--

DROP TABLE IF EXISTS `employee_review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_review` (
  `employee_num` int(11) NOT NULL,
  `hotness` int(11) NOT NULL,
  `accountability` int(11) NOT NULL,
  `availability` int(11) NOT NULL,
  `politeness` int(11) NOT NULL,
  `efficiency` int(11) NOT NULL,
  `comments` varchar(45) NOT NULL,
  PRIMARY KEY (`employee_num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
ALTER TABLE `joule2`.`employee_review`
DROP PRIMARY KEY;
INSERT INTO employee_review(employee_num, hotness, accountability, availability, politeness, efficiency, comments)
VALUES(1113, 2, 3, 4, 5, 6, "you'\re an employer"),
(1112, 3, 4, 5, 6, 7, "iTs WoRkInG");
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_review`
--

LOCK TABLES `employee_review` WRITE;
/*!40000 ALTER TABLE `employee_review` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_review` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-17 20:46:20
