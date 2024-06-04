-- create triger to get alerts when a country has >= 10 languages.
DELIMITER //
CREATE TRIGGER Language_alert 
AFTER INSERT ON countrylanguage
FOR EACH ROW
BEGIN
  DECLARE language_count INT;

  SELECT COUNT(*) INTO language_count
  FROM countrylanguage
  WHERE CountryCode = NEW.CountryCode;

  IF language_count >= 10 THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The country  has 10 or more languages';

 END IF;
END; //
DELIMITER ;

--  Testing the trigger:
-- show the list of counrty that have more than 9 languae
SELECT c.Code, c.Name, COUNT(cl.Language) AS LanguageCount
FROM country c
INNER JOIN CountryLanguage cl ON c.Code = cl.CountryCode
GROUP BY c.Code, c.Name
HAVING LanguageCount >= 9;


 -- selected a countrycode that already had at least 9 or 10 languages assigned to it on the table.
-- then proceeded to test INSERT.
INSERT INTO CountryLanguage (CountryCode, Language, IsOfficial, Percentage) VALUES ('VNM', 'Lange1', 'F', 5.0);


