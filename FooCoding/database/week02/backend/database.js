import mysql from 'mysql2/promise';

// Create the connection to the database
const db_connection = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin',
  database: 'new_world',
  multipleStatements: true,
});
// query 1:  capital of country X
export async function getCapitalOfCountry(countryName) {
  const query = `
    SELECT city.Name AS Capital
    FROM city
    INNER JOIN country ON city.ID = country.Capital
    WHERE country.Name = ?;
  `;
  const [results] = await db_connection.execute(query, [countryName]);
  //console.log(results);
  return results;
}
// query 2 : List all the languages spoken in the region Y
export async function listLanguagesInRegion(regionName) {
  const query = `
  SELECT DISTINCT cl.Language
  FROM countrylanguage AS cl
  INNER JOIN country AS c ON cl.CountryCode = c.Code
  WHERE c.Region = ?;
  `;
  const [rows] = await db_connection.execute(query, [regionName]);
  return rows;
}
// query 3: the number of cities in which language Z is spoken
export async function numberOfcities(language) {
  const query = `
    SELECT COUNT(*) AS NumberOfCities
    FROM city AS c
    INNER JOIN countrylanguage AS cl ON c.CountryCode = cl.CountryCode
    WHERE cl.Language = ?;
  `;
  const [rows] = await db_connection.execute(query, [language]);
  return rows;
}

// query 4:any countries that have the same official language and  in the same continent
export async function getCountriesWithSameLanguage(country) {
  const query = `
    SELECT c.Name
    FROM country c
    INNER JOIN countrylanguage cl ON c.Code = cl.CountryCode
    WHERE cl.IsOfficial = 'T'
      AND cl.Language IN (
        SELECT cl2.Language
        FROM countrylanguage cl2
        INNER JOIN country c2 ON cl2.CountryCode = c2.Code
        WHERE c2.Name = ? AND cl2.IsOfficial = 'T'
      )
      AND c.Continent IN (SELECT Continent FROM country WHERE Name = ?)
      AND c.Name != ?;
  `;
  const [rows] = await db_connection.execute(query, [country, country, country]);
  return rows;
}
