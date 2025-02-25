-- MySQL dump 10.13  Distrib 8.0.38, for Linux (x86_64)
--
-- Host: 192.168.120.121    Database: mydata
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Author`
--

DROP TABLE IF EXISTS `Author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Author` (
  `authorId` bigint NOT NULL,
  `birthday` datetime(6) DEFAULT NULL,
  `description` text,
  `name` varchar(75) DEFAULT NULL,
  `original12` tinyint DEFAULT NULL,
  PRIMARY KEY (`authorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Author`
--

LOCK TABLES `Author` WRITE;
/*!40000 ALTER TABLE `Author` DISABLE KEYS */;
INSERT INTO `Author` VALUES (0,'0001-01-01 00:00:00.000000','The identity of this author is unknown.','Anonymous',0),(1,'0010-10-23 00:00:00.000000','Matthew was a tax collector.','Matthew',1),(2,'0017-08-13 00:00:00.000000','Mark travelled with Barnabas.','Mark',0),(3,'0016-02-29 00:00:00.000000','Luke travelled with Paul.','Luke',0),(4,'0015-01-31 00:00:00.000000','John was the beloved disciple.','John',1),(5,'0001-01-31 00:00:00.000000','Paul was the least of the apostles.','Paul',0),(6,'0003-06-11 00:00:00.000000','James was the half-brother of Jesus.','James',0),(7,'0003-01-31 00:00:00.000000','Peter betrayed Jesus three times.','Peter',1),(8,'0008-03-26 00:00:00.000000','Jude was the brother of James.','Jude',0),(9,'0016-01-31 00:00:00.000000','Judas was in charge of the moneybag.','Judas',1),(10,'0014-01-31 00:00:00.000000','Matthias was chosen by lot to replace Judas in Acts 1:26.','Matthias',0);
/*!40000 ALTER TABLE `Author` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-25  9:41:22
