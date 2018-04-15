-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: ratemycoworkers
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
-- Table structure for table `company`
--
DROP DATABASE IF EXISTS joule;
CREATE DATABASE joule;
use joule;
DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `company_num` int(11) NOT NULL,
  `location` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `industry` varchar(45) NOT NULL,
  PRIMARY KEY (`company_num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO company(company_num, location, name, industry)
VALUES(1, 'dallas', 'hp',  'tech');
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_rev`
--

DROP TABLE IF EXISTS `company_rev`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_rev` (
  `company_num` int(11) NOT NULL,
  `overall_rating` int(11) NOT NULL,
  PRIMARY KEY (`company_num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO company_rev(company_num, overall_rating)
VALUES (1, 5);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_rev`
--

LOCK TABLES `company_rev` WRITE;
/*!40000 ALTER TABLE `company_rev` DISABLE KEYS */;
/*!40000 ALTER TABLE `company_rev` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `department_num` int(11) NOT NULL,
  `company_num` int(11) NOT NULL,
  `manager_num` int(11) NOT NULL,
  PRIMARY KEY (`department_num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO department(department_num, company_num, manager_num)
VALUES (1, 2, 3);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employees` (
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `employee_num` int(11) NOT NULL,
  `department_num` int(11) NOT NULL,
  `position` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`employee_num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO employees(username, password, first_name, last_name, employee_num, department_num, position, email)
VALUES('vanilla_ice', 'iceicebaby', 'vanilla', 'ice', 1111, 1111, 'vanilla of ice', 'vice@vanilla.ice'),
('SGlasford', 'chris', 'Samantha', 'Glasford', 1112, 1112, 'gui person', 'sglasford@smu.edu'),
('SamGiles', 'googleit', 'Sam', 'Giles', 1113, 1112, 'db person', 'samg@smu.edu'),
('KatelynD', 'password', 'Katelyn', 'Dunn', 1114, 1112, 'db person', 'kdunn@smu.edu');
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employer`
--

DROP TABLE IF EXISTS `employer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employer` (
  `company_num` int(11) NOT NULL,
  `department_num` int(11) NOT NULL,
  PRIMARY KEY (`company_num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO employer(company_num, department_num)
VALUES(19, 22);
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employer`
--

LOCK TABLES `employer` WRITE;
/*!40000 ALTER TABLE `employer` DISABLE KEYS */;
/*!40000 ALTER TABLE `employer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employer_history`
--

DROP TABLE IF EXISTS `employer_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employer_history` (
  `employer_num` int(11) NOT NULL,
  `company_num` int(11) NOT NULL,
  `dateS` datetime NOT NULL,
  `dateE` datetime DEFAULT NULL,
  PRIMARY KEY (`employer_num`,`company_num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO employer_history(employer_num, company_num, dateS, dateE)
VALUES(19, 22, '2016-05-05 00:00:00', '2018-04-03 00:00:00');


DROP TABLE IF EXISTS `employee_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_reviews` (
  `employee_num` int(11) NOT NULL,
  `hotness` int(11) NOT NULL,
  `accountability` int(11) NOT NULL,
  `availability` int(11) NOT NULL,
  `politeness` int(11) NOT NULL,
  `efficiency` int(11) NOT NULL,
  `comments` varchar(45) NOT NULL,
  PRIMARY KEY (`employee_num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
INSERT INTO employee_reviews(employee_num, hotness, accountability, availability, politeness, efficiency)
VALUES(1, 2, 3, 4, 5, 6);

/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employer_history`
--

LOCK TABLES `employer_history` WRITE;
/*!40000 ALTER TABLE `employer_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `employer_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-02 20:30:21
