LOCK TABLES `employee_db`.`employees` WRITE;
INSERT INTO `employee_db`.`employees` VALUES
	(1, "Bernard Iorver", "EMP28", 100000),
    (2, "Blessing Linus", "EMP07", 30000),
    (3, "Faith Iorver", "EMP12", 108000),
    (4, "Victor Nwabudike", "EMP25", 100000);
UNLOCK TABLES;