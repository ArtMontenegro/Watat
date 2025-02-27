-- MySQL dump 10.13  Distrib 8.0.38, for Linux (x86_64)
--
-- Host: 192.168.122.122    Database: mybooks
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
-- Table structure for table `Manga`
--

DROP TABLE IF EXISTS `Manga`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Manga` (
  `autor` varchar(75) DEFAULT NULL,
  `nome` varchar(75) DEFAULT NULL,
  `descricao` text,
  `valor` bigint NOT NULL,
  PRIMARY KEY (`valor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Manga`
--

LOCK TABLES `Manga` WRITE;
/*!40000 ALTER TABLE `Manga` DISABLE KEYS */;
INSERT INTO `Manga` VALUES ('Koyoharu Gotge','Kimetsu no Yaiba',' srie de mang e anime que conta a histria de Tanjiro Kamado, um jovem que se torna um matador de demnios',70),('Naoya Matsumoto','Kaiju No. 8',' a histria de Kafka Hibino, um homem com um nico sonho: entrar na Fora de Defesa e ajudar o pas a lutar contra criaturas ameaadoras, conhecidas como Kaiju.',71),('Chu-Gong','Solo Leveling','Solo Leveling, tambm traduzido alternativamente como Only I Level Up,  uma web novel sul-coreana escrita por Chugong',80),('Gege Akutami','Jujutsu Kaisen','oi serializada na revista Weekly Shnen Jump de maro de 2018 a setembro de 2024, com seus captulos compilados em 30 volumes',90);
/*!40000 ALTER TABLE `Manga` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-25 12:07:11
