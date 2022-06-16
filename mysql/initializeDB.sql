CREATE DATABASE  IF NOT EXISTS `test_db`;
USE `test_db`;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `age` int NOT NULL,
  `address` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `markets`;
CREATE TABLE `markets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `desc` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `buys`;
CREATE TABLE `buys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `market_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `desc` varchar(50) NOT NULL,
  `order_date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`market_id`) REFERENCES `markets` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
