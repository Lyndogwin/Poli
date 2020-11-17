-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: Poli
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `policies`
--

DROP TABLE IF EXISTS `policies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policies` (
  `policy_id` int NOT NULL AUTO_INCREMENT,
  `Policy` text,
  PRIMARY KEY (`policy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policies`
--

LOCK TABLES `policies` WRITE;
/*!40000 ALTER TABLE `policies` DISABLE KEYS */;
INSERT INTO `policies` VALUES (1,'Build a wall with Mexico'),(2,'Get Covid-19 under control'),(3,'Free College'),(4,'Legalize Marijuana'),(5,'Pro Gay Marriage'),(6,'Anti Gay Marriage'),(7,'Pro Abortion'),(8,'Anti Abortion'),(9,'Pro Confederate Flag'),(10,'Anti Confederate Flag'),(11,'Pro Death Penalty'),(12,'Anti Death Penalty'),(13,'Pro Gun COntrol'),(14,'Anti Gun COntrol'),(15,'Pro Gerrymandering'),(16,'Anti Gerrymandering'),(17,'Pro Net Nutrality'),(18,'Anti Net Nutrality'),(19,'Pro Immunity for Edward Snowden'),(20,'Anti Immunity for Edward Snowden'),(21,'Pro Obamacare'),(22,'Anti Obamacare'),(23,'Let States decide minimum wage'),(24,'$15 Federal Minimum Wage'),(25,'Supports Corporate Taxes'),(26,'Pro COrporate Tax Breaks');
/*!40000 ALTER TABLE `policies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policies_politician_junction`
--

DROP TABLE IF EXISTS `policies_politician_junction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `policies_politician_junction` (
  `policy_id` int NOT NULL,
  `politician_id` int NOT NULL,
  PRIMARY KEY (`policy_id`,`politician_id`),
  KEY `politician_id` (`politician_id`),
  CONSTRAINT `policies_politician_junction_ibfk_1` FOREIGN KEY (`policy_id`) REFERENCES `policies` (`policy_id`),
  CONSTRAINT `policies_politician_junction_ibfk_2` FOREIGN KEY (`politician_id`) REFERENCES `politicians` (`politician_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policies_politician_junction`
--

LOCK TABLES `policies_politician_junction` WRITE;
/*!40000 ALTER TABLE `policies_politician_junction` DISABLE KEYS */;
/*!40000 ALTER TABLE `policies_politician_junction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `politicians`
--

DROP TABLE IF EXISTS `politicians`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `politicians` (
  `politician_id` int NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Age` int DEFAULT NULL,
  `Current_Position` varchar(255) DEFAULT NULL,
  `Running_Position` varchar(255) NOT NULL,
  `Incumbent` tinyint(1) NOT NULL,
  `Party` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`politician_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `politicians`
--

LOCK TABLES `politicians` WRITE;
/*!40000 ALTER TABLE `politicians` DISABLE KEYS */;
INSERT INTO `politicians` VALUES (1,'Donald','Trump',74,'President','President',1,'Republican'),(2,'Joe','Biden',77,'N/A','President',0,'Democrat'),(3,'Roy','Cooper',63,'Governor','Governor',1,'Democrat'),(4,'Dan','Forest',53,'Lieutenant Governor','Governor',0,'Republican'),(5,'Steven','Difiore',35,'N/A','Governor',0,'Libertarian'),(6,'Al','Pisano',57,'N/A','Governor',0,'Consitution'),(7,'Thom','Tillis',60,'Senator','Senator',1,'Republican'),(8,'Cal','Cunningham',47,'N/A','Senator',0,'Democrat'),(9,'G.K','Butterfield',73,'Representative','House of Representatives: District 1',1,'Democrat'),(10,'Sandy','Smith',37,'N/A','House of Representatives: District 1',0,'Republican'),(11,'Deborah','Ross',57,'N/A','House of Representatives: District 2',0,'Democrat'),(12,'Alan','Swain',66,'N/A','House of Representatives: District 2',0,'Republican'),(13,'Jeff','Matemu',45,'N/A','House of Representatives: District 2',0,'Libertarian'),(14,'Greg','Murphy',57,'House of Representatives: District 3','House of Representatives: District 3',1,'Republican'),(15,'Daryl','Farrow',59,'N/A','House of Representatives: District 3',0,'Democrat'),(16,'David','Price',80,'House of Representatives: District 4','House of Representatives: District 4',1,'Democrat'),(17,'Robert','Thomas',68,'N/A','House of Representatives: District 4',0,'Republican'),(18,'Virginia','Fox',77,'House of Representatives: District 5','House of Representatives: District 5',1,'Republican'),(19,'David','Brown',46,'N/A','House of Representatives: District 5',0,'Democrat'),(20,'Jeff','Gregory',62,'N/A','House of Representatives: District 5',0,'Constition'),(21,'Joseph Lee','Haywood',NULL,'N/A','House of Representatives: District 6',0,'Republican'),(22,'Kathy','Manning',NULL,'N/A','House of Representatives: District 6',0,'Democrat'),(23,'Christopher','Ward',NULL,'N/A','House of Representtives: District 7',0,'Democrat'),(24,'David','Rouzer',48,'House of Representtives: District 7','House of Representtives: District 7',1,'Republican'),(25,'Theresa','Everett',50,'N/A','House of Representtives: District 7',0,'Independent'),(26,'Patricia','Timmons-Goodson',60,'Associate Justice of NC Supreme Court','House of Representtives: District 8',0,'Democrat'),(27,'Richard','Hudson',48,'House of Representtives: District 8','House of Representtives: District 8',1,'Republican'),(28,'Cynthia','Wallace',NULL,'N/A','House of Representtives: District 9',0,'Democrat'),(29,'Dan','Bishop',56,'House of Representtives: District 9','House of Representtives: District 9',1,'Republican'),(30,'David','Parker',NULL,'N/A','House of Representtives: District 10',0,'Democrat'),(31,'Patrick','McHenry',45,'House of Representtives: District 10','House of Representtives: District 10',1,'Republican'),(32,'Moe','Davis',62,'N/A','House of Representtives: District 11',0,'Democrat'),(33,'Maddison','Cawthorn',26,'N/A','House of Representtives: District 11',0,'Republican'),(34,'Tracy','DeBruhl',NULL,'N/A','House of Representtives: District 11',0,'Libertarian'),(35,'Tamara','winak',NULL,'N/A','House of Representtives: District 11',0,'Green'),(36,'Alma','Adams',74,'House of Representtives: District 12','House of Representtives: District 12',1,'Democrat'),(37,'Scott','Huffman',NULL,'N/A','House of Representtives: District 13',0,'Democrat'),(38,'Ted','Budd',49,'House of Representtives: District 12','House of Representtives: District 13',1,'Republican');
/*!40000 ALTER TABLE `politicians` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-17 16:42:51
