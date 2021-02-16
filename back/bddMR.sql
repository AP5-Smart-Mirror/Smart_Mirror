-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
SHOW WARNINGS;
-- -----------------------------------------------------
-- Schema miror
-- -----------------------------------------------------
SHOW WARNINGS;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Profil`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Profil` (
  `idProfil` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `motWEB` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`idProfil`))
ENGINE = InnoDB;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `mydb`.`Widget`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Widget` (
  `idWidget` INT NOT NULL AUTO_INCREMENT,
  `Param` JSON NOT NULL,
  `Profil_idProfil` INT NOT NULL,
  PRIMARY KEY (`idWidget`, `Profil_idProfil`),
  INDEX `fk_Widget_Profil_idx` (`Profil_idProfil` ASC),
  CONSTRAINT `fk_Widget_Profil`
    FOREIGN KEY (`Profil_idProfil`)
    REFERENCES `mydb`.`Profil` (`idProfil`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
