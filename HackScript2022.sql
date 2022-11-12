
CREATE TABLE `Account` (
    `account_id` int AUTO_INCREMENT NOT NULL,
    `patient_id` int AUTO_INCREMENT NULL,
    `doctor_id` int AUTO_INCREMENT NULL,
    `user_name` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (
        `account_id`,`patient_id`,`doctor_id`
    )
);

CREATE TABLE `Patient` (
    `patient_id` int NOT NULL,
    `pfirst_name` varchar(255) NOT NULL,
    `plast_name` varchar(255) NOT NULL,
    `height` int NULL,
    `weight` int NULL,
    `ethnicity` varchar(255) NULL,
    `sex` varchar(255) NULL,
    `city` varchar(255) NULL,
    `state` varchar(255) NULL 
);

CREATE TABLE `Doctor` (
    `doctor_id` int NOT NULL,
    `dfirst_name` varchar(255) NULL,
    `dlast_name` varchar(255) NULL,
    `med_title` varchar(255) NULL,
    `city` varchar(255) NULL,
    `state` varchar(255) NULL,
    `experience` int NULL 
);

CREATE TABLE `Case` (
    `case_id` int NOT NULL,
    `created_on` varchar(20) NOT NULL,
    `symp_1` varchar(50) NULL,
    `symp_2` varchar(50) NULL,
    `symp_3` varchar(50) NULL,
    `symp_4` varchar(50) NULL,
    `duration` int NOT NULL,
    `doctor_id` int NOT NULL,
    `patient_id` int NOT NULL,
    `solution` varchar(255) NOT NULL,
    PRIMARY KEY (
        `case_id`
    )
);

ALTER TABLE `Account` ADD CONSTRAINT `fk_Account_patient_id` FOREIGN KEY(`patient_id`)
REFERENCES `Patient` (`patient_id`);

ALTER TABLE `Account` ADD CONSTRAINT `fk_Account_doctor_id` FOREIGN KEY(`doctor_id`)
REFERENCES `Doctor` (`doctor_id`);

ALTER TABLE `Patient` ADD CONSTRAINT `fk_Patient_patient_id` FOREIGN KEY(`patient_id`)
REFERENCES `Case` (`patient_id`);

ALTER TABLE `Doctor` ADD CONSTRAINT `fk_Doctor_doctor_id` FOREIGN KEY(`doctor_id`)
REFERENCES `Case` (`doctor_id`);

