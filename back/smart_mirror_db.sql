-- --------------------------------------------------------
-- Hôte :                        127.0.0.1
-- Version du serveur:           5.7.24 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Listage de la structure de la base pour smart_mirror_db
CREATE DATABASE IF NOT EXISTS `smart_mirror_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `smart_mirror_db`;

-- Listage de la structure de la table smart_mirror_db. accounts
CREATE TABLE IF NOT EXISTS `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Listage des données de la table smart_mirror_db.accounts : ~0 rows (environ)
DELETE FROM `accounts`;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` (`id`, `username`, `password`) VALUES
	(1, 'Claire', '$2a$10$BvCNdNllCLP8mEUpGHaRmeUVIbTiuJpi2gx8fGnlzB482BtkyhYw.');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;

-- Listage de la structure de la table smart_mirror_db. associative
CREATE TABLE IF NOT EXISTS `associative` (
  `id_profile` int(11) DEFAULT NULL,
  `id_widget` int(11) DEFAULT NULL,
  KEY `FK_id_profile` (`id_profile`),
  KEY `FK_id_widget` (`id_widget`),
  CONSTRAINT `FK_id_profile` FOREIGN KEY (`id_profile`) REFERENCES `profiles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_id_widget` FOREIGN KEY (`id_widget`) REFERENCES `widgets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table smart_mirror_db.associative : ~0 rows (environ)
DELETE FROM `associative`;
/*!40000 ALTER TABLE `associative` DISABLE KEYS */;
/*!40000 ALTER TABLE `associative` ENABLE KEYS */;

-- Listage de la structure de la table smart_mirror_db. profiles
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `id_account` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_account` (`id_account`),
  CONSTRAINT `FK_Account_Profiles` FOREIGN KEY (`id_account`) REFERENCES `accounts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table smart_mirror_db.profiles : ~0 rows (environ)
DELETE FROM `profiles`;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;

-- Listage de la structure de la table smart_mirror_db. widgets
CREATE TABLE IF NOT EXISTS `widgets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `widget` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Listage des données de la table smart_mirror_db.widgets : ~0 rows (environ)
DELETE FROM `widgets`;
/*!40000 ALTER TABLE `widgets` DISABLE KEYS */;
/*!40000 ALTER TABLE `widgets` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
