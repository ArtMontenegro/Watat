CREATE DATABASE  IF NOT EXISTS `books` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `books`;
-- MySQL dump 10.13  Distrib 8.0.38, for Linux (x86_64)
--
-- Host: 192.168.120.121    Database: books
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
-- Table structure for table `new_testament_authors`
--

DROP TABLE IF EXISTS `new_testament_authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `new_testament_authors` (
  `authorId` bigint NOT NULL,
  `birthday` datetime(6) DEFAULT NULL,
  `description` text,
  `name` varchar(75) DEFAULT NULL,
  `original12` tinyint DEFAULT NULL,
  PRIMARY KEY (`authorId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_testament_authors`
--

LOCK TABLES `new_testament_authors` WRITE;
/*!40000 ALTER TABLE `new_testament_authors` DISABLE KEYS */;
INSERT INTO `new_testament_authors` VALUES (0,'0001-01-01 00:00:00.000000','The identity of this author is unknown.','Anonymous',0),(1,'0010-10-23 00:00:00.000000','Matthew was a tax collector.','Matthew',1),(2,'0017-08-13 00:00:00.000000','Mark travelled with Barnabas.','Mark',0),(3,'0016-02-29 00:00:00.000000','Luke travelled with Paul.','Luke',0),(4,'0015-01-31 00:00:00.000000','John was the beloved disciple.','John',1),(5,'0001-01-31 00:00:00.000000','Paul was the least of the apostles.','Paul',0),(6,'0003-06-11 00:00:00.000000','James was the half-brother of Jesus.','James',0),(7,'0003-01-31 00:00:00.000000','Peter betrayed Jesus three times.','Peter',1),(8,'0008-03-26 00:00:00.000000','Jude was the brother of James.','Jude',0),(9,'0016-01-31 00:00:00.000000','Judas was in charge of the moneybag.','Judas',1),(10,'0014-01-31 00:00:00.000000','Matthias was chosen by lot to replace Judas in Acts 1:26.','Matthias',0);
/*!40000 ALTER TABLE `new_testament_authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_testament_books`
--

DROP TABLE IF EXISTS `new_testament_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `new_testament_books` (
  `bookId` bigint NOT NULL,
  `authorId` bigint DEFAULT NULL,
  `description` text,
  `name` varchar(75) DEFAULT NULL,
  PRIMARY KEY (`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_testament_books`
--

LOCK TABLES `new_testament_books` WRITE;
/*!40000 ALTER TABLE `new_testament_books` DISABLE KEYS */;
INSERT INTO `new_testament_books` VALUES (1,1,'This is the Gospel of Matthew.','Matthew'),(2,2,'This is the Gospel of Mark.','Mark'),(3,3,'This is the Gospel of Luke.','Luke'),(4,4,'This is the the Gospel of John.','John'),(5,3,'This book describes the history of the early church.','Acts'),(6,5,'This is the letter to the church in Rome.','Romans'),(7,5,'This is the first letter to the church in Corinth.','1 Corinthians'),(8,5,'This is the second letter to the church in Corinth.','2 Corinthians'),(9,5,'This is the letter to the church in Galatia.','Galatians'),(10,5,'This is the letter to the church in Ephesus.','Ephesians'),(11,5,'This is the letter to the church in Philippi.','Philippians'),(12,5,'This is the letter to the church in Colossus.','Colossians'),(13,5,'This is the first letter to the church in Thessalonica.','1 Thessalonians'),(14,5,'This is the second letter to the church in Thessalonica.','2 Thessalonians'),(15,5,'This is the first letter to Timothy.','1 Timothy'),(16,5,'This is the second letter to Timothy.','2 Timothy'),(17,5,'This is the letter to Titus.','Titus'),(18,5,'This is the letter to Philemon.','Philemon'),(19,0,'This is the letter to the Hebrews.','Hebrews'),(20,6,'This is James\' letter to the church.','James'),(21,7,'This is Peter\'s first letter to the church.','1 Peter'),(22,7,'This is Peter\'s second letter to the church.','2 Peter'),(23,4,'This is John\'s first letter to the church.','1 John'),(24,4,'This is John\'s second letter to the church.','2 John'),(25,4,'This is John\'s third letter to the church.','3 John'),(26,8,'This is Jude\'s letter to the church.','Jude'),(27,4,'This book was written by John when he was exiled on the island of Patmos.','Revelation');
/*!40000 ALTER TABLE `new_testament_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'books'
--

--
-- Dumping routines for database 'books'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-26 11:59:44
