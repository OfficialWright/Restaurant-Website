-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 04, 2020 at 07:14 PM
-- Server version: 5.6.41-84.1
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `customerOrderTable`
--

CREATE TABLE `customerOrderTable` (
  `customerOrderKey` int(11) NOT NULL,
  `customerOrderDateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customerOrderStatus` tinyint(1) NOT NULL,
  `customerKey` int(11) NOT NULL,
  `employeeKey` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customerOrderTable`
--

INSERT INTO `customerOrderTable` (`customerOrderKey`, `customerOrderDateTime`, `customerOrderStatus`, `customerKey`, `employeeKey`) VALUES
(1, '2020-05-05 01:40:52', 1, 1, 1),
(2, '2020-05-04 18:26:00', 1, 4, 4),
(3, '2020-05-04 22:26:47', 0, 3, 5),
(5, '2020-05-04 18:31:21', 1, 2, 1),
(6, '2020-05-04 18:33:05', 0, 3, 1),
(7, '2020-05-04 18:33:33', 1, 4, 1),
(8, '2020-05-04 18:34:05', 0, 5, 7),
(10, '2020-05-04 19:09:21', 1, 5, 6);

-- --------------------------------------------------------

--
-- Table structure for table `customerTable`
--

CREATE TABLE `customerTable` (
  `customerKey` int(11) NOT NULL,
  `customerFirstName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `customerLastName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `customerPhone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `customerEmail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `customerRoom` varchar(3) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customerTable`
--

INSERT INTO `customerTable` (`customerKey`, `customerFirstName`, `customerLastName`, `customerPhone`, `customerEmail`, `customerRoom`) VALUES
(1, 'Amanda', 'Francis', '321-142-5342', 'Francis@gmail.com', 'A12'),
(2, 'Sherry', 'Phillips', '321-123-3121', 'Phillips@gmail.com', 'C19'),
(3, 'Keneth', 'Hodges', '932-213-8761', 'Hodges@gmail.com', 'B41'),
(4, 'Samuel', 'Outten', '842-432-7541', 'Outten@aol.com', 'A35'),
(5, 'Robert', 'McDowell', '353-631-3415', 'McDowell@yahoo.com', 'C62');

-- --------------------------------------------------------

--
-- Table structure for table `employeeTable`
--

CREATE TABLE `employeeTable` (
  `employeeKey` int(11) NOT NULL,
  `employeeFirstName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `employeeLastName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `employeePhone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `employeeEmail` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `employeeUsername` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `employeePassword` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `employeeTable`
--

INSERT INTO `employeeTable` (`employeeKey`, `employeeFirstName`, `employeeLastName`, `employeePhone`, `employeeEmail`, `employeeUsername`, `employeePassword`) VALUES
(1, 'Raymond', 'Issac', '732-341-3422', 'Issac@yahoo.com', 'Issac92', '$2b$10$jduEoOjmp.hE8MdKAyKbM.6kUSz3AUR7ffRTP1GhDrcgdd2DFOBrS'),
(2, 'Test', 'Test', '555-555-5555', 'test@test.com', 'test@test.com', '$2b$10$wc/GePWLwqQw6lrKAw/CLOOnyYq6T.ixS4UleNseXofMtaMckelaW'),
(3, 'James', 'Wright', '999-888-7777', 'Wright@gmail.com', 'jwrigh42', '$2b$10$0fpq6WqVugb958FAAWzYXO7.f1/SlE6Bf19RoDSVibrsLCIhYtXB6'),
(4, 'Anthony', 'Plata', '832-654-3246', 'Plata@yahoo.com', 'plataman', '$2b$10$2tct.9/.hcqxtBCIJ/1cpOKUApCCinpBJ7lnMU2VAqFQgi7qbEq7C'),
(5, 'Charles', 'Lewis', '723-345-3125', 'Lewis@hotmail.com', 'lewisman', '$2b$10$HjlhXDBmomcnAaztb8IaRejhPviUkI1lM0VRiRXBqHO.lmQU7glpu'),
(6, 'Jesse', 'Richter', '826-164-2537', 'Richter@gmail.com', 'richman', '$2b$10$cSsz/TMfrkcjo.N47ufnmOHhKS2ipYSEoWvefD0pJMzBF7dXXn8A2'),
(7, 'Brenda', 'Campbell', '523-463-5321', 'Campbell@aol.com', 'thecampsbell', '$2b$10$rDzqICgY0YjxMOJLrXkPyO8ACdywFKj0YmVDQHp4gbvF1qfWgKEie');

-- --------------------------------------------------------

--
-- Table structure for table `inventoryTable`
--

CREATE TABLE `inventoryTable` (
  `inventoryKey` int(11) NOT NULL,
  `inventoryQuantityLevel` int(11) NOT NULL,
  `InventoryDescription` text COLLATE utf8_unicode_ci NOT NULL,
  `productKey` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `inventoryTable`
--

INSERT INTO `inventoryTable` (`inventoryKey`, `inventoryQuantityLevel`, `InventoryDescription`, `productKey`) VALUES
(1, 86, 'Fresh house-made pizza dough and tomato sauce, fresh mozzarella and provolone cheeses,basil, mushrooms', 1),
(2, 59, 'Mozzarella cheese, tomato, fresh basil drizzled with balsamic reduction and extra virgin olive oil', 2),
(3, 53, 'Marinated tomatoes, shallots, garlic, fresh basil with lemon aioli spread on toasted Italian bread', 3),
(4, 42, 'Braised pork filled with pecorino cheese and Italian herbs served with classic fresh tomato sauce', 4),
(5, 62, 'House-made lean ground beef meatballs combined with breadcrumbs, eggs, parmesan, freshchopped basil simmered in chicken broth and spinach', 5);

-- --------------------------------------------------------

--
-- Table structure for table `orderDetailTable`
--

CREATE TABLE `orderDetailTable` (
  `orderDetailKey` int(11) NOT NULL,
  `orderDetailQuantity` int(11) NOT NULL,
  `orderDetailUnitPrice` decimal(10,2) NOT NULL,
  `productKey` int(11) NOT NULL,
  `customerOrderKey` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orderDetailTable`
--

INSERT INTO `orderDetailTable` (`orderDetailKey`, `orderDetailQuantity`, `orderDetailUnitPrice`, `productKey`, `customerOrderKey`) VALUES
(1, 3, '8.25', 1, 1),
(2, 2, '7.95', 2, 2),
(3, 4, '8.44', 3, 3),
(5, 1, '8.11', 2, 5),
(6, 4, '9.99', 1, 6),
(7, 1, '8.75', 3, 7),
(8, 3, '6.32', 5, 8),
(10, 6, '8.32', 5, 10);

-- --------------------------------------------------------

--
-- Table structure for table `productTable`
--

CREATE TABLE `productTable` (
  `productKey` int(11) NOT NULL,
  `productName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `productUnitPrice` decimal(10,2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `productTable`
--

INSERT INTO `productTable` (`productKey`, `productName`, `productUnitPrice`) VALUES
(1, 'Italian Pizza', '6.99'),
(2, 'Caprese Salad', '6.99'),
(3, 'Bruschetta', '5.99'),
(4, 'Braciole Calabresi', '7.99'),
(5, 'Italian Wedding Soup', '5.99');

-- --------------------------------------------------------

--
-- Table structure for table `scheduleTable`
--

CREATE TABLE `scheduleTable` (
  `scheduleKey` int(11) NOT NULL,
  `scheduleDay` varchar(9) COLLATE utf8_unicode_ci NOT NULL,
  `scheduleStartTime` time NOT NULL,
  `scheduleEndTime` time NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `scheduleTable`
--

INSERT INTO `scheduleTable` (`scheduleKey`, `scheduleDay`, `scheduleStartTime`, `scheduleEndTime`) VALUES
(1, 'Sunday', '06:00:00', '21:00:00'),
(2, 'Monday', '00:00:00', '00:00:00'),
(3, 'Tuesday', '00:00:00', '00:00:00'),
(4, 'Wednesday', '00:00:00', '00:00:00'),
(5, 'Thursday', '00:00:00', '00:00:00'),
(6, 'Friday', '06:00:00', '21:00:00'),
(7, 'Saturday', '06:00:00', '21:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customerOrderTable`
--
ALTER TABLE `customerOrderTable`
  ADD PRIMARY KEY (`customerOrderKey`);

--
-- Indexes for table `customerTable`
--
ALTER TABLE `customerTable`
  ADD PRIMARY KEY (`customerKey`);

--
-- Indexes for table `employeeTable`
--
ALTER TABLE `employeeTable`
  ADD PRIMARY KEY (`employeeKey`);

--
-- Indexes for table `inventoryTable`
--
ALTER TABLE `inventoryTable`
  ADD PRIMARY KEY (`inventoryKey`);

--
-- Indexes for table `orderDetailTable`
--
ALTER TABLE `orderDetailTable`
  ADD PRIMARY KEY (`orderDetailKey`);

--
-- Indexes for table `productTable`
--
ALTER TABLE `productTable`
  ADD PRIMARY KEY (`productKey`);

--
-- Indexes for table `scheduleTable`
--
ALTER TABLE `scheduleTable`
  ADD PRIMARY KEY (`scheduleKey`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customerOrderTable`
--
ALTER TABLE `customerOrderTable`
  MODIFY `customerOrderKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `customerTable`
--
ALTER TABLE `customerTable`
  MODIFY `customerKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `employeeTable`
--
ALTER TABLE `employeeTable`
  MODIFY `employeeKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `inventoryTable`
--
ALTER TABLE `inventoryTable`
  MODIFY `inventoryKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orderDetailTable`
--
ALTER TABLE `orderDetailTable`
  MODIFY `orderDetailKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `productTable`
--
ALTER TABLE `productTable`
  MODIFY `productKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `scheduleTable`
--
ALTER TABLE `scheduleTable`
  MODIFY `scheduleKey` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
