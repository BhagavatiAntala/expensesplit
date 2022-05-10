-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 10, 2022 at 10:06 AM
-- Server version: 8.0.21
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `expensesplit`
--

-- --------------------------------------------------------

--
-- Table structure for table `expense`
--

DROP TABLE IF EXISTS `expense`;
CREATE TABLE IF NOT EXISTS `expense` (
  `expense_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `type` int NOT NULL COMMENT '0-EQUAL, 1-EXACT, 2- PERCENTAGE',
  `amount` varchar(10) NOT NULL,
  `splitwith` varchar(20) NOT NULL,
  `splitcondition` varchar(100) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`expense_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `expense`
--

INSERT INTO `expense` (`expense_id`, `user_id`, `type`, `amount`, `splitwith`, `splitcondition`, `timestamp`) VALUES
(1, 1, 0, '1000', '2,3,4', '', '2022-05-10 15:28:01'),
(2, 1, 1, '1250', '2,3', '370,880', '2022-05-10 15:28:04'),
(3, 4, 2, '1200', '1,2,3,4', '40,20,20,20', '2022-05-10 15:28:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `u_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `mo-no` varchar(12) NOT NULL,
  `token` varchar(200) NOT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `name`, `email`, `mo-no`, `token`) VALUES
(1, 'bhagavati', 'bhagavatiaantala@gmail.com', '1234567890', '73616D65746F6B656E666F61616C6C'),
(2, 'Anil', 'ani@gmail.com', '1234568520', '73616D65746F6B656E666F61616C6C'),
(3, 'sabah', 'sabah@gmail.com', '9638527410', '73616D65746F6B656E666F61616C6C'),
(4, 'jaydeep', 'jaydeep@gmail.com', '96325698841', '73616D65746F6B656E666F61616C6C');

-- --------------------------------------------------------

--
-- Table structure for table `user_owns`
--

DROP TABLE IF EXISTS `user_owns`;
CREATE TABLE IF NOT EXISTS `user_owns` (
  `u_o_id` int NOT NULL AUTO_INCREMENT,
  `owns_by_id` int NOT NULL,
  `owns_to_id` int NOT NULL,
  `amount` varchar(10) NOT NULL,
  PRIMARY KEY (`u_o_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_owns`
--

INSERT INTO `user_owns` (`u_o_id`, `owns_by_id`, `owns_to_id`, `amount`) VALUES
(1, 4, 1, '0'),
(2, 2, 1, '620'),
(3, 3, 1, '1130'),
(4, 1, 4, '230'),
(5, 2, 4, '240.00'),
(6, 3, 4, '240.00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
